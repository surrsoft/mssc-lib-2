import React from "react";

import { MsscDetailRefetchType } from "../../hooks/useGetData";
import { MsscReqModeEnum } from "../../types/enums/MsscReqModeEnum";
import MsscPaginatorSub from "./components/MsscPaginatorSub";

export interface PropsType {
  pageNumBeforChangeSet: any;
  pageNumCurrent: number;
  pageNumCurrentSet: any;
  pageCountAll: number;
  loadingPage: boolean;
  toDetailRefetch: MsscDetailRefetchType;
}

export function MsscPaginator({
  pageNumBeforChangeSet,
  pageNumCurrent,
  pageNumCurrentSet,
  pageCountAll,
  loadingPage,
  toDetailRefetch,
}: PropsType) {
  async function fnPaginationHandle(nextPage: number) {
    pageNumBeforChangeSet(pageNumCurrent);
    pageNumCurrentSet(nextPage);
    toDetailRefetch({ pageNumNew: nextPage, reqMode: MsscReqModeEnum.DETAIL });
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
