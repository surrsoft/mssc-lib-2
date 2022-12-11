import { MsscSourceType } from '../MsscSourceType';
import { MsscMultFieldsType } from './MsscMultFieldsType';
import { MsscTagGroupSelectedType } from './MsscTagGroupSelectedType';

export interface MsscFiltersCreateParamsType {
  source: MsscSourceType<any>,
  tagGroupSelectedArr: MsscTagGroupSelectedType[],
  /** текст введённый пользователем в строку поиска */
  searchText: string,
  tagsFieldNameArr?: MsscMultFieldsType[],
}
