import React, { FC } from "react";
import { TLAIcons } from "../../icons";
import { TLASvg } from "./svg.enum";

type Props = {
  svg: keyof typeof TLASvg;
  rotate?: number;
  variant?: "normal" | "inverted";
  size?: number;
  color?: string;
};

export const SvgIcon: FC<Props> = (props) => {
  // Change color to use theme
  //   const theme = useTheme();

  const { svg, variant, size = 20, rotate, color } = props;

  if (!svg) {
    return null;
  }

  const SvgFromMap = TLAIcons[svg];

  if (SvgFromMap === undefined) {
    console.error(
      `Could not find exported svg based on provided svg enum entry ${svg}.
          Is it properly exported? Try running 'yarn svg' if you have added a new svg in the icons folder.`
    );
    return null;
  }

  const svgStyles = {
    width: size,
    height: size,
    fill: color,
    ...(rotate
      ? {
          transform: `rotate(${rotate}deg)`,
        }
      : {}),
    ...(variant === "inverted"
      ? {
          filter: "invert(1)",
        }
      : {}),
  };

  // https://github.com/facebook/react/issues/11538
  // Currently an issue happens when using the chromium built in translate
  // After the translate, the next render cycle will break the SPA
  // The issue seems to be related to translating something in the svgs
  // This most likely happens, because something in the SvgFromMap is translated so the next rerender can't find the svg and crashes
  // The simple fix is to wrap it in a span tag, by doing this the translate feature doesn't translate the svg by a mistake
  return (
    // Do not delete this span, read above
    <span>
      <SvgFromMap style={svgStyles} />
    </span>
  );
};

export default SvgIcon;
