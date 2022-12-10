import SvgIconUnckecked from '../commonIcons/SvgIcons/SvgIconUnckecked';
import React from 'react';
import { MsscListPropsType } from '../types/types/MsscListPropsType';
import { ListSelectingModelCls } from '../commonUtils/ListSelectingModelCls';
import { MsscRefreshesType } from '../types/types/MsscRefreshesType';
import { MsscIconsConfType } from '../types/types/MsscIconsConfType';

export interface PropsType {
  listModel: ListSelectingModelCls,
  refreshes: MsscRefreshesType,
  iconsConf: MsscIconsConfType
}

export function MsscButtonDeselectAll({listModel, refreshes, iconsConf}: PropsType) {
  const deselectAllHandler = () => {
    listModel.selectElemsClear()
    refreshes.refreshPage()
  }
  return (
    <button disabled={listModel.selectElemsCount() < 1} title="отменить выбор всех элементов"
            onClick={deselectAllHandler}>
      <SvgIconUnckecked {...iconsConf}/>
    </button>
  )
}
