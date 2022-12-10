import MenuPoar from '../../../commonUI/MenuPoar/MenuPoar';
import React from 'react';
import { SelectResultPoarType } from '../../../commonUI/MenuPoar/types/SelectResultPoarType';

export interface PropsType {
  data: any,
  menuElemOnSelected: (obj: SelectResultPoarType) => Promise<any>
}

export function RkMenu({data, menuElemOnSelected}: PropsType) {
  return (
    <div className="mssc-list-elem__menu">
      <MenuPoar
        data={data}
        cbOnSelected={menuElemOnSelected}
      />
    </div>
  )
}
