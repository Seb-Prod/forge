import { Badge, Table, Text } from "@workspace/ui/components";
import styles from "./PropsTable.module.css";

export type PropsDocs<T = any> = Partial<
  Record<
    keyof T,
    {
      description?: string;
      type?: string;
      required?: boolean;
    }
  >
>;

interface Props<T = any> {
  docs?: PropsDocs<T>;
  defaults?: Partial<T>;
}

export const PropsTable = <T extends Record<string, any>>({
  docs,
  defaults,
}: Props<T>) => {
  if (!docs) return null;

  const primitiveTypes = ["string", "number", "boolean"];
  const rows = Object.entries(docs).map(([name, doc]) => {
    const type = doc?.type ?? "-";

    const isPrimitive = primitiveTypes.includes(type);

    return {
      prop: name,
      type:
        type === "-" ? (
          "-"
        ) : (
          <Badge appearance="filled" tone={isPrimitive ? "success" : "info"}>
            {type}
          </Badge>
        ),
      default: defaults?.[name as keyof T] ?? "-",
      description: doc?.description ?? "-",
      required: doc?.required ? "true" : "-",
    };
  });

  return (
    <section>
      <Text as="h2">Props</Text>
      <Table
        tone="secondary"
        columns={[
          { key: "prop", label: "Prop", sortable: true },
          { key: "type", label: "Type", sortable:true },
          { key: "default", label: "Default" },
          { key: "description", label: "Description" },
          { key: "required", label: "required" },
        ]}
        rows={rows}
        onRowClick={(row) => alert(`Prop cliquée : ${row.prop}`)}
      />
    </section>
  );
};
