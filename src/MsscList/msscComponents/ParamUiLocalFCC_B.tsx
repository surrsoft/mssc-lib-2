import React from 'react';

export function ParamUiLocalFCC_B({str1, str2}: { str1: string, str2?: any }) {
  return (
    <div
      className="mssc-infos-b__value"
      title={str1}
    >
      {(str2 || str2 === 0) ? str2 : '-'}
    </div>
  )
}
