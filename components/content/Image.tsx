import React from "react";
import NextImage, { ImageProps } from "next/image";

export const Image: React.FC<ImageProps> = (props) => {
  const w = props.width || 896;
  const h = props.height || 490;
  return (
    <div className="lg:-mx-16 rounded md:rounded-lg bg-gray-100 overflow-hidden leading-3">
      <NextImage
        {...props}
        width={w}
        height={h}
        layout="intrinsic"
        quality={95}
      />
    </div>
  );
};
