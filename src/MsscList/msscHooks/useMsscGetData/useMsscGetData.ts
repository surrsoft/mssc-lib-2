import loIsEmpty from "lodash/isEmpty";

import { BrSelectIdType, BrSelectSortDataType } from "../../commonUI/BrSelect/types";
import { MsscSourceType } from "../../types/MsscSourceType";
import { MsscColumnNameType } from "../../types/types/MsscColumnNameType";
import { MsscElemType } from "../../types/types/MsscElemType";
import { MsscFilterType } from "../../types/types/MsscFilterType";
import { MsscTagGroupElemsPlusType } from "../../types/types/MsscTagGroupElemsPlusType";
import { MsscTagGroupElemsType } from "../../types/types/MsscTagGroupElemsType";
import { MsscTagGroupType } from "../../types/types/MsscTagGroupType";
import { useMsscDetails } from "./hooks/useMsscDetails";
import { useMsscFilters } from "./hooks/useMsscFilters";
import { useMsscWhole } from "./hooks/useMsscWhole";

interface ResultMainType {
  isDone: boolean;
  elemsResult: MsscElemType[];
  /** общее кол-во элементов в хранилище, то есть без учёта каких-либо фильтров */
  countAll: number;
  /** количество элементов с учётом фильтров */
  countByFilter: number;
  /** теги */
  tags: MsscTagGroupElemsPlusType[];
  pageCount: number;
  firstIsDone: boolean;
  detailsIsDone: boolean;
  firstIsError: boolean;
  detailsIsError: boolean;
  toWholeRefetch: () => void;
}

interface ParamsType {
  source: MsscSourceType<any> | null;
  tagGroupSelectedArr: MsscTagGroupElemsType[];
  randomEnabled?: boolean;
  sortIdCurr?: BrSelectIdType;
  tagsFieldNameArr?: MsscTagGroupType[];
  pageNumCurrent: number;
  sortData?: BrSelectSortDataType<MsscColumnNameType>;
  $searchText: string;
}

export function useMsscGetData({
                                 pageNumCurrent,
                                 source,
                                 tagGroupSelectedArr,
                                 randomEnabled = false,
                                 sortIdCurr,
                                 tagsFieldNameArr,
                                 sortData,
                                 $searchText,
                               }: ParamsType): ResultMainType {
  // --- filters

  const filters: MsscFilterType[] = useMsscFilters({
    source,
    tagGroupSelectedArr,
    searchText: $searchText,
    isTagsExist: !loIsEmpty(tagsFieldNameArr),
  });

  // --- req first

  const {
    wrCountByFilter: countByFilter,
    wrIdsShiffled: idsShiffled,
    wrFirstIsDone: firstIsDone,
    wrCountAll: countAll,
    wrTags: tags,
    wrPageCount: pageCount,
    wrFirstIsError: firstIsError,
    wrToWholeRefetch: wholeRefetch,
  } = useMsscWhole({
    source,
    $searchText,
    randomEnabled,
    tagGroupSelectedArr,
    sortIdCurr,
    tagsFieldNameArr,
    filters,
  });

  // --- req two

  const { twoIsDone, elemsResult, twoIsError } = useMsscDetails({
    enabled: firstIsDone,
    idsShiffled,
    countByFilter,
    sortData,
    pageNumCurrent,
    randomEnabled,
    sortIdCurr,
    source,
    filters,
  });

  console.log("!!-!!-!!  twoIsDone {230130212727}\n", twoIsDone); // del+

  // ---

  return {
    isDone: firstIsDone && twoIsDone,
    elemsResult,
    countAll,
    countByFilter,
    tags,
    pageCount,
    firstIsDone,
    detailsIsDone: twoIsDone,
    firstIsError,
    detailsIsError: twoIsError,
    toWholeRefetch: wholeRefetch,
  };
}
