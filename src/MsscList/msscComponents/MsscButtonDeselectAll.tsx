import React from "react";

import SvgIconUnckecked from "../commonIcons/SvgIcons/SvgIconUnckecked";
import { ListSelectingModelCls } from "../commonUtils/ListSelectingModelCls";
import { MsscIconsConfType } from "../types/types/MsscIconsConfType";
import { MsscRefreshesType } from "../types/types/MsscRefreshesType";

export interface PropsType {
  listModel: ListSelectingModelCls;
  refreshes: MsscRefreshesType;
  iconsConf: MsscIconsConfType;
}

export function MsscButtonDeselectAll({
  listModel,
  refreshes,
  iconsConf,
}: PropsType) {
  const deselectAllHandler = () => {
    listModel.selectElemsClear();
    refreshes.toRerenderPage();
  };
  return (
    <button
      disabled={listModel.selectElemsCount() < 1}
      title="отменить выбор всех элементов"
      onClick={deselectAllHandler}
    >
      <SvgIconUnckecked {...iconsConf} />
    </button>
  );
}
