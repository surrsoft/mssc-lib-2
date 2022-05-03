import React from 'react';
import { MsscElemStruct } from '../../MsscList/msscUtils/MsscElemStruct';

export const elemStructBuilder = ({checkboxJsx, bodyJsx, menuJsx}: MsscElemStruct) => {
  return (
    <>
      {checkboxJsx}
      {bodyJsx}
      {menuJsx}
    </>
  )
}
