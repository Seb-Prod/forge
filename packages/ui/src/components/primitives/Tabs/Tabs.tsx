import { useState, useEffect } from "react";
import { Box, BoxRow, Tone, } from "@workspace/ui";
import { TabButton } from "./components";

export type TabItem<T extends string> = {
  key: T;
  label: string;
  Component: React.ComponentType;
};

type TabsProps<T extends string> = {
  tabs: readonly TabItem<T>[];
  defaultTab: T;
  storageKey?: string;
  tone?: Tone;
};

export const Tabs = <T extends string>({
  tabs,
  defaultTab,
  storageKey,
  tone
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

  const activeTabConfig = tabs.find((t) => t.key === activeTab);

  return (
    <Box surface="base" shadow overflow="hidden" radius={"md"}>
      {/* Tabs header */}
      <BoxRow alignItems="end">
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            label={tab.label}
            active={tab.key === activeTab}
            onClick={() => setActiveTab(tab.key)}
            tone={tone}            
          />
        ))}
      </BoxRow>

      {/* Content */}
      <Box surface="raised" padding={"md"} radius={{ topRight: "md" }} tone={tone}>
        {activeTabConfig?.Component && <activeTabConfig.Component />}
      </Box>
    </Box>
  );
};
