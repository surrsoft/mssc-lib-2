import _ from "lodash";
import { RsuvTxChecked } from "rsuv-lib";

import { MsscSourceType } from "../types/MsscSourceType";
import { MsscFilterType } from "../types/types/MsscFilterType";
import { MsscTagGroupAllType } from "../types/types/MsscTagGroupAllType";
import { MsscTagGroupSelectedType } from "../types/types/MsscTagGroupSelectedType";
import { MsscTagGroupType } from "../types/types/MsscTagGroupType";
import { MsscSquareBracketsCls } from "./MsscSquareBracketsCls";

export interface ParamsType {
  /** см. [220607221651] */
  tagsFieldNameArr?: MsscTagGroupType[];
  source: MsscSourceType<any>;
  filters: MsscFilterType[];
  tagGroupSelectedArr: MsscTagGroupSelectedType[];
  $tagGroupArrSet: any;
}

export async function msscTagsCookAndSet({
  tagsFieldNameArr,
  source,
  filters,
  tagGroupSelectedArr,
  $tagGroupArrSet,
}: ParamsType) {
  if (tagsFieldNameArr && tagsFieldNameArr.length > 0) {
    const tagsTotal: MsscTagGroupAllType[] = [];
    for (const elTg of tagsFieldNameArr) {
      // LOOP
      let tags = await source?.tags(filters, elTg.fieldName);
      // --- sort
      tags = _.orderBy(tags, ["count", "value"], ["desc", "asc"]);
      // ---
      const tags0: RsuvTxChecked[] = tags.map((el) => {
        return new RsuvTxChecked(el.value, `${el.value} (${el.count})`);
      });
      // ---
      tags0.forEach((elTag) => {
        if (tagGroupSelectedArr.find((el) => el.id === elTag.id)) {
          elTag.checked = true;
        }
        elTag.visibleText = MsscSquareBracketsCls.bracketsRemove(elTag.visibleText);
      });
      // ---
      const group: MsscTagGroupAllType = {
        id: elTg.id,
        elems: tags0,
        visibleName: elTg.visibleName,
      };
      tagsTotal.push(group);
    } // LOOP
    $tagGroupArrSet(tagsTotal);
  }
}
