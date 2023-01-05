import _ from "lodash";
import React from "react";
import { RsuvTxChecked } from "rsuv-lib";

import BrMultiselect from "../commonUI/BrMultiselect/BrMultiselect";
import { MsscRefreshesType } from "../types/types/MsscRefreshesType";
import { MsscTagGroupAllType } from "../types/types/MsscTagGroupAllType";
import { MsscTagGroupSelectedType } from "../types/types/MsscTagGroupSelectedType";
import { MsscTagsGroupIdType } from "../types/types/MsscTagsGroupIdType";

export interface PropsType {
  tagsGroupId: MsscTagsGroupIdType;
  refreshes: MsscRefreshesType;
  $tagGroupSelectedArr: MsscTagGroupSelectedType[];
  $tagGroupSelectedArrSet: any;
  $tagGroupArr: MsscTagGroupAllType[];
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
      (el: MsscTagGroupSelectedType) => el.id === tagsGroupId
    );
    if (group) {
      group.elems = checkedElems;
    } else {
      const newGroup: MsscTagGroupSelectedType = {
        id: tagsGroupId,
        elems: checkedElems,
      };
      tagGroups.push(newGroup);
    }
    $tagGroupSelectedArrSet(tagGroups);
    refreshes.whole();
  };

  const tagGroups: MsscTagGroupAllType | undefined = $tagGroupArr.find(
    (ell: MsscTagGroupAllType) => ell.id === tagsGroupId
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
