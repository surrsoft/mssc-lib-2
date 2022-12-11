import { ColorsCls } from "./commonIcons/SvgIcons/utils/ColorsCls";
import { MsscSettingsType } from "./types/types/MsscSettingsType";

/** настроечные вещи */
export const MSSC_SETTINGS: MsscSettingsType = {
  // записей на странице
  elemsOnPage: 10,
  // дефолты иконок
  iconsConf: {
    svgProps: { width: "20px", height: "20px" },
    colors: new ColorsCls().buNormal("#474747"),
  },
};
