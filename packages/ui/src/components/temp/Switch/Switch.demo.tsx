import { useState } from "react";
import { Switch } from "./Switch";

/**
 * Page de démo pour le composant Switch
 * À ajouter dans votre app Forge pour visualiser toutes les variantes
 */
export function SwitchDemo() {
  const [basicSwitch, setBasicSwitch] = useState(false);

  const [variants, setVariants] = useState({
    primary: false,
    secondary: false,
    success: false,
    warning: false,
    danger: false,
    info: false,
  });

  const [sizes, setSizes] = useState({
    sm: false,
    md: false,
    lg: false,
  });

  const [outline, setOutline] = useState({
    primary: false,
    success: false,
    danger: false,
  });

  const [withoutLabel, setWithoutLabel] = useState(false);

  const handleVariantChange =
    (key: keyof typeof variants) => (value: boolean) => {
      setVariants((prev) => ({ ...prev, [key]: value }));
    };

  const handleSizeChange = (key: keyof typeof sizes) => (value: boolean) => {
    setSizes((prev) => ({ ...prev, [key]: value }));
  };

  const handleOutlineChange =
    (key: keyof typeof outline) => (value: boolean) => {
      setOutline((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Switch Component</h1>
      <p style={{ color: "#666", marginBottom: "3rem" }}>
        Composant Switch accessible avec variantes, tailles et apparences.
      </p>

      {/* Default */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Default</h2>
        <Switch checked={basicSwitch} onChange={setBasicSwitch}>
          Activer les notifications
        </Switch>
      </section>

      {/* Variantes */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Variantes</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Switch
            checked={variants.primary}
            onChange={handleVariantChange("primary")}
            variant="primary"
          >
            Primary
          </Switch>
          <Switch
            checked={variants.secondary}
            onChange={handleVariantChange("secondary")}
            variant="secondary"
          >
            Secondary
          </Switch>
          <Switch
            checked={variants.success}
            onChange={handleVariantChange("success")}
            variant="success"
          >
            Success
          </Switch>
          <Switch
            checked={variants.warning}
            onChange={handleVariantChange("warning")}
            variant="warning"
          >
            Warning
          </Switch>
          <Switch
            checked={variants.danger}
            onChange={handleVariantChange("danger")}
            variant="danger"
          >
            Danger
          </Switch>
          <Switch
            checked={variants.info}
            onChange={handleVariantChange("info")}
            variant="info"
          >
            Info
          </Switch>
        </div>
      </section>

      {/* Tailles */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Tailles</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "flex-start",
          }}
        >
          <Switch
            checked={sizes.sm}
            onChange={handleSizeChange("sm")}
            size="sm"
          >
            Small
          </Switch>
          <Switch
            checked={sizes.md}
            onChange={handleSizeChange("md")}
            size="md"
          >
            Medium (default)
          </Switch>
          <Switch
            checked={sizes.lg}
            onChange={handleSizeChange("lg")}
            size="lg"
          >
            Large
          </Switch>
        </div>
      </section>

      {/* Outline */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
          Apparence Outline
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Switch
            checked={outline.primary}
            onChange={handleOutlineChange("primary")}
            appearance="outline"
            variant="primary"
          >
            Primary outline
          </Switch>
          <Switch
            checked={outline.success}
            onChange={handleOutlineChange("success")}
            appearance="outline"
            variant="success"
          >
            Success outline
          </Switch>
          <Switch
            checked={outline.danger}
            onChange={handleOutlineChange("danger")}
            appearance="outline"
            variant="danger"
          >
            Danger outline
          </Switch>
        </div>
      </section>

      {/* Désactivé */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
          État désactivé
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Switch checked={false} onChange={() => {}} disabled>
            Désactivé (non coché)
          </Switch>
          <Switch checked={true} onChange={() => {}} disabled>
            Désactivé (coché)
          </Switch>
        </div>
      </section>

      {/* Sans label */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
          Sans label visible
        </h2>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Switch
            checked={withoutLabel}
            onChange={setWithoutLabel}
            aria-label="Activer le mode sombre"
          />
          <span style={{ fontSize: "0.875rem", color: "#666" }}>
            Mode sombre {withoutLabel ? "activé" : "désactivé"}
          </span>
        </div>
      </section>
    </div>
  );
}
