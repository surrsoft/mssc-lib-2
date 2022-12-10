import { MsscMenuActionEnum } from '../types/enums/MsscMenuActionEnum';
import { DataPoarType } from '../commonUI/MenuPoar/types/DataPoarType';
import { ItemAtPoarType } from '../commonUI/MenuPoar/types/ItemAtPoarType';

export const menuDataSTA = {
  id: '',
  items: [
    {idAction: MsscMenuActionEnum.EDIT, text: 'Изменить'} as ItemAtPoarType,
    {idAction: MsscMenuActionEnum.SELECT, text: 'Выбрать'} as ItemAtPoarType,
    {idAction: MsscMenuActionEnum.DELETE, text: 'Удалить'} as ItemAtPoarType
  ]
} as DataPoarType
