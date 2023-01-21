import { useQuery } from "@tanstack/react-query";
import { UseQueryResult } from "@tanstack/react-query/src/types";
import { useState } from "react";
import { RsuvPaginationGyth, RsuvTxSort } from "rsuv-lib";

import {
  BrSelectIdType,
  BrSelectSortDataType,
} from "../commonUI/BrSelect/types";
import { hxhgQueryConfigs } from "../hxhg-lib/hxhgQueryConfigs";
import { msscSortsCreate } from "../msscUtils/msscSortsCreate";
import { MSSC_SETTINGS } from "../settings";
import { MsscColumnNameType } from "../types/types/MsscColumnNameType";
import { MsscFilterType } from '../types/types/MsscFilterType';

interface ResultType {
  pageNumCurrent: number;
}

interface Params {
  enabled: boolean;
  countByFilter: number;
  $pageNumCurrent: number;
  sortData?: BrSelectSortDataType<MsscColumnNameType>;
  $sortIdCurr?: BrSelectIdType;
  filters: MsscFilterType[]
}

export function useReqTwoData({
  enabled,
  countByFilter,
  $pageNumCurrent,
  sortData,
  $sortIdCurr,
  filters
}: Params): UseQueryResult<ResultType> {
  return useQuery(
    ["request-2"],
    () => {
      // --- pagination - ixStart, ixEnd
      const pagination = new RsuvPaginationGyth(
        countByFilter,
        MSSC_SETTINGS.elemsOnPage
      );
      let pageCurrent = $pageNumCurrent;
      if ($pageNumCurrent > pagination.pageCount) {
        // если в результате удаления элементов, страниц стало меньше чем было раньше
        pageCurrent = pagination.pageCount;
      }
      const indexes = pagination.indexesByPageNum(pageCurrent);
      const ixStart = indexes.indexStart;
      const ixEnd = indexes.indexLast;
      // ---
      // --- сортировка
      const sorts: RsuvTxSort[] = msscSortsCreate(sortData, $sortIdCurr);
    },
    { enabled, ...hxhgQueryConfigs }
  );
}
