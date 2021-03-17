import React from "react";
import NextImage, { ImageProps } from "next/image";

export const Image: React.FC<ImageProps> = (props) => {
  const w = props.width || 640;
  const h = props.height || 285;
  return (
    <NextImage
      className="rounded md:rounded-lg"
      {...props}
      width={w}
      height={h}
      layout="intrinsic"
    />
  );
};
