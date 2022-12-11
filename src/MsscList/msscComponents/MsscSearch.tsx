import React from 'react';

import BrInput, { BrInputEnIcon } from '../commonUI/BrFilter/BrInput';
import { MsscRefreshesType } from '../types/types/MsscRefreshesType';

export interface PropsType {
  refreshes: MsscRefreshesType
  searchTextSet: any
  searchText: string
}

export function MsscSearch({refreshes, searchTextSet, searchText}: PropsType) {
  /**
   * [[220130110028]]
   */
  function searchHandler(value: string) {
    searchTextSet?.(value)
    refreshes.whole()
  }

  return (
    // [[220130103738]]
    <BrInput
      icon={BrInputEnIcon.SEARCH}
      cbOnChange={searchHandler}
      initialValue={searchText}
      autoFocus={true}
    />
  )
}
