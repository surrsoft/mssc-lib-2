import { MsscMultFieldsType } from './MsscMultFieldsType';
import { MsscSourceType } from '../MsscSourceType';
import { MsscFilterType } from './MsscFilterType';
import { MsscTagGroupSelectedType } from './MsscTagGroupSelectedType';

export interface TagsParamsType {
  /** см. [220607221651] */
  tagsFieldNameArr?: MsscMultFieldsType[],
  source: MsscSourceType<any>,
  filters: MsscFilterType[],
  tagGroupSelectedArr: MsscTagGroupSelectedType[],
  $tagGroupArrSet: any,
}
