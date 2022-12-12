import { BrSelectSortDataType } from '../../commonUI/BrSelect/types';
import { VanxFilterType } from '../../vanx/types/VanxFilterType';
import { VanxSourceType } from '../../vanx/VanxSourceType';
import { MsscColumnNameType } from './MsscColumnNameType';

/** входные параметры функции {@link elemsCountByFilterAndIf} */
export interface MsscElemsCountParamsType {
  source: VanxSourceType<any>,
  filters: VanxFilterType[],
  randomEnabled: boolean,
  sortData?: BrSelectSortDataType<MsscColumnNameType>,
  sortIdCurr?: string,
}
