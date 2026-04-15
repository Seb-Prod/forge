import { useState, useCallback } from "react";
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
import { MergePreparation } from "./components/MergePreparation/MergePreparation";
import { Tabs } from "./Tabs";

/**
 * Composant principal GitManager
 *
 */
export const GitManager = () => {
  const [showGraph, setShowGraph] = useState(false);

  const { gitData, gitTree } = useGit();

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
      key: "panel",
      label: "Branches",
      content: (
        <GitBranchPanel/>
      ),
    },
    {
      key: "status",
      label: "Modifications",
      content: gitData ? <GitStatusSection /> : null,
    },
    {
      key: "merge",
      label: "Merge Preparation",
      content: gitData ? <MergePreparation /> : null,
    },
  ] as const;

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

      {/* Tabs */}
      <Grid mode="flex" wrap="nowrap" className={styles.content}>
        <Tabs tabs={tabs} defaultTab="panel" storageKey="git-active-tab" />
      </Grid>
    </div>
  );
};
