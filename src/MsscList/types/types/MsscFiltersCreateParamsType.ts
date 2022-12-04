import { MsscSourceType } from '../MsscSourceType';
import { MsscTagGroupSelectedType } from './MsscTagGroupSelectedType';
import { MsscMultFieldsType } from './MsscMultFieldsType';

export interface MsscFiltersCreateParamsType {
  source: MsscSourceType<any>,
  tagGroupSelectedArr: MsscTagGroupSelectedType[],
  /** текст введённый пользователем в строку поиска */
  searchText: string,
  tagsFieldNameArr?: MsscMultFieldsType[],
}
