import { deviceSize } from "@utils/constants";
import { colors } from "./colors";
import shadows from "./shadows";

const breakpoints: any = Object.keys(deviceSize).map(
  (key) => deviceSize[key] + "px"
);

breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const THEMES = {
  DEFAULT: "DEFAULT",
};

const themesOptions = {
  [THEMES.DEFAULT]: { colors, shadows, breakpoints },
};

function getThemeOptions(publicRuntimeConfig: any, pathname: string) {
  let themeOption: any;
  themeOption = themesOptions[THEMES.DEFAULT];
  return themeOption;
}

export default getThemeOptions;
