import { getActionStatus } from "./api";

export const waitForProcess = (
  actionId: string,
  expectedStatus: "running" | "stopped",
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject(new Error(`Timeout waiting for ${actionId}`));
    }, 120_000);

    const interval = setInterval(async () => {
      try {
        const process = await getActionStatus(actionId);

        if (process?.status === expectedStatus) {
          clearInterval(interval);
          clearTimeout(timeout);
          resolve();
        }
      } catch (error) {
        clearInterval(interval);
        clearTimeout(timeout);
        reject(error);
      }
    }, 500);
  });
};
