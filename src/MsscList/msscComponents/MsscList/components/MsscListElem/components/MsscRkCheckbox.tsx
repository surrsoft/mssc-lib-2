import React from 'react';

interface PropsType {
  isChecked: boolean
  onCheckboxChange: (ev: any) => void
}

export function MsscRkCheckbox({isChecked, onCheckboxChange}: PropsType) {
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
