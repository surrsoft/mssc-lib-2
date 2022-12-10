import { MsscMenuActionEnum } from "../types/enums/MsscMenuActionEnum";
import { DataPoarType } from "../commonUI/MenuPoar/types/DataPoarType";
import { ItemAtPoarType } from "../commonUI/MenuPoar/types/ItemAtPoarType";

const items: ItemAtPoarType[] = [
  { idAction: MsscMenuActionEnum.EDIT, text: "Изменить" },
  { idAction: MsscMenuActionEnum.SELECT, text: "Выбрать" },
  { idAction: MsscMenuActionEnum.DELETE, text: "Удалить" },
];

export const menuDataSTA: DataPoarType = {
  id: "",
  items,
};
