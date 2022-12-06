import React from 'react';

export interface PropsType {
  isChecked: boolean
  onCheckboxChange: (ev: any) => void
}

export function RkCheckbox({isChecked, onCheckboxChange}: PropsType) {
  return (
    <div className="mssc-list-elem__checkbox">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onCheckboxChange}
      />
    </div>
  )
}
