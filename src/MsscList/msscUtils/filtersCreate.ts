import _ from "lodash";
import {RsuvTxChecked} from "rsuv-lib";

import { MsscFilterType } from '../types/types/MsscFilterType';
import { MsscTagGroupSelectedType } from '../types/types/MsscTagGroupSelectedType';
import { MsscFiltersCreateParamsType } from '../types/types/MsscFiltersCreateParamsType';

/**
 * Готовит объекты фильтрации на базе текста-для-поиска {@param searchText}, тегов {@param tagGroupSelectedArr}
 * @param source
 * @param tagGroupSelectedArr
 * @param searchText - текст поиска введённый пользователем
 * @param tagsFieldNameArr - описания полей с тегами, см. [220607221651]
 */
export function filtersCreate(
    {
        source,
        tagGroupSelectedArr,
        searchText,
        tagsFieldNameArr,
    }: MsscFiltersCreateParamsType
): MsscFilterType[] {
    let filterTags: MsscFilterType[] = []
    if (!_.isEmpty(tagsFieldNameArr)) {
        tagGroupSelectedArr.map((elTagGroup: MsscTagGroupSelectedType) => {
            const tags = elTagGroup.elems.map((el: RsuvTxChecked) => {
                return el.id
            })
            const filters: MsscFilterType[] = source?.filterFromTags(tags, elTagGroup.id) || []
            filterTags.push(...filters)
        })
    }
    const filterSearchText = source?.filterFromSearchText(searchText) || []
    // ---
    return [...filterTags, ...filterSearchText];
}
