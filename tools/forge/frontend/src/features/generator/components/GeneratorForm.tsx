import {
  Button,
  Card,
  Checkbox,
  GridLayout,
  Input,
  Text
} from "@workspace/ui";
import { DirectoryExplorer } from "./DirectoryExplorer/DirectoryExplorer";
import { FileStructurePreview } from "./FileStructurePreview";
import { useGenerator } from "../hooks/useGenerator";
import type { GeneratorTypeConfig } from "../config/generatorTypes";

interface GeneratorFormProps {
  config: GeneratorTypeConfig;
}

export const GeneratorForm = ({ config }: GeneratorFormProps) => {
  const {
    directoryRef,
    selectedPath,
    setSelectedPath,
    rawName,
    setRawName,
    finalName,
    options,
    setOption,
    files,
    loading,
    alert,
    disabled,
    handleGenerate,
  } = useGenerator(config);

  return (
    <div>
      <Text>{config.label}</Text>

      {alert && (
        <div
          style={{
            color: alert.type === "success" ? "green" : "red",
            marginBottom: 12,
          }}
        >
          {alert.message}
        </div>
      )}

      <GridLayout minItemWidth="200px">
        <DirectoryExplorer
          ref={directoryRef}
          targets={config.targets}
          onSelect={setSelectedPath}
        />

        <Card tone="secondary">
          <Card.Header>
            <Text as="h3">Structure du {config.label.toLowerCase()}</Text>
          </Card.Header>

          <Card.Content>
            <Input
              label="Nom"
              tone="secondary"
              value={rawName}
              placeholder={`Ex: ${config.label === "Hook" ? "useUserData" : "UserCard"}`}
              onChange={(e) => setRawName(e.target.value)}
              helperText={`Ex: ${config.label === "Hook" ? "useUserData" : "UserCard"}`}
              onBlur={() => setRawName(finalName)}
            />

            <GridLayout minItemWidth="120px">
              {config.options.map((option) => (
                <Checkbox
                  key={option.key}
                  tone="secondary"
                  label={option.label}
                  checked={options[option.key]}
                  onChange={(e) => setOption(option.key, e.target.checked)}
                />
              ))}
            </GridLayout>
            
            {finalName && (
              <FileStructurePreview
                folderName={options.folder ? finalName : undefined}
                files={files}
              />
            )}
          </Card.Content>

          <Card.Footer>
            <Button
              disabled={disabled}
              onClick={handleGenerate}
              loading={loading}
            >
              Générer le {config.label.toLowerCase()}
            </Button>
          </Card.Footer>
        </Card>
      </GridLayout>

      {selectedPath && <div>Dossier choisi : {selectedPath}</div>}
    </div>
  );
};
