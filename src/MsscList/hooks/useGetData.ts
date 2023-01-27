import { useQuery } from "@tanstack/react-query";
import loShuffle from "lodash/shuffle";
import {
  RsuvPaginationGyth,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort,
} from "rsuv-lib";

import { rqQueryHandle } from "../common/rqQueryHandle";
import {
  BrSelectIdType,
  BrSelectSortDataType,
} from "../commonUI/BrSelect/types";
import { hxhgQueryConfigs } from "../hxhg-lib/hxhgQueryConfigs";
import { msscElemsCountByFilterAndIf } from "../msscUtils/msscElemsCountByFilterAndIf";
import { msscSortsCreate } from "../msscUtils/msscSortsCreate";
import { msscTagsCookAndSet } from "../msscUtils/msscTagsCookAndSet";
import { MSSC_SETTINGS } from "../settings";
import { MsscSourceType } from "../types/MsscSourceType";
import { MsscColumnNameType } from "../types/types/MsscColumnNameType";
import { MsscElemsCountReturnType } from "../types/types/MsscElemsCountReturnType";
import { MsscElemType } from "../types/types/MsscElemType";
import { MsscFilterType } from "../types/types/MsscFilterType";
import { MsscIdObjectType } from '../types/types/MsscIdObjectType';
import { MsscTagGroupElemsPlusType } from "../types/types/MsscTagGroupElemsPlusType";
import { MsscTagGroupElemsType } from "../types/types/MsscTagGroupElemsType";
import { MsscTagGroupType } from "../types/types/MsscTagGroupType";

// тут может быть любое значение
const STUB_VALUE = -1;

const shuffleUtils = {
  /**
   * Получить ids из (3) начиная с (1) включительно по (2) исключительно
   * @param ixStart (1) -- индекс
   * @param ixEnd (2) -- индекс
   * @param idsShuffled
   */
  elems(ixStart: number, ixEnd: number, idsShuffled: string[]): MsscIdObjectType[] {
    return idsShuffled.slice(ixStart, ixEnd + 1).map((el) => ({ id: el }));
  },
};

interface FirstResultType {
  countAll: number;
  countByFilter: number;
  tags: MsscTagGroupElemsPlusType[];
  idsShuffled: string[];
  pageCount: number;
}

interface ResultMainType {
  isDone: boolean;
  firstRefetch: any;
  twoRefetch: any;
  elemsResult: MsscElemType[];
  countAll: number;
  countByFilter: number;
  tags: MsscTagGroupElemsPlusType[];
  pageCount: number;
  firstIsDone: boolean;
  twoIsDone: boolean;
}

interface ParamsType {
  enabled: boolean;
  source: MsscSourceType<any> | null;
  tagGroupSelectedArr: MsscTagGroupElemsType[];
  randomEnabled?: boolean;
  sortIdCurr?: BrSelectIdType;
  tagsFieldNameArr?: MsscTagGroupType[];
  filters: MsscFilterType[];
  $pageNumCurrent: number;
  sortData?: BrSelectSortDataType<MsscColumnNameType>;
  $sortIdCurr?: BrSelectIdType;
  $randomEnabled?: boolean;
}

export function useGetData(
  {
    enabled,
    source,
    tagGroupSelectedArr,
    randomEnabled = false,
    sortIdCurr,
    tagsFieldNameArr,
    filters,
    $pageNumCurrent,
    sortData,
    $sortIdCurr,
    $randomEnabled = false,
  }: ParamsType
): ResultMainType {
  const firstResult = useQuery<unknown, unknown, FirstResultType>(
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
      const ret: FirstResultType = {
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

  const { isDone: firstIsDone } = rqQueryHandle(firstResult);

  const countAll = firstResult.data?.countAll ?? 0;
  const countByFilter = firstResult.data?.countByFilter ?? 0;
  const tags = firstResult.data?.tags ?? [];
  const idsShiffled = firstResult.data?.idsShuffled ?? [];
  const pageCount = firstResult.data?.pageCount ?? 0;

  const firstRefetch = firstResult.refetch;

  // --- --- req two

  let elemsResult: MsscElemType[] = [];

  const twoResult = useQuery(
    ["request-2"],
    async () => {
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
      // --- сортировка
      const sorts: RsuvTxSort[] = msscSortsCreate(sortData, $sortIdCurr);
      // ---
      if (!$randomEnabled) {
        elemsResult = await source?.elems(
          new RsuvTxNumIntDiap(
            new RsuvTxNumIntAB(ixStart),
            new RsuvTxNumIntAB(ixEnd)
          ),
          filters,
          sorts
        ) ?? [];
      } else {
        const idObjs = shuffleUtils.elems(ixStart, ixEnd, idsShiffled);
        const elems: Array<MsscElemType | null> = await source?.elemsById(idObjs) ?? [];
        elemsResult = elems.filter((el: MsscElemType | null) => el !== null) as MsscElemType[];
      }
    },
    { enabled: firstIsDone, ...hxhgQueryConfigs }
  );
  const { refetch: twoRefetch } = twoResult;
  const { isDone: twoIsDone } = rqQueryHandle(firstResult);

  return {
    firstRefetch,
    twoRefetch,
    isDone: firstIsDone && twoIsDone,
    elemsResult,
    countAll,
    countByFilter,
    tags,
    pageCount,
    firstIsDone,
    twoIsDone
  };
}
