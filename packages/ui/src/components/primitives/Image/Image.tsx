import { useState } from "react";

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  classNames?: string;
  fallbackSrc?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export const Image = ({
  src,
  alt,
  width = 48,
  height = 48,
  classNames = "",
  fallbackSrc = "",
  objectFit = "contain",
}: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const PLACEHOLDER_SVG =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='0.3em' fill='%23999'%3E?%3C/text%3E%3C/svg%3E";

  fallbackSrc = PLACEHOLDER_SVG;
  return (
    <img
      src={imgSrc}
      alt={alt}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        objectFit // Préserve les proportions
      }}
      className={classNames}
      onError={() => setImgSrc(fallbackSrc)}
      loading="lazy"
    />
  );
};
