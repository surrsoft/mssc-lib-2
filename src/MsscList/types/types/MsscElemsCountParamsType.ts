import { BrSelectSortDataType } from '../../commonUI/BrSelect/types';
import { MsscSourceType } from '../MsscSourceType';
import { MsscColumnNameType } from './MsscColumnNameType';
import { MsscFilterType } from './MsscFilterType';

/** входные параметры функции {@link elemsCountByFilterAndIf} */
export interface MsscElemsCountParamsType {
  source: MsscSourceType<any>,
  filters: MsscFilterType[],
  randomEnabled: boolean,
  sortData?: BrSelectSortDataType<MsscColumnNameType>,
  sortIdCurr?: string,
}
