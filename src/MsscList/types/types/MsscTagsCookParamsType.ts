import { VanxFilterType } from '../../vanx/types/VanxFilterType';
import { VanxSourceType } from '../../vanx/VanxSourceType';
import { MsscMultFieldsType } from './MsscMultFieldsType';
import { MsscTagGroupSelectedType } from './MsscTagGroupSelectedType';

export interface MsscTagsCookParamsType {
  /** см. [220607221651] */
  tagsFieldNameArr?: MsscMultFieldsType[],
  source: VanxSourceType<any>,
  filters: VanxFilterType[],
  tagGroupSelectedArr: MsscTagGroupSelectedType[],
  $tagGroupArrSet: any,
}
