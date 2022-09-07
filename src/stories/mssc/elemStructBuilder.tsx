import React from 'react';
import { MsscElemStructType } from '../../MsscList/types/types';

export const elemStructBuilder = ({checkboxJsx, bodyJsx, menuJsx}: MsscElemStructType) => {
  return (
    <>
      {checkboxJsx}
      {bodyJsx}
      {menuJsx}
    </>
  )
}
