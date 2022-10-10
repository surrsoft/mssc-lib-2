import _ from "lodash";
import {RsuvTxChecked} from "rsuv-lib";

import {MsscTagGroupType, TagsParamsType} from "../types/types";
import {SquareBrackets} from "./SquareBrackets";

export async function tagsCookAndSet(
    {
        tagsFieldNameArr,
        source,
        filters,
        tagGroupSelectedArr,
        $tagGroupArrSet
    }: TagsParamsType
) {
    if (tagsFieldNameArr && tagsFieldNameArr.length > 0) {
        const tagsTotal: MsscTagGroupType[] = [];
        for (let elTg of tagsFieldNameArr) { // LOOP
            let tags = await source?.tags(filters, elTg.fieldName)
            // --- sort
            tags = _.orderBy(tags, ['count', 'value'], ['desc', 'asc'])
            // ---
            const tags0: RsuvTxChecked[] = tags.map(el => {
                return new RsuvTxChecked(el.value, `${el.value} (${el.count})`)
            })
            // ---
            tags0.forEach(elTag => {
                const b1 = tagGroupSelectedArr.find(el => el.id === elTag.id)
                if (b1) {
                    elTag.checked = true;
                }
                elTag.visibleText = SquareBrackets.bracketsRemove(elTag.visibleText)
            })
            // ---
            const rr = {id: elTg.id, elems: tags0, visibleName: elTg.visibleName} as MsscTagGroupType
            tagsTotal.push(rr)
        } // LOOP
        $tagGroupArrSet(tagsTotal)
    }
}