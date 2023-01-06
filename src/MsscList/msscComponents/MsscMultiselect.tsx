import _ from "lodash";
import React from "react";
import { RsuvTxChecked } from "rsuv-lib";

import BrMultiselect from "../commonUI/BrMultiselect/BrMultiselect";
import { MsscRefreshesType } from "../types/types/MsscRefreshesType";
import { MsscTagGroupElemsPlusType } from "../types/types/MsscTagGroupElemsPlusType";
import { MsscTagGroupElemsType } from "../types/types/MsscTagGroupElemsType";
import { MsscTagsGroupIdType } from "../types/types/MsscTagsGroupIdType";

export interface PropsType {
  tagsGroupId: MsscTagsGroupIdType;
  refreshes: MsscRefreshesType;
  $tagGroupSelectedArr: MsscTagGroupElemsType[];
  $tagGroupSelectedArrSet: any;
  $tagGroupArr: MsscTagGroupElemsPlusType[];
}

export function MsscMultiselect({
  tagsGroupId,
  refreshes,
  $tagGroupSelectedArr,
  $tagGroupSelectedArrSet,
  $tagGroupArr,
}: PropsType) {
  /**
   * Обработчик выбора тега
   * [[220211130543]]
   * @param checkedElems
   */
  const onChangeHandle = (checkedElems: RsuvTxChecked[]) => {
    const tagGroups = _.cloneDeep($tagGroupSelectedArr);
    const group = tagGroups.find(
      (el: MsscTagGroupElemsType) => el.id === tagsGroupId
    );
    if (group) {
      group.elems = checkedElems;
    } else {
      const newGroup: MsscTagGroupElemsType = {
        id: tagsGroupId,
        elems: checkedElems,
      };
      tagGroups.push(newGroup);
    }
    $tagGroupSelectedArrSet(tagGroups);
    refreshes.whole();
  };

  const tagGroups: MsscTagGroupElemsPlusType | undefined = $tagGroupArr.find(
    (ell: MsscTagGroupElemsPlusType) => ell.id === tagsGroupId
  );
  const tagGroup = $tagGroupSelectedArr.find((el) => el.id === tagsGroupId);
  tagGroups?.elems.forEach((el: RsuvTxChecked) => {
    const b1 = tagGroup?.elems.find((el0) => el0.id === el.id);
    if (b1) {
      el.checked = true;
    }
  });

  return (
    <div className="mscc-mselect">
      <BrMultiselect
        datas={tagGroups?.elems}
        cbOnChange={onChangeHandle}
        text={tagGroups?.visibleName}
      />
    </div>
  );
}
