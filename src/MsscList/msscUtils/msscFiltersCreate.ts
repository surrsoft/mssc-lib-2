import { RsuvTxChecked } from "rsuv-lib";

import { MsscSourceType } from "../types/MsscSourceType";
import { MsscFilterType } from "../types/types/MsscFilterType";
import { MsscTagGroupElemsType } from "../types/types/MsscTagGroupElemsType";

export interface ParamsType {
  source: MsscSourceType<any>;
  tagGroupSelectedArr: MsscTagGroupElemsType[];
  /** текст введённый пользователем в строку поиска */
  searchText: string;
  isTagsCreate: boolean;
}

/**
 * Готовит объекты фильтрации на базе текста-для-поиска {@param searchText}, тегов {@param tagGroupSelectedArr}
 * @param source
 * @param tagGroupSelectedArr
 * @param searchText - текст поиска введённый пользователем
 * @param isTagsCreate
 */
export function msscFiltersCreate({
  source,
  tagGroupSelectedArr,
  searchText,
  isTagsCreate
}: ParamsType): MsscFilterType[] {
  // --- filterTags
  const filterTags: MsscFilterType[] = [];
  if (isTagsCreate) {
    tagGroupSelectedArr.forEach((elTagGroup: MsscTagGroupElemsType) => {
      const tags = elTagGroup.elems.map((el: RsuvTxChecked) => el.id);
      const filters: MsscFilterType[] =
        source?.filterFromTags(tags, elTagGroup.id) ?? [];
      filterTags.push(...filters);
    });
  }
  // ---
  const filterSearchText = source?.filterFromSearchText(searchText) ?? [];
  // ---
  return [...filterTags, ...filterSearchText];
}
