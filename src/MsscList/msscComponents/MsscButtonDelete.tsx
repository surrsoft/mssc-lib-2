import React from 'react';

import SvgIconTrash from '../commonIcons/SvgIcons/SvgIconTrash';
import { ListSelectingModelCls } from '../commonUtils/ListSelectingModelCls';
import { MsscIconsConfType } from '../types/types/MsscIconsConfType';
 
export interface PropsType {
  dialogDeleteShow: () => void
  listModel: ListSelectingModelCls
  iconsConf: MsscIconsConfType
}

export function MsscButtonDelete({dialogDeleteShow, listModel, iconsConf}: PropsType) {
  const deleteHandler = () => {
    dialogDeleteShow()
  }
  return (
    <button disabled={listModel.selectElemsCount() < 1} title="удалить выбранные элементы"
            onClick={deleteHandler}>
      <SvgIconTrash {...iconsConf}/>
    </button>
  )
}
