import { useState, useEffect } from "react";
import styles from "./Tabs.module.css";
import { Box } from "@workspace/ui";

export type TabItem<T extends string> = {
  key: T;
  label: string;
  content: React.ReactNode;
};

type TabsProps<T extends string> = {
  tabs: readonly TabItem<T>[];
  defaultTab: T;
  storageKey?: string;
};

export const Tabs = <T extends string>({
  tabs,
  defaultTab,
  storageKey,
}: TabsProps<T>) => {
  const [activeTab, setActiveTab] = useState<T>(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved && tabs.some((t) => t.key === saved)) {
        return saved as T;
      }
    }
    return defaultTab;
  });

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, activeTab);
    }
  }, [activeTab, storageKey]);

  const activeContent = tabs.find((t) => t.key === activeTab)?.content;

  return (
    <div className={styles.wrapper}>
      {/* Tabs header */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.tab} ${
              activeTab === tab.key ? styles.tabActive : ""
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {/* <div className={styles.content}>{activeContent}</div> */}
      <Box surface="base" radius={{ top: "none", right: "none", left: "lg", bottom: "lg" }}>
        {activeContent}
      </Box>
    </div>
  );
};
