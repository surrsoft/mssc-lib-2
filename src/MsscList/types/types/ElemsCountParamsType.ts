import { MsscSourceType } from '../MsscSourceType';
import { MsscFilterType } from './MsscFilterType';
import { BrSelectSortDataType } from '../../commonUI/BrSelect/types';
import { MsscColumnNameType } from './MsscColumnNameType';

/** входные параметры функции {@link elemsCountByFilterAndIf} */
export interface ElemsCountParamsType {
  source: MsscSourceType<any>,
  filters: MsscFilterType[],
  randomEnabled: boolean,
  sortData?: BrSelectSortDataType<MsscColumnNameType>,
  sortIdCurr?: string,
}
