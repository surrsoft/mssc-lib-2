import { VanxSourceType } from '../../vanx/VanxSourceType';
import { MsscMultFieldsType } from './MsscMultFieldsType';
import { MsscTagGroupSelectedType } from './MsscTagGroupSelectedType';

export interface MsscFiltersCreateParamsType {
  source: VanxSourceType<any>,
  tagGroupSelectedArr: MsscTagGroupSelectedType[],
  /** текст введённый пользователем в строку поиска */
  searchText: string,
  tagsFieldNameArr?: MsscMultFieldsType[],
}
