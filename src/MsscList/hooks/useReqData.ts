import { useQuery } from "@tanstack/react-query";
import { UseQueryResult } from '@tanstack/react-query/src/types';
import loShuffle from 'lodash/shuffle';
import { useState } from "react";
import { RsuvPaginationGyth, RsuvTxNumIntAB } from "rsuv-lib";

import {
  BrSelectIdType,
  BrSelectSortDataType,
} from "../commonUI/BrSelect/types";
import { hxhgQueryConfigs } from "../hxhg-lib/hxhgQueryConfigs";
import { msscElemsCountByFilterAndIf } from "../msscUtils/msscElemsCountByFilterAndIf";
import { msscFiltersCreate } from "../msscUtils/msscFiltersCreate";
import { msscTagsCookAndSet } from "../msscUtils/msscTagsCookAndSet";
import { MSSC_SETTINGS } from '../settings';
import { MsscSourceType } from "../types/MsscSourceType";
import { MsscColumnNameType } from "../types/types/MsscColumnNameType";
import { MsscElemsCountReturnType } from '../types/types/MsscElemsCountReturnType';
import { MsscFilterType } from "../types/types/MsscFilterType";
import { MsscTagGroupElemsPlusType } from "../types/types/MsscTagGroupElemsPlusType";
import { MsscTagGroupElemsType } from "../types/types/MsscTagGroupElemsType";
import { MsscTagGroupType } from "../types/types/MsscTagGroupType";

// тут может быть любое значение, не имеет разницы
const STUB_VALUE = -1;


interface ResultType {
  countAll: number,
  countByFilter: number,
  tags: MsscTagGroupElemsPlusType[],
  ids: string[]
  idsShuffled: string[]
  pageCount: number
}

interface ParamsType {
  enabled: boolean;
  source: MsscSourceType<any> | null;
  searchText?: string;
  isTagsExist?: boolean;
  tagGroupSelectedArr: MsscTagGroupElemsType[];
  randomEnabled?: boolean;
  sortData?: BrSelectSortDataType<MsscColumnNameType>;
  sortIdCurr?: BrSelectIdType;
  tagsFieldNameArr?: MsscTagGroupType[];
}

export function useReqData(
  {
    enabled,
    source,
    searchText = "",
    isTagsExist = false,
    tagGroupSelectedArr,
    randomEnabled = false,
    sortData,
    sortIdCurr,
    tagsFieldNameArr,
  }: ParamsType
): UseQueryResult<ResultType> {
  // общее количество элементов хранилища (без учёта каких-либо фильтров)
  const [$elCountAll, $elCountAllSet] = useState(0);
  // общее количество элементов хранилища по фильтру
  const [$elemsCountByFilter, $elemsCountByFilterSet] = useState(0);
  // ids элементов в случайном порядке
  const [$idsShuffled, $idsShuffledSet] = useState<string[]>([]);
  // все *группы-тегов
  const [$tagGroupArr, $tagGroupArrSet] = useState<MsscTagGroupElemsPlusType[]>(
    []
  );
  // всего страниц
  const [$pageCountAll, $pageCountAllSet] = useState(0);

  return useQuery<unknown, unknown, ResultType>(
    ["some"],
    async () => {
      // ---
      const countAllGetPromise = source?.elemsCountByFilter([]);
      // ---
      const promisesNext = []
      // --- filters
      const filters: MsscFilterType[] = msscFiltersCreate({
        source,
        tagGroupSelectedArr,
        searchText,
        isTagsExist,
      });
      // ---
      if (source) {
        console.log('!!-!!-!!  filters {230116223938}\n', filters); // del+
        // --- получение общего количества элементов с учетом фильтров;
        // в random-режиме также получаем список всех ids
        if (filters.length > 0) {
          const promiseCountByFilter = msscElemsCountByFilterAndIf({
            source,
            filters,
            randomEnabled,
            sortData,
            sortIdCurr,
          });
          promisesNext.push(promiseCountByFilter);
        } else {
          // если фильтров нет, то для "количества элементов с учётом фильтров" просто возьмём
          // "общее количество элементов без учёта фильтров", а здесь просто вставим заглушку (для удобства)
          promisesNext.push(STUB_VALUE)
        }
        // del+ mass

        // --- получение тегов
        const promiseTagsCook = msscTagsCookAndSet({
          source,
          filters,
          $selectedTags: tagGroupSelectedArr,
          tgroups: tagsFieldNameArr,
          $selectedTagsSet: $tagGroupArrSet,
        });
        promisesNext.push(promiseTagsCook);
      }
      // ---
      const promises = [countAllGetPromise, ...promisesNext];
      const result = await Promise.all(promises); // TODO обработать error
      const resultNext = result as [RsuvTxNumIntAB, MsscElemsCountReturnType, MsscTagGroupElemsPlusType[] | null];
      // ---
      const countAll = resultNext[0].val;
      const countByFilter = filters.length > 0 ? resultNext[1].elemsCountByFilter : countAll;
      const ids = resultNext[1].ids;
      const tags = resultNext[2] ?? [];
      // --- idsShuffled
      let idsShuffled: string[] = []
      if (randomEnabled) {
        idsShuffled = loShuffle(ids);
      }
      // --- pageCount
      const pagination: RsuvPaginationGyth = new RsuvPaginationGyth(
        countByFilter,
        MSSC_SETTINGS.elemsOnPage
      );
      const pageCount = pagination.pageCount;
      // ---
      const ret: ResultType = { countAll, countByFilter, tags, ids, idsShuffled, pageCount }
      return ret;
    },
    { enabled, ...hxhgQueryConfigs }
  );
}

