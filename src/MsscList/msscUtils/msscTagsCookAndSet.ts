import _ from "lodash";
import { RsuvTxChecked } from "rsuv-lib";

import { MsscSourceType } from "../types/MsscSourceType";
import { MsscFilterType } from "../types/types/MsscFilterType";
import { MsscTagGroupElemsPlusType } from "../types/types/MsscTagGroupElemsPlusType";
import { MsscTagGroupElemsType } from "../types/types/MsscTagGroupElemsType";
import { MsscTagGroupType } from "../types/types/MsscTagGroupType";
import { MsscSquareBracketsCls } from "./MsscSquareBracketsCls";

export interface ParamsType {
  /** массив *т-групп, см. {@link umsscTAGGROUPu} */
  tgroups?: MsscTagGroupType[];
  source: MsscSourceType<any>;
  filters: MsscFilterType[];
  $selectedTags: MsscTagGroupElemsType[];
  $selectedTagsSet: any;
}

/**
 * Формирует массив сущностей типа {@link MsscTagGroupElemsType} и пишет её в стейт
 * с помощью {@param $tagGroupArrSet}
 *
 * @param tgroups
 * @param source
 * @param filters
 */
export async function msscTagsCookAndSet(
  {
    tgroups,
    source,
    filters,
    $selectedTags,
    $selectedTagsSet,
  }: ParamsType
): Promise<MsscTagGroupElemsPlusType[] | null> {
  if (tgroups && tgroups.length > 0) {
    const tagsTotal: MsscTagGroupElemsPlusType[] = [];
    for (const elTagGroup of tgroups) {
      // --- получает с бэка список тегов для текущей *т-группы
      let tagObjArr = await source?.tags(filters, elTagGroup.fieldName);
      // --- sort
      tagObjArr = _.orderBy(tagObjArr, ["count", "value"], ["desc", "asc"]);
      // --- преобразование тегов к виду RsuvTxChecked[]
      const tagsNext: RsuvTxChecked[] = tagObjArr.map((el) => {
        return new RsuvTxChecked(el.value, `${el.value} (${el.count})`);
      });
      // ---
      tagsNext.forEach((elTag) => {
        if ($selectedTags.some((el) => el.id === elTag.id)) {
          elTag.checked = true;
        }
        elTag.visibleText = MsscSquareBracketsCls.bracketsRemove(elTag.visibleText);
      });
      // ---
      const group: MsscTagGroupElemsPlusType = {
        id: elTagGroup.id,
        elems: tagsNext,
        visibleName: elTagGroup.visibleName,
      };
      tagsTotal.push(group);
    }
    $selectedTagsSet(tagsTotal); // TODO в дальнейшем это будет не нужно
    return tagsTotal;
  }
  return null;
}
