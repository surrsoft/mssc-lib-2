import React from 'react';
import './listStructBuilder-styles.scss';
import { MsscJsxExternal } from '../../../MsscList/MsscListFCC';

export const listStructBuilder = ({
                     infosJsx,
                     paginator1Jsx,
                     paginator2Jsx,
                     sortJsx,
                     searchJsx,
                     buttonsJsx,
                     listJsx,
                     multiselectJsxArr
                   }: MsscJsxExternal) => {
  return (
    <>
      {paginator1Jsx}
      <div className="block1722">
        <div className="block1722__buttons">
          {buttonsJsx?.btnCreate}
          {buttonsJsx?.btnDelete}
          {buttonsJsx?.btnDeselectAll}
          {buttonsJsx?.btnDice}
        </div>
        {searchJsx}
        {sortJsx}
        {infosJsx}
      </div>
      <div className="blk-tags">
        {multiselectJsxArr?.map(el => {
          return (<div className="block1948">{el}</div>)
        })}
      </div>
      {listJsx}
    </>
  )
}
