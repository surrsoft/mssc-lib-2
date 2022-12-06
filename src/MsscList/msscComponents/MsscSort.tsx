import React from 'react';
import BrSelect from '../commonUI/BrSelect/BrSelect';
import { BrSelectIdType, BrSelectItemType, BrSelectSortDataType } from '../commonUI/BrSelect/types';
import { MsscColumnNameType } from '../types/types/MsscColumnNameType';
import { MsscRefreshesType } from '../types/types/MsscRefreshesType';

export interface PropsType {
  sortIdCurrSet: any
  sortIdCurr: BrSelectIdType | undefined
  refreshes: MsscRefreshesType
  /** SYNC [221204124107] */
  sortData?: BrSelectSortDataType<MsscColumnNameType>
}

export function MsscSort({sortIdCurrSet, sortIdCurr, refreshes, sortData}: PropsType) {

  /**
   * [[220129163836]]
   * @param sortItem
   */
  const sortHandler = (sortItem: BrSelectItemType<MsscColumnNameType>) => {
    sortIdCurrSet?.(sortItem.idElem)
    refreshes?.whole()
  }

  return (
    <>
      {
        sortData && <div className="mssc-body__sort-filter-container">
          {/* [[220129214739]] */}
					<BrSelect data={sortData} cbSelect={sortHandler} selectedId={sortIdCurr}/>
				</div>
      }
    </>
  )
}
