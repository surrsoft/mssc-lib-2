import _ from "lodash";
import { RsuvTxChecked } from "rsuv-lib";

import { MsscTagGroupType } from '../types/types/MsscTagGroupType';
import { MsscTagsCookParamsType } from '../types/types/MsscTagsCookParamsType';
import { SquareBrackets } from "./SquareBrackets";

export async function tagsCookAndSet(
  {
    tagsFieldNameArr,
    source,
    filters,
    tagGroupSelectedArr,
    $tagGroupArrSet
  }: MsscTagsCookParamsType
) {
  if (tagsFieldNameArr && tagsFieldNameArr.length > 0) {
    const tagsTotal: MsscTagGroupType[] = [];
    for (const elTg of tagsFieldNameArr) { // LOOP
      let tags = await source?.tags(filters, elTg.fieldName)
      // --- sort
      tags = _.orderBy(tags, ['count', 'value'], ['desc', 'asc'])
      // ---
      const tags0: RsuvTxChecked[] = tags.map(el => {
        return new RsuvTxChecked(el.value, `${el.value} (${el.count})`)
      })
      // ---
      tags0.forEach(elTag => {
        if (tagGroupSelectedArr.find(el => el.id === elTag.id)) {
          elTag.checked = true;
        }
        elTag.visibleText = SquareBrackets.bracketsRemove(elTag.visibleText)
      })
      // ---
      const group: MsscTagGroupType = { id: elTg.id, elems: tags0, visibleName: elTg.visibleName }
      tagsTotal.push(group)
    } // LOOP
    $tagGroupArrSet(tagsTotal)
  }
}
