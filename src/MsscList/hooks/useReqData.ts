import { useQuery } from "@tanstack/react-query";
import loShuffle from "lodash/shuffle";
import { useState } from "react";
import { RsuvPaginationGyth } from "rsuv-lib";

import {
  BrSelectIdType,
  BrSelectSortDataType,
} from "../commonUI/BrSelect/types";
import { hxhgQueryConfigs } from "../hxhg-lib/hxhgQueryConfigs";
import { msscElemsCountByFilterAndIf } from "../msscUtils/msscElemsCountByFilterAndIf";
import { msscFiltersCreate } from "../msscUtils/msscFiltersCreate";
import { msscTagsCookAndSet } from "../msscUtils/msscTagsCookAndSet";
import { MSSC_SETTINGS } from "../settings";
import { MsscSourceType } from "../types/MsscSourceType";
import { MsscColumnNameType } from "../types/types/MsscColumnNameType";
import { MsscFilterType } from "../types/types/MsscFilterType";
import { MsscTagGroupElemsPlusType } from "../types/types/MsscTagGroupElemsPlusType";
import { MsscTagGroupElemsType } from "../types/types/MsscTagGroupElemsType";
import { MsscTagGroupType } from "../types/types/MsscTagGroupType";

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

export function useReqData({
  enabled,
  source,
  searchText = "",
  isTagsExist = false,
  tagGroupSelectedArr,
  randomEnabled = false,
  sortData,
  sortIdCurr,
  tagsFieldNameArr,
}: ParamsType) {
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

  return useQuery(
    ["some"],
    async () => {
      const countAllGetPromise = source?.elemsCountByFilter([]);
      // ---
      const promiseCountByFilterArr = []
      if (source) {
        const filters: MsscFilterType[] = msscFiltersCreate({
          source,
          tagGroupSelectedArr,
          searchText,
          isTagsExist,
        });
        // --- получение общего количества элементов с учетом фильтров;
        // в random-режиме также получаем список всех ids
        const promiseCountByFilter = msscElemsCountByFilterAndIf({
          source,
          filters,
          randomEnabled,
          sortData,
          sortIdCurr,
        });
        promiseCountByFilterArr.push(promiseCountByFilter)
        if (randomEnabled) {
          const idsShuffled = loShuffle(ids);
          $idsShuffledSet(idsShuffled);
        }
        // --- получение тегов
        await msscTagsCookAndSet({
          source,
          filters,
          $selectedTags: tagGroupSelectedArr,
          tgroups: tagsFieldNameArr,
          $selectedTagsSet: $tagGroupArrSet,
        });
        // --- pagination - pageCountAll
        const pagination = new RsuvPaginationGyth(
          elemsCountByFilter,
          MSSC_SETTINGS.elemsOnPage
        );
      }
      // ---
      const promises = [countAllGetPromise, ...promiseCountByFilterArr];
      const result = await Promise.all(promises);
      const resultCountAll = result[0];
      console.log("!!-!!-!!  result {230115122249}\n", result); // del+
    },
    { enabled, ...hxhgQueryConfigs }
  );
}
