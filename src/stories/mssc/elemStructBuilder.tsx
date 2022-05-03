import React from 'react';
import { MsscElemStruct } from '../../MsscList/MsscListFCC';

export const elemStructBuilder = ({checkboxJsx, bodyJsx, menuJsx}: MsscElemStruct) => {
  return (
    <>
      {checkboxJsx}
      {bodyJsx}
      {menuJsx}
    </>
  )
}
