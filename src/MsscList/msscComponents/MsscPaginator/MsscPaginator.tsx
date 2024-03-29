import React from 'react';

import { MsscRefreshesType } from '../../types/types/MsscRefreshesType';
import MsscPaginatorSub from './components/MsscPaginatorSub';

export interface PropsType {
  $pageNumBeforChangeSet: any
  $pageNumCurrent: number
  $pageNumCurrentSet: any
  refreshes: MsscRefreshesType
  $pageCountAll: number
  $loadingPage: boolean
}

export function MsscPaginator({
                                    $pageNumBeforChangeSet,
                                    $pageNumCurrent,
                                    $pageNumCurrentSet,
                                    refreshes,
                                    $pageCountAll,
                                    $loadingPage,
                                  }: PropsType) {

  async function fnPaginationHandle(nextPage: number) {
    $pageNumBeforChangeSet($pageNumCurrent)
    $pageNumCurrentSet(nextPage)
    refreshes.pageDataRefresh()
  }

  return (
    <div className="mssc-list-paginator">
      <MsscPaginatorSub
        pageCurrNum={$pageNumCurrent}
        pageAllCountNum={$pageCountAll}
        cbChange={fnPaginationHandle}
        disabled={$loadingPage}
      />
    </div>
  )
}
