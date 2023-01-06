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
 * @param tagGroupSelectedArr
 */
export async function msscTagsCookAndSet({
  tgroups,
  source,
  filters,
  $selectedTags,
  $selectedTagsSet,
}: ParamsType) {
  if (tgroups && tgroups.length > 0) {
    const tagsTotal: MsscTagGroupElemsPlusType[] = [];
    for (const elTagGroup of tgroups) {
      // ---
      let tags = await source?.tags(filters, elTagGroup.fieldName);
      // --- sort
      tags = _.orderBy(tags, ["count", "value"], ["desc", "asc"]);
      // ---
      const tags0: RsuvTxChecked[] = tags.map((el) => {
        return new RsuvTxChecked(el.value, `${el.value} (${el.count})`);
      });
      // ---
      tags0.forEach((elTag) => {
        if ($selectedTags.find((el) => el.id === elTag.id)) {
          elTag.checked = true;
        }
        elTag.visibleText = MsscSquareBracketsCls.bracketsRemove(elTag.visibleText);
      });
      // ---
      const group: MsscTagGroupElemsPlusType = {
        id: elTagGroup.id,
        elems: tags0,
        visibleName: elTagGroup.visibleName,
      };
      tagsTotal.push(group);
    }
    $selectedTagsSet(tagsTotal);
  }
}
