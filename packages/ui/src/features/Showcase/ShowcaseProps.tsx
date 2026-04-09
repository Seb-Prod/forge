import { ReactNode } from "react";
import { Title } from "@workspace/ui";

interface Props {
  children: ReactNode;
}

export const ShowcaseProps = ({ children }: Props) => {
  return (
    <section>
      <Title as="h2">Props values</Title>

      <div
        style={{
          display: "grid",
          gap: 24,
          marginTop: 16,
        }}
      >
        {children}
      </div>
    </section>
  );
};