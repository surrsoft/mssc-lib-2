import { UseQueryResult, useQuery } from "@tanstack/react-query";
import loShuffle from "lodash/shuffle";
import { useCallback } from "react";
import { RsuvPaginationGyth, RsuvTxNumIntAB } from "rsuv-lib";

import { rqQueryHandle } from "../../../common/rqQueryHandle";
import { BrSelectIdType } from "../../../commonUI/BrSelect/types";
import { hxhgQueryConfigs } from "../../../libs/hxhg-lib/hxhgQueryConfigs";
import { msscElemsCountByFilterAndIf } from "../../../msscUtils/msscElemsCountByFilterAndIf";
import { LOG_TAG, msscLogger } from "../../../msscUtils/msscLogger";
import { msscTagsCookAndSet } from "../../../msscUtils/msscTagsCookAndSet";
import { MSSC_SETTINGS } from "../../../settings";
import { MsscSourceType } from "../../../types/MsscSourceType";
import { MsscElemsCountReturnType } from "../../../types/types/MsscElemsCountReturnType";
import { MsscFilterType } from "../../../types/types/MsscFilterType";
import { MsscTagGroupElemsPlusType } from "../../../types/types/MsscTagGroupElemsPlusType";
import { MsscTagGroupElemsType } from "../../../types/types/MsscTagGroupElemsType";
import { MsscTagGroupType } from "../../../types/types/MsscTagGroupType";

// тут может быть любое значение
const STUB_VALUE = -1;

interface FirstResultType {
  countAll: number;
  countByFilter: number;
  tags: MsscTagGroupElemsPlusType[];
  idsShuffled: string[];
  pageCount: number;
}

interface ReturnWholeType {
  wrIsDone: boolean;
  /** общее кол-во элементов в хранилище, то есть без учёта каких-либо фильтров */
  wrCountAll: number;
  /** количество элементов с учётом фильтров */
  wrCountByFilter: number;
  /** теги */
  wrTags: MsscTagGroupElemsPlusType[];
  wrPageCount: number;
  wrFirstIsDone: boolean;
  wrFirstIsError: boolean;
  wrToWholeRefetch: () => void;
  wrIdsShiffled: string[];
  wrFirstResult: UseQueryResult<FirstResultType>;
}

interface ParamsType {
  source: MsscSourceType<any> | null;
  tagGroupSelectedArr: MsscTagGroupElemsType[];
  randomEnabled?: boolean;
  sortIdCurr?: BrSelectIdType;
  tagsFieldNameArr?: MsscTagGroupType[];
  $searchText: string;
  filters: MsscFilterType[];
}

/**
 * Выполняет *п-получение ([asau207]).
 *
 * Для инициации перевыборки, возвращает метод "wrToWholeRefetch()"
 *
 * ID [[230308174520]]
 *
 * @param enabled
 * @param source
 * @param tagGroupSelectedArr
 * @param randomEnabled
 * @param sortIdCurr
 * @param tagsFieldNameArr
 * @param $searchText
 * @param filters
 */
export function useMsscWhole({
  source,
  tagGroupSelectedArr,
  randomEnabled = false,
  sortIdCurr,
  tagsFieldNameArr,
  $searchText,
  filters,
}: ParamsType): ReturnWholeType {
  // --- --- req first

  const firstResult = useQuery<unknown, unknown, FirstResultType>(
    ["request-whole"],
    async () => {
      msscLogger.info(LOG_TAG, "whole request");
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
      const countByFilter = filters.length > 0 ? result[1].elemsCountByFilter : countAll;
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
      const ret: FirstResultType = {
        countAll,
        countByFilter,
        tags,
        idsShuffled,
        pageCount,
      };
      return ret;
    },
    { ...hxhgQueryConfigs }
  );

  const { isDone: firstIsDone, isError: firstIsError } = rqQueryHandle(firstResult);

  const countAll = firstResult.data?.countAll ?? 0;
  const countByFilter = firstResult.data?.countByFilter ?? 0;
  const tags = firstResult.data?.tags ?? [];
  const idsShiffled = firstResult.data?.idsShuffled ?? [];
  const pageCount = firstResult.data?.pageCount ?? 0;

  const { refetch: wholeRefetch } = firstResult;

  // === === req first

  const toWholeRefetch = useCallback(() => {
    wholeRefetch().catch();
  }, [wholeRefetch]);

  return {
    wrIsDone: firstIsDone,
    wrCountAll: countAll,
    wrCountByFilter: countByFilter,
    wrTags: tags,
    wrPageCount: pageCount,
    wrFirstIsDone: firstIsDone,
    wrFirstIsError: firstIsError,
    wrToWholeRefetch: toWholeRefetch,
    wrIdsShiffled: idsShiffled,
    wrFirstResult: firstResult,
  };
}
