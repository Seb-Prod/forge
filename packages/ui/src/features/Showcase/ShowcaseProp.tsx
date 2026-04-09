import { Text, Title } from "@workspace/ui";

type ConstantEntry = {
  value: string;
  label: string;
  description?: string;
};

type ConstantRecord = Record<string, ConstantEntry>;

interface Props {
  constants: ConstantRecord;
  defaultKey?: string;
  title: string;
}

export const ShowcaseProp = ({ constants, defaultKey, title }: Props) => {
  return (
    <div>
      <Title as="h3">{title}</Title>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: 12,
          display: "grid",
          gap: 10,
        }}
      >
        {Object.entries(constants).map(([key, entry]) => {
          const isDefault = key === defaultKey;

          return (
            <li
              key={key}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                padding: 12,
                background: isDefault ? "#f8fafc" : "white",
              }}
            >
              <Text variant="body-lg" as="strong">
                {entry.label}
              </Text>

              <Text variant="body-sm">{entry.value}</Text>
              <Text variant="body">{entry.description}</Text>

              {isDefault && (
                <Text variant="body-sm">Default</Text>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};