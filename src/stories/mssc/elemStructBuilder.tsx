import React from 'react';
import { MsscElemStructType } from '../../MsscList/types/types/MsscElemStructType';

export const elemStructBuilder = ({checkboxJsx, bodyJsx, menuJsx}: MsscElemStructType) => {
  return (
    <>
      {checkboxJsx}
      {bodyJsx}
      {menuJsx}
    </>
  )
}
