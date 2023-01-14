import { RsuvTxChecked } from "rsuv-lib";

import { MsscSourceType } from "../types/MsscSourceType";
import { MsscFilterType } from "../types/types/MsscFilterType";
import { MsscTagGroupElemsType } from "../types/types/MsscTagGroupElemsType";

export interface ParamsType {
  source: MsscSourceType<any>;
  tagGroupSelectedArr: MsscTagGroupElemsType[];
  /** текст введённый пользователем в строку поиска */
  searchText: string;
  isTagsExist: boolean;
}

/**
 * Готовит объекты фильтрации на базе текста-для-поиска {@param searchText} и выбранных
 * тегов {@param tagGroupSelectedArr}
 *
 * @param source
 * @param tagGroupSelectedArr - теги выбранные пользователем
 * @param searchText - текст поиска введённый пользователем
 * @param isTagsCreate
 */
export function msscFiltersCreate({
  source,
  tagGroupSelectedArr,
  searchText,
  isTagsExist
}: ParamsType): MsscFilterType[] {
  // --- filterTags
  const filterTags: MsscFilterType[] = [];
  if (isTagsExist) {
    tagGroupSelectedArr.forEach((elTagGroupElems: MsscTagGroupElemsType) => {
      const tagValues = elTagGroupElems.elems.map((el: RsuvTxChecked) => el.id);
      const filters: MsscFilterType[] =
        source?.filterFromTags(tagValues, elTagGroupElems.id) ?? [];
      filterTags.push(...filters);
    });
  }
  // ---
  const filterSearchText = source?.filterFromSearchText(searchText) ?? [];
  // ---
  return [...filterTags, ...filterSearchText];
}
