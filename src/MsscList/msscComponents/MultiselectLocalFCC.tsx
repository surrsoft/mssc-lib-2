import React from 'react';
import _ from 'lodash';
import { MsscTagsGroupIdType } from '../types/types/MsscTagsGroupIdType';
import { RsuvTxChecked } from 'rsuv-lib';
import { MsscTagGroupSelectedType } from '../types/types/MsscTagGroupSelectedType';
import { MsscTagGroupType } from '../types/types/MsscTagGroupType';
import BrMultiselect from '../commonUI/BrMultiselect/BrMultiselect';
import { MsscRefreshesType } from '../types/types/MsscRefreshesType';

export interface PropsType {
  tagsGroupId: MsscTagsGroupIdType
  refreshes: MsscRefreshesType
  $tagGroupSelectedArr: MsscTagGroupSelectedType[]
  $tagGroupSelectedArrSet: any
  $tagGroupArr: MsscTagGroupType[]
}

export function MultiselectLocalFCC({
                               tagsGroupId,
                               refreshes,
                               $tagGroupSelectedArr,
                               $tagGroupSelectedArrSet,
                               $tagGroupArr
                             }: PropsType) {

  /**
   * Обработчик выбора тега
   * [[220211130543]]
   * @param checkedElems
   */
  const onChangeHandle = (checkedElems: RsuvTxChecked[]) => {
    const tagGroups = _.cloneDeep($tagGroupSelectedArr)
    const group = tagGroups.find((el: MsscTagGroupSelectedType) => el.id === tagsGroupId)
    if (group) {
      group.elems = checkedElems;
    } else {
      const newGroup = {id: tagsGroupId, elems: checkedElems} as MsscTagGroupSelectedType
      tagGroups.push(newGroup)
    }
    $tagGroupSelectedArrSet(tagGroups)
    refreshes.whole()
  }

  const tagGroups: MsscTagGroupType | undefined = $tagGroupArr.find((ell: MsscTagGroupType) => ell.id === tagsGroupId)
  const tagGroup = $tagGroupSelectedArr.find(el => el.id === tagsGroupId)
  tagGroups?.elems.forEach((el: RsuvTxChecked) => {
    const b1 = tagGroup?.elems.find(el0 => el0.id === el.id)
    if (b1) {
      el.checked = true
    }
  })

  return (
    <div className="mscc-mselect">
      <BrMultiselect datas={tagGroups?.elems} cbOnChange={onChangeHandle} text={tagGroups?.visibleName}/>
    </div>
  )
}
