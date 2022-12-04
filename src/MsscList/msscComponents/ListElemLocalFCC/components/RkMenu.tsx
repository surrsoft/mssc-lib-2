import MenuAsau54FCC, { SelectResultAtAsau54 } from '../../../commonUI/MenuFCC/MenuAsau54FCC';
import React from 'react';

export interface PropsType {
  data: any,
  menuElemOnSelected: (obj: SelectResultAtAsau54) => Promise<any>
}

export function RkMenu({data, menuElemOnSelected}: PropsType) {
  return (
    <div className="mssc-list-elem__menu">
      <MenuAsau54FCC
        data={data}
        cbOnSelected={menuElemOnSelected}
      />
    </div>
  )
}
