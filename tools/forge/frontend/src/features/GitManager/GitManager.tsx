import { useState, useCallback, useMemo, useEffect } from "react";
import {
  GitBranchGraph,
  GitBranchPanel,
  GitStatusSection,
  GitToolBar,
  Loading,
} from "./components";

import { Grid } from "@workspace/ui/components";
import styles from "./GitManager.module.css";
import { useGit } from "./context/useGit";

/**
 * Type représentant les onglets disponibles.
 */
type Tab = "panel" | "status";

/**
 * Hook simple pour détecter si on est en desktop (>= 1024px)
 */
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
};

/**
 * Composant principal GitManager
 *
 * Gère :
 * - affichage du graphe
 * - navigation tabs (mobile)
 * - double panneau (desktop)
 */
export const GitManager = () => {
  const [showGraph, setShowGraph] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("panel");

  const { gitData, gitTree } = useGit();
  const isDesktop = useIsDesktop();

  /**
   * Merge des branches (optimisé)
   */
  const mergedBranches = useMemo(() => {
    if (!gitTree) return [];

    return gitTree.branchTree.map((branch) => {
      const info = gitTree.branches.find(
        (b) => b.name === branch.name
      );

      return {
        ...branch,
        local: info?.local ?? false,
        remote: info?.remote ?? false,
      };
    });
  }, [gitTree]);

  /**
   * Toggle graph
   */
  const handleToggleGraph = useCallback(() => {
    setShowGraph((prev) => !prev);
  }, []);

  /**
   * Change tab
   */
  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  if (!gitTree) {
    return <Loading label="Chargement des données Git…" />;
  }

  return (
    <div>
      {/* ===== Toolbar ===== */}
      <GitToolBar
        currentBranch={gitTree.currentBranch}
        onShowGraph={handleToggleGraph}
        showGraph={showGraph}
      />

      {/* ===== Graph ===== */}
      {showGraph && (
        <GitBranchGraph
          branches={gitTree.branchTree}
          currentBranch={gitTree.currentBranch}
          nodes={gitTree.nodes}
          edges={gitTree.edges}
          maxHeight={250}
        />
      )}

      {/* ===== Tabs (mobile only) ===== */}
      {!isDesktop && (
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "panel" ? styles.tabActive : ""
            }`}
            onClick={() => handleTabChange("panel")}
          >
            Branches
          </button>

          <button
            className={`${styles.tab} ${
              activeTab === "status" ? styles.tabActive : ""
            }`}
            onClick={() => handleTabChange("status")}
          >
            Status
          </button>
        </div>
      )}

      {/* ===== Content ===== */}
      <Grid mode="flex" wrap="nowrap" className={styles.content}>
        {isDesktop ? (
          <>
            <div className={styles.pane}>
              <GitBranchPanel
                branches={mergedBranches}
                currentBranch={gitTree.currentBranch}
              />
            </div>

            <div className={styles.pane}>
              <GitStatusSection />
            </div>
          </>
        ) : (
          <>
            {activeTab === "panel" && (
              <div className={styles.pane}>
                <GitBranchPanel
                  branches={mergedBranches}
                  currentBranch={gitTree.currentBranch}
                />
              </div>
            )}

            {activeTab === "status" && gitData && (
              <div className={styles.pane}>
                <GitStatusSection />
              </div>
            )}
          </>
        )}
      </Grid>
    </div>
  );
};