import { MsscParamUiLocal } from './MsscParamUiLocal';
import React from 'react';

export interface PropsType {
  $elemsCountOnCurrPage: number
  $elemsCountByFilter: number
  elemsAll: string
  elemsCountSelected: number
}

export function MsscInfos({$elemsCountOnCurrPage, $elemsCountByFilter, elemsAll, elemsCountSelected}: PropsType) {
  return (
    <div className="mssc-infos-b">
      <MsscParamUiLocal str1="элементов на текущ. странице" str2={$elemsCountOnCurrPage}/>
      <span className="mssc-infos-b__divider">/</span>
      <MsscParamUiLocal str1="элементов всего по фильтру" str2={$elemsCountByFilter}/>
      <span className="mssc-infos-b__divider">/</span>
      <MsscParamUiLocal str1="элементов всего" str2={elemsAll}/>
      <span className="mssc-infos-b__divider">/</span>
      <MsscParamUiLocal str1="элементов выбрано" str2={elemsCountSelected}/>
    </div>
  )
}
