import { DataPoarType } from "../commonUI/MenuPoar/types/DataPoarType";
import { MsscMenuActionEnum } from "../types/enums/MsscMenuActionEnum";

export const menuDataSta: DataPoarType = {
  id: "",
  items: [
    { idAction: MsscMenuActionEnum.EDIT, text: "Изменить" },
    { idAction: MsscMenuActionEnum.SELECT, text: "Выбрать" },
    { idAction: MsscMenuActionEnum.DELETE, text: "Удалить" },
  ],
};
