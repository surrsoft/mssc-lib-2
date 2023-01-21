import { useQuery } from "@tanstack/react-query";
import { UseQueryResult } from "@tanstack/react-query/src/types";
import loShuffle from "lodash/shuffle";
import { RsuvPaginationGyth, RsuvTxNumIntAB } from "rsuv-lib";

import {
  BrSelectIdType,
} from "../commonUI/BrSelect/types";
import { hxhgQueryConfigs } from "../hxhg-lib/hxhgQueryConfigs";
import { msscElemsCountByFilterAndIf } from "../msscUtils/msscElemsCountByFilterAndIf";
import { msscFiltersCreate } from "../msscUtils/msscFiltersCreate";
import { msscTagsCookAndSet } from "../msscUtils/msscTagsCookAndSet";
import { MSSC_SETTINGS } from "../settings";
import { MsscSourceType } from "../types/MsscSourceType";
import { MsscElemsCountReturnType } from "../types/types/MsscElemsCountReturnType";
import { MsscFilterType } from "../types/types/MsscFilterType";
import { MsscTagGroupElemsPlusType } from "../types/types/MsscTagGroupElemsPlusType";
import { MsscTagGroupElemsType } from "../types/types/MsscTagGroupElemsType";
import { MsscTagGroupType } from "../types/types/MsscTagGroupType";

// тут может быть любое значение, не имеет разницы
const STUB_VALUE = -1;

interface ResultType {
  countAll: number;
  countByFilter: number;
  tags: MsscTagGroupElemsPlusType[];
  idsShuffled: string[];
  pageCount: number;
}

interface ParamsType {
  enabled: boolean;
  source: MsscSourceType<any> | null;
  tagGroupSelectedArr: MsscTagGroupElemsType[];
  randomEnabled?: boolean;
  sortIdCurr?: BrSelectIdType;
  tagsFieldNameArr?: MsscTagGroupType[];
  filters: MsscFilterType[]
}

export function useReqFirstData({
  enabled,
  source,
  tagGroupSelectedArr,
  randomEnabled = false,
  sortIdCurr,
  tagsFieldNameArr,
  filters
}: ParamsType): UseQueryResult<ResultType> {

  return useQuery<unknown, unknown, ResultType>(
    ["request-1"],
    async () => {
      // ---
      const countAllGetPromise = source?.elemsCountByFilter([]);
      // ---
      const promisesNext = [];
      // --- если randomEnabled is TRUE нам нужны ids
      const isNeedWithFiltersReq = filters.length > 0 || randomEnabled;
      // ---
      if (source) {
        console.log("!!-!!-!!  filters {230116223938}\n", filters); // del+
        // --- получение общего количества элементов с учетом фильтров;
        // в random-режиме также получаем список всех ids
        if (isNeedWithFiltersReq) {
          const promiseCountByFilter = msscElemsCountByFilterAndIf({
            source,
            filters,
            randomEnabled,
            sortIdCurr,
          });
          promisesNext.push(promiseCountByFilter);
        } else {
          // если фильтров нет, то для "количества элементов с учётом фильтров" просто возьмём
          // "общее количество элементов без учёта фильтров", а здесь просто вставим заглушку (для удобства)
          promisesNext.push(STUB_VALUE);
        }
        // del+ mass

        // --- получение тегов
        const promiseTagsCook = msscTagsCookAndSet({
          source,
          filters,
          $selectedTags: tagGroupSelectedArr,
          tgroups: tagsFieldNameArr,
        });
        promisesNext.push(promiseTagsCook);
      }
      // --- resultNext
      const promises = [countAllGetPromise, ...promisesNext];
      const result = (await Promise.all(promises)) as [
        RsuvTxNumIntAB,
        MsscElemsCountReturnType,
        MsscTagGroupElemsPlusType[] | null
      ];
      console.log("!!-!!-!!  result {230121120932}\n", result); // del+
      // ---
      const countAll = result[0].val;
      // ---
      const countByFilter =
        filters.length > 0 ? result[1].elemsCountByFilter : countAll;
      // ---
      const ids = isNeedWithFiltersReq ? result[1].ids : [];
      // --- idsShuffled
      let idsShuffled: string[] = [];
      if (randomEnabled) {
        idsShuffled = loShuffle(ids);
      }
      // ---
      const tags = result[2] ?? [];
      // --- pageCount
      const pagination: RsuvPaginationGyth = new RsuvPaginationGyth(
        countByFilter,
        MSSC_SETTINGS.elemsOnPage
      );
      const pageCount = pagination.pageCount;
      // ---
      const ret: ResultType = {
        countAll,
        countByFilter,
        tags,
        idsShuffled,
        pageCount,
      };
      return ret;
    },
    { enabled, ...hxhgQueryConfigs }
  );
}
