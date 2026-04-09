import { useRef, useState, useMemo } from "react";
import type { DirectoryExplorerHandle } from "../components/DirectoryExplorer";
import type { GeneratorTypeConfig, OptionKey } from "../config/generatorTypes";
import type { FileItem } from "../components/FileStructurePreview";
import { runAction } from "@/services/api";

type OptionsState = Record<OptionKey, boolean>;

const buildFiles = (
  name: string,
  options: OptionsState,
  config: GeneratorTypeConfig
): FileItem[] => [
  { name: `${name}.${config.mainExtension}`, type: config.mainExtension },
  ...Object.entries(options)
    .filter(([key, enabled]) => enabled && key !== "folder")
    .flatMap(([key]) => config.fileGenerators[key as OptionKey](name)),
];

export const useGenerator = (config: GeneratorTypeConfig) => {
  const directoryRef = useRef<DirectoryExplorerHandle>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [rawName, setRawName] = useState("");
  const [options, setOptions] = useState<OptionsState>(
    () => Object.fromEntries(
      config.options.map((o) => [o.key, o.defaultEnabled])
    ) as OptionsState
  );
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const finalName = useMemo(
    () => (rawName ? config.namingStrategy(rawName) : ""),
    [rawName, config]
  );

  const files = useMemo(
    () => (finalName ? buildFiles(finalName, options, config) : []),
    [finalName, options, config]
  );

  const handleGenerate = async () => {
    if (!selectedPath || !finalName) {
      setAlert({ type: "error", message: "Sélectionne un dossier et saisis un nom." });
      return;
    }
    setLoading(true);
    setAlert(null);
    try {
      const result = await runAction(config.actionName, [
        config.id, finalName, selectedPath, JSON.stringify(options),
      ]);
      if (!result?.success) throw new Error();
      directoryRef.current?.refresh();
      setAlert({ type: "success", message: `${result.count} fichiers générés.` });
    } catch {
      setAlert({ type: "error", message: "Erreur lors de la génération." });
    } finally {
      setLoading(false);
    }
  };

  const setOption = (key: OptionKey, value: boolean) =>
    setOptions((prev) => ({ ...prev, [key]: value }));

  return {
    directoryRef,
    selectedPath, setSelectedPath,
    rawName, setRawName,
    finalName,
    options, setOption,
    files,
    loading,
    alert,
    disabled: !finalName || !selectedPath,
    handleGenerate,
  };
};