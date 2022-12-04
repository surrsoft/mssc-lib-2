import { MsscMenuActionEnum } from '../types/enums/MsscMenuActionEnum';
import { DataAtAsau54, ItemAtAsau54 } from '../commonUI/MenuFCC/MenuAsau54FCC';

export const menuDataSTA = {
  id: '',
  items: [
    {idAction: MsscMenuActionEnum.EDIT, text: 'Изменить'} as ItemAtAsau54,
    {idAction: MsscMenuActionEnum.SELECT, text: 'Выбрать'} as ItemAtAsau54,
    {idAction: MsscMenuActionEnum.DELETE, text: 'Удалить'} as ItemAtAsau54
  ]
} as DataAtAsau54
