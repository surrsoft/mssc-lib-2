import React from 'react';
import MsscPaginatorFCC from './MsscPaginatorFCC/MsscPaginatorFCC';
import { MsscRefreshesType } from '../types/types/MsscRefreshesType';

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
      <MsscPaginatorFCC
        pageCurrNum={$pageNumCurrent}
        pageAllCountNum={$pageCountAll}
        cbChange={fnPaginationHandle}
        disabled={$loadingPage}
      />
    </div>
  )
}
