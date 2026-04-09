import { Card, Text, Select } from "@workspace/ui";
import {
  LuSearch,
  LuUser,
  LuMail,
  LuLock,
  LuCheck,
  LuCircleAlert,
} from "react-icons/lu";
import { Control } from "src/features/Showcase/Showcase.types";

export const ICON_OPTIONS = {
  none: null,
  search: <LuSearch size={16} />,
  user: <LuUser size={16} />,
  mail: <LuMail size={16} />,
  lock: <LuLock size={16} />,
  check: <LuCheck size={16} />,
  error: <LuCircleAlert size={16} />,
};

interface MediasSectionProps {
  controls?: Record<string, Control>;
  props: Record<string, any>;
  updateProp: (name: string, value: any) => void;
}

export const MediasSection = ({
  controls = {},
  props,
  updateProp,
}: MediasSectionProps) => {
  const handleImageUpload = (prop: string, file: File | null) => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    updateProp(
      prop,
      <img src={url} alt="" style={{ width: 14, height: 14 }} />,
    );
  };

  const imageControls = Object.entries(controls).filter(
    ([, c]) => c.type === "image",
  );

  const iconControls = Object.entries(controls).filter(
    ([, c]) => c.type === "icon",
  );

  if (!iconControls.length && !imageControls.length) return null;

  return (
    <Card tone="secondary">
      <Card.Content>
        <Text as="h6" align="center">
          Media & Icons
        </Text>

        {iconControls.map(([propName, control]) => {
          const label = control.label ?? propName;

          return (
            <Select
              key={propName}
              label={label}
              tone="secondary"
              value={props[propName] ?? "none"}
              onSelect={(value) =>
                updateProp(
                  propName,
                  ICON_OPTIONS[value as keyof typeof ICON_OPTIONS],
                )
              }
              options={Object.keys(ICON_OPTIONS).map((icon) => ({
                value: icon,
                label: icon,
              }))}
            />
          );
        })}

        {imageControls.map(([propName, control]) => {
          const label = control.label ?? propName;

          return (
            <label
              key={propName}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <Text size="sm" as="strong">
                {label}
              </Text>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload(propName, e.target.files?.[0] ?? null)
                }
              />

              {props[propName] && (
                <div style={{ marginTop: 4 }}>{props[propName]}</div>
              )}
            </label>
          );
        })}
      </Card.Content>
    </Card>
  );
};
