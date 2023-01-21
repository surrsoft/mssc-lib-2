import { msscFiltersCreate } from "../msscUtils/msscFiltersCreate";
import { MsscSourceType } from "../types/MsscSourceType";
import { MsscFilterType } from "../types/types/MsscFilterType";
import { MsscTagGroupElemsType } from "../types/types/MsscTagGroupElemsType";

interface ParamsType {
  source: MsscSourceType<any> | null;
  searchText?: string;
  isTagsExist?: boolean;
  tagGroupSelectedArr: MsscTagGroupElemsType[];
}

export function useFilters({
  source,
  tagGroupSelectedArr,
  searchText = "",
  isTagsExist = false,
}: ParamsType): MsscFilterType[] {
  return msscFiltersCreate({
    source,
    tagGroupSelectedArr,
    searchText,
    isTagsExist,
  });
}
