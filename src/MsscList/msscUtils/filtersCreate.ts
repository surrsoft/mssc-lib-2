import _ from "lodash";
import { RsuvTxChecked } from "rsuv-lib";

import { MsscFiltersCreateParamsType } from "../types/types/MsscFiltersCreateParamsType";
import { MsscTagGroupSelectedType } from "../types/types/MsscTagGroupSelectedType";
import { VanxFilterType } from "../vanx/types/VanxFilterType";

/**
 * Готовит объекты фильтрации на базе текста-для-поиска {@param searchText}, тегов {@param tagGroupSelectedArr}
 * @param source
 * @param tagGroupSelectedArr
 * @param searchText - текст поиска введённый пользователем
 * @param tagsFieldNameArr - описания полей с тегами, см. [220607221651]
 */
export function filtersCreate({
                                source,
                                tagGroupSelectedArr,
                                searchText,
                                tagsFieldNameArr,
                              }: MsscFiltersCreateParamsType): VanxFilterType[] {
  const filterTags: VanxFilterType[] = [];
  if (!_.isEmpty(tagsFieldNameArr)) {
    tagGroupSelectedArr.forEach((elTagGroup: MsscTagGroupSelectedType) => {
      const tags = elTagGroup.elems.map((el: RsuvTxChecked) => {
        return el.id;
      });
      const filters: VanxFilterType[] =
        source?.filterFromTags(tags, elTagGroup.id) ?? [];
      filterTags.push(...filters);
    });
  }
  const filterSearchText = source?.filterFromSearchText(searchText) ?? [];
  // ---
  return [...filterTags, ...filterSearchText];
}
