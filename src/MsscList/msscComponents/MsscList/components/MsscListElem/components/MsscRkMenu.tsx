import React from "react";

import MenuPoar from "../../../../../commonUI/MenuPoar/MenuPoar";
import { SelectResultPoarType } from "../../../../../commonUI/MenuPoar/types/SelectResultPoarType";

interface PropsType {
  data: any;
  menuElemOnSelected: (obj: SelectResultPoarType) => Promise<any>;
}

export function MsscRkMenu({ data, menuElemOnSelected }: PropsType) {
  return (
    <div className="mssc-list-elem__menu">
      <MenuPoar data={data} cbOnSelected={menuElemOnSelected} />
    </div>
  );
}
