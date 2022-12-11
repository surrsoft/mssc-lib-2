import { MsscSourceType } from '../MsscSourceType';
import { MsscFilterType } from './MsscFilterType';
import { MsscMultFieldsType } from './MsscMultFieldsType';
import { MsscTagGroupSelectedType } from './MsscTagGroupSelectedType';

export interface MsscTagsCookParamsType {
  /** см. [220607221651] */
  tagsFieldNameArr?: MsscMultFieldsType[],
  source: MsscSourceType<any>,
  filters: MsscFilterType[],
  tagGroupSelectedArr: MsscTagGroupSelectedType[],
  $tagGroupArrSet: any,
}
