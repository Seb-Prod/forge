import { spawn, ChildProcess } from "child_process";
import path from "path";
import { PROJECT_ROOT, SCRIPTS_DIR } from "../config/config";
import { exec } from "child_process";
import util from "util";
import { AVAILABLE_ACTIONS } from "../config/actions";
import { Action } from "../types/action.types";
import fs from "fs";

const execAsync = util.promisify(exec);
interface ProcessInfo {
  name: string;
  process: ChildProcess | null;
  status: "running" | "stopped" | "error";
  pid?: number;
  startTime?: Date;
}

class ActionManager {
  private processes: Map<string, ProcessInfo> = new Map();
  private rootDir: string;
  private scriptsDir: string;

  constructor() {
    this.rootDir = PROJECT_ROOT;
    this.scriptsDir = SCRIPTS_DIR;

    console.log("✅ ActionManager initialized");
    console.log("   Root:", this.rootDir);
    console.log("   Scripts:", this.scriptsDir);
  }

  /**
   * Récupère toutes les actions disponibles avec leur statut
   */
  async getAllActions(): Promise<
    Array<Action & { status: "running" | "stopped" | "error"; pid?: number }>
  > {
    const dockerStatus = await this.getDockerStatus();

    return AVAILABLE_ACTIONS.map((action) => {
      // 🔥 Cas spécial Docker
      if (action.id === "start-docker") {
        // console.log("special docker", dockerStatus)
        return {
          ...action,
          status: dockerStatus,
        };
      }

      const processInfo = this.processes.get(action.id);

      return {
        ...action,
        status: processInfo?.status || "stopped",
        pid: processInfo?.pid,
      };
    });
  }

  /**
   * Récupère les actions par catégorie
   */
  async getActionsByCategory(category: "dev" | "tools" | "generator") {
    const actions = await this.getAllActions();
    return actions.filter((action) => action.category === category);
  }

  /**
   * Lance une action par son ID
   */
  async startAction(
    actionId: string,
    args: string[] = [],
  ): Promise<{ success: boolean; message: string }> {
    const action = AVAILABLE_ACTIONS.find((a) => a.id === actionId);

    if (!action) {
      return { success: false, message: `Action ${actionId} not found` };
    }

    // Vérifier si déjà en cours et si les multiples sont interdits
    if (
      !action.allowMultiple &&
      this.processes.has(actionId) &&
      this.processes.get(actionId)?.status === "running"
    ) {
      return { success: false, message: `${action.name} is already running` };
    }

    const scriptPath = path.join(this.scriptsDir, action.script);

    try {
      const child = spawn("node", [scriptPath, ...args], {
        cwd: this.rootDir,
        stdio: ["ignore", "pipe", "pipe"],
        detached: false,
        env: { ...process.env },
      });

      const processInfo: ProcessInfo = {
        name: action.name,
        process: child,
        status: "running",
        pid: child.pid,
        startTime: new Date(),
      };

      this.processes.set(actionId, processInfo);

      // Gestion des logs
      child.stdout?.on("data", (data) => {
        console.log(`[${action.name}] ${data.toString()}`);
      });

      child.stderr?.on("data", (data) => {
        console.error(`[${action.name}] ${data.toString()}`);
      });

      child.on("exit", (code) => {
        const info = this.processes.get(actionId);
        if (info) {
          info.status = code === 0 ? "stopped" : "error";
          info.process = null;
          info.pid = undefined;
        }
        console.log(`[${action.name}] Exited with code ${code}`);
      });

      child.on("error", (error) => {
        const info = this.processes.get(actionId);
        if (info) {
          info.status = "error";
          info.process = null;
        }
        console.error(`[${action.name}] Error:`, error);
      });

      return { success: true, message: `${action.name} started successfully` };
    } catch (error) {
      return {
        success: false,
        message: `Failed to start ${action.name}: ${error}`,
      };
    }
  }

