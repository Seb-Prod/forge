import { ShowcaseProp } from "./ShowcaseProp";

type EnumItem = {
  value: string;
  label: string;
  description?: string;
};

type EnumGroup = Record<string, EnumItem>;

interface Props {
  items: Record<string, EnumGroup>;
  defaults?: Record<string, unknown>;
}

export const ShowcaseEnums = ({ items, defaults = {} }: Props) => {
  return (
    <>
      {Object.entries(items).map(([name, constants]) => (
        <ShowcaseProp
          key={name}
          title={capitalize(name)}
          constants={constants}
          defaultKey={typeof defaults[name] === "string" ? defaults[name] : undefined}
        />
      ))}
    </>
  );
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}