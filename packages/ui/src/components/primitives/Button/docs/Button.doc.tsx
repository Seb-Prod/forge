import { COMPONENT_SIZES, TONES, VARIANTS } from "@workspace/ui/constants";
import { Button } from "../Button";



export const ButtonDoc = () => {
  const tones = Object.entries(TONES);
  const variants = Object.entries(VARIANTS);
  const sizes = Object.entries(COMPONENT_SIZES);

  return (
    <div className="flex flex-col gap-10">
      {variants.map(([variantKey, variant]) => (
        <section key={variantKey}>
          <h2 className="text-2xl font-bold mb-4">
            {variant.label}
          </h2>

          <div className="flex flex-col gap-6">
            {tones.map(([toneKey, tone]) => (
              <div key={toneKey}>
                <div className="mb-2">
                  <h3 className="font-semibold">
                    {tone.label}
                  </h3>

                  <p className="text-sm opacity-70">
                    {tone.description}
                  </p>
                </div>

                <div className="flex gap-4 flex-wrap">
                  {sizes.map(([sizeKey, size]) => (
                    <Button
                      key={`${variantKey}-${toneKey}-${sizeKey}`}
                      variant={variantKey as any}
                      tone={toneKey as any}
                      size={sizeKey as any}
                    >
                      {size.label}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};