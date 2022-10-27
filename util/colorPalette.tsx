export const colors: ColorPalette = {
  primary: {
    black: "#221819",
    darkGray: "#303030",
    lightGrey: "#828282",
  },
  secondary: {
    darkYellow: "#938314",
    lightYellow: "#FFEC3F",
    softYellow: "#FFF9B2",
    yellowGreen: "#938314",
  },
  base: {
    grey800: "#151515",
    grey700: "#555555",
    grey600: "#666666",
    grey500: "#999999",
    grey400: "#C1C1C1",
    grey300: "#DCDCDC",
    grey200: "#F2F2F2",
    grey100: "#FAFAFA",
    white: "#FFFFFF",
  },
  notification: {
    success800: "#104640",
    success500: "#347A5D",
    success300: "#8DD7A9",
    warning800: "#935D00",
    warning500: "#FFB700",
    warning300: "#FFEB99",
    danger800: "#780C28",
    danger500: "#D02828",
    danger300: "#F0907C",
    focus800: "#10388F",
    focus500: "#348DF7",
    focus300: "#84C6FC",
  },
};

type ColorPalette = {
  primary: ColorsPrimary;
  secondary: ColorsSecondary;
  base: ColorsBase;
  notification: ColorsNotofication;
};
type ColorsPrimary = {
  black: string;
  darkGray: string;
  lightGrey: string;
};
type ColorsSecondary = {
  darkYellow: string;
  lightYellow: string;
  softYellow: string;
  yellowGreen: string;
};
type ColorsBase = {
  grey800: string;
  grey700: string;
  grey600: string;
  grey500: string;
  grey400: string;
  grey300: string;
  grey200: string;
  grey100: string;
  white: string;
};
type ColorsNotofication = {
  success800: string;
  success500: string;
  success300: string;
  warning800: string;
  warning500: string;
  warning300: string;
  danger800: string;
  danger500: string;
  danger300: string;
  focus800: string;
  focus500: string;
  focus300: string;
};
