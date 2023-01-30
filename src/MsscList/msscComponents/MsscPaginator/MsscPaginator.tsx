import React, { Dispatch, SetStateAction } from "react";

import { MsscReqModeEnum } from "../../types/enums/MsscReqModeEnum";
import MsscPaginatorSub from "./components/MsscPaginatorSub";

export interface PropsType {
  pageNumBeforChangeSet: any;
  pageNumCurrent: number;
  pageNumCurrentSet: any;
  pageCountAll: number;
  loadingPage: boolean;
  reqModeSet: Dispatch<SetStateAction<MsscReqModeEnum>>;
}

export function MsscPaginator({
                                pageNumBeforChangeSet,
                                pageNumCurrent,
                                pageNumCurrentSet,
                                pageCountAll,
                                loadingPage,
                                reqModeSet
                              }: PropsType) {
  async function fnPaginationHandle(nextPage: number) {
    pageNumBeforChangeSet(pageNumCurrent);
    reqModeSet(MsscReqModeEnum.DETAIL)
    pageNumCurrentSet(nextPage);
  }

  return (
    <div className="mssc-list-paginator">
      <MsscPaginatorSub
        pageCurrNum={pageNumCurrent}
        pageAllCountNum={pageCountAll}
        cbChange={fnPaginationHandle}
        disabled={loadingPage}
      />
    </div>
  );
}