  /**
   * Exécute une action courte et retourne son output (pour les scripts qui se terminent)
   */
  async runAction(
    actionId: string,
    args: string[] = [],
  ): Promise<{ success: boolean; message: string; data?: unknown }> {
    const action = AVAILABLE_ACTIONS.find((a) => a.id === actionId);

    if (!action) {
      return { success: false, message: `Action ${actionId} not found` };
    }

    const scriptPath = path.join(this.scriptsDir, action.script);

    return new Promise((resolve) => {
      const child = spawn("node", [scriptPath, ...args], {
        cwd: this.rootDir,
        stdio: ["ignore", "pipe", "pipe"],
        env: { ...process.env },
      });

      let stdout = "";
      let stderr = "";

      child.stdout?.on("data", (data) => {
        const text = data.toString();
        stdout += text;

        // ❌ on n'affiche PAS les lignes techniques
        if (!text.includes("__OUTPUT_FILE__")) {
          console.log(`[${action.name}] ${text}`);
        }
      });

      child.stderr?.on("data", (data) => {
        stderr += data.toString();
        console.error(`[${action.name}] ${data.toString()}`);
      });

      child.on("exit", (code) => {
        if (code === 0) {
          try {
            const marker = stdout
              .split("\n")
              .find((l) => l.startsWith("__OUTPUT_FILE__:"));
            if (marker) {
              const filePath = marker.replace("__OUTPUT_FILE__:", "").trim();
              const raw = fs.readFileSync(filePath, "utf-8");
              fs.unlinkSync(filePath); // nettoyage
              resolve({ success: true, message: "OK", data: JSON.parse(raw) });
            } else {
              resolve({ success: true, message: stdout.trim() });
            }
          } catch {
            resolve({ success: true, message: stdout.trim() });
          }
        } else {
          resolve({
            success: false,
            message: stderr.trim() || `Exited with code ${code}`,
          });
        }
      });

      child.on("error", (error) => {
        resolve({
          success: false,
          message: `Failed to run ${action.name}: ${error}`,
        });
      });
    });
  }

  /**
   * Arrête une action
   */
  async stopAction(
    actionId: string,
  ): Promise<{ success: boolean; message: string }> {
    const action = AVAILABLE_ACTIONS.find((a) => a.id === actionId);
    const processInfo = this.processes.get(actionId);

    if (!action) {
      return { success: false, message: `Action ${actionId} not found` };
    }

    // 🔥 Cas spécial : Docker
    if (actionId === "start-docker") {
      try {
        const down = spawn("docker", ["compose", "down"], {
          cwd: this.rootDir,
          stdio: "inherit",
        });

        await new Promise((resolve) => down.on("exit", resolve));

        this.processes.delete(actionId);

        return {
          success: true,
          message: "Docker services stopped successfully",
        };
      } catch (error) {
        return {
          success: false,
          message: `Failed to stop Docker services: ${error}`,
        };
      }
    }

    // 🟢 Cas normal (frontend / backend etc.)
    if (
      !processInfo ||
      processInfo.status !== "running" ||
      !processInfo.process
    ) {
      return { success: false, message: `${action.name} is not running` };
    }

    try {
      processInfo.process.kill("SIGTERM");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!processInfo.process.killed) {
        processInfo.process.kill("SIGKILL");
      }

      processInfo.status = "stopped";
      processInfo.process = null;
      processInfo.pid = undefined;

      return { success: true, message: `${action.name} stopped successfully` };
    } catch (error) {
      return {
        success: false,
        message: `Failed to stop ${action.name}: ${error}`,
      };
    }
  }

  /**
   * Vérifie le status d'une action
   */
  async getActionStatus(
    actionId: string,
  ): Promise<
    (Action & { status: "running" | "stopped" | "error"; pid?: number }) | null
  > {
    const action = AVAILABLE_ACTIONS.find((a) => a.id === actionId);
    console.log(action);
    if (!action) return null;

    if (actionId === "start-docker") {
      const dockerStatus = await this.getDockerStatus();
      // console.log("je teste mysql Docker", dockerStatus)
      return {
        ...action,
        status: dockerStatus,
      };
    }

    const processInfo = this.processes.get(actionId);

    return {
      ...action,
      status: processInfo?.status || "stopped",
      pid: processInfo?.pid,
    };
  }

  /**
   * Arrête tous les processus
   */
  async stopAll(): Promise<void> {
    const promises = Array.from(this.processes.keys()).map((actionId) =>
      this.stopAction(actionId),
    );
    await Promise.all(promises);
  }

  private async getDockerStatus(): Promise<"running" | "stopped" | "error"> {
    try {
      const { stdout } = await execAsync(
        `docker ps --filter name=menu_zen_mysql --format "{{.Status}}"`,
      );

      if (!stdout.trim()) {
        return "stopped";
      }

      if (stdout.includes("Up")) {
        return "running";
      }

      return "error";
    } catch {
      return "error";
    }
  }
}

export const actionManager = new ActionManager();
