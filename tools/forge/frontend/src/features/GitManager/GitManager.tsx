import { useState, useCallback } from "react";
import {
  GitBranchGraph,
  GitModals,
  GitToolBar,
  Loading,
} from "./components";

import { Grid, Tabs } from "@workspace/ui/components";
import styles from "./GitManager.module.css";
import { MergePreparation } from "./components/MergePreparation/MergePreparation";

import { GitBranchManager, GitWorkingTree } from "./features";
import { useGitRepository } from "./context";


/**
 * Composant principal GitManager
 *
 */
export const GitManager = () => {
  const [showGraph, setShowGraph] = useState(false);

  const { gitTree } = useGitRepository();

  /**
   * Toggle graph
   */
  const handleToggleGraph = useCallback(() => {
    setShowGraph((prev) => !prev);
  }, []);

  if (!gitTree) {
    return <Loading label="Chargement des données Git…" />;
  }

  const tabs = [
    {
      key: "branchManager",
      label: "Branches",
      Component: GitBranchManager ,
    },
    {
      key: "WorkingTree",
      label: "Modifications",
      Component: GitWorkingTree,
    },
    {
      key: "merge",
      label: "Merge Preparation",
      Component: MergePreparation ,
    },
  ] as const;

  return (
    <div>
      <GitToolBar
        currentBranch={gitTree.currentBranch}
        onShowGraph={handleToggleGraph}
        showGraph={showGraph}
      />

      {showGraph && (
        <GitBranchGraph
          branches={gitTree.branchTree}
          currentBranch={gitTree.currentBranch}
          nodes={gitTree.nodes}
          edges={gitTree.edges}
          maxHeight={250}
        />
      )}

      <Grid mode="flex" wrap="nowrap" className={styles.content}>
        <Tabs tabs={tabs} defaultTab="panel" storageKey="git-active-tab" />
      </Grid>

      <GitModals />
    </div>
  );
};
