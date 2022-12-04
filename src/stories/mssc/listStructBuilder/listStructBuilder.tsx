import React from 'react';
import './listStructBuilder-styles.scss';
import { MsscJsxExternalType } from '../../../MsscList/types/types/MsscJsxExternalType';

export const listStructBuilder = ({
                     infosJsx,
                     paginator1Jsx,
                     paginator2Jsx,
                     sortJsx,
                     searchJsx,
                     buttonsJsx,
                     listJsx,
                     multiselectJsxArr
                   }: MsscJsxExternalType) => {
  return (
    <>
      <div className="blk0921-pagination">
        {paginator1Jsx}
      </div>
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
