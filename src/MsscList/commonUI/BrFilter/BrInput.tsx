import React from 'react';
import './brFilter.scss';
import { useEffect, useState } from 'react';
import _ from 'lodash';

export enum BrInputEnIcon {
  SEARCH = 'search',
  FILTER = 'filter'
}

interface BrInputProps {
  icon?: BrInputEnIcon
  /**
   * колбэк через который потребитель получает вводимый пользователем текст текст
   * @param value
   */
  cbOnChange?: (value: string) => void,
  /**
   * debounce-задержка вызова {@link cbOnChange}, в милисекундах
   */
  debounceMillisec?: number
  /**
   * начальное содержимое поля ввода
   */
  initialValue?: string
  /**
   * если TRUE то input будет автоматически получать фокус
   */
  autoFocus?: boolean
}

const config = {
  size: '16px'
}

const iconBy = (enIcon: BrInputEnIcon) => {
  switch (enIcon) {
    case BrInputEnIcon.SEARCH:
      return (
        <svg width={config.size} height={config.size} viewBox="0 0 24 24" id="magicoon-Regular"
             xmlns="http://www.w3.org/2000/svg">
          <g id="search-Regular">
            <path id="search-Regular-2" data-name="search-Regular" fill="#41416e"
                  d="M21.53,20.47l-4.694-4.695a8.264,8.264,0,1,0-1.061,1.061L20.47,21.53a.75.75,0,0,0,1.06-1.06ZM3.75,10.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,3.75,10.5Z"/>
          </g>
        </svg>
      )
    case BrInputEnIcon.FILTER:
      return (
        <svg width={config.size} height={config.size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path fill="var(--ci-primary-color, currentColor)"
                d="M238.627,496H192V253.828l-168-200V16H480V53.612l-160,200V414.627ZM224,464h1.373L288,401.373V242.388L443.51,48H60.9L224,242.172Z"
                className="ci-primary"/>
        </svg>
      )
  }
}

let debounce: any = null

export default function BrInput({
                                  icon = BrInputEnIcon.FILTER,
                                  cbOnChange,
                                  debounceMillisec = 700,
                                  initialValue = '',
                                  autoFocus = false
                                }: BrInputProps) {
  const [$inputValue, $inputValueSet] = useState(initialValue);

  function inputHandler(ev: any) {
    const value = ev.target.value;
    $inputValueSet(value)
    debounce?.(value, cbOnChange)
  }

  useEffect(() => {
    if (!debounce) {
      debounce = _.debounce((val, cbOnChange) => {
        cbOnChange?.(val)
      }, debounceMillisec)
    }
  }, []);

  function btnHandle() {
    $inputValueSet('')
    cbOnChange?.('')
  }

  return (
    <div className="br-input">
      {iconBy(icon)}
      <input className="br-input__input" type="text" value={$inputValue} onChange={inputHandler} autoFocus={autoFocus}/>
      <button onClick={btnHandle}>
        <style>{`.cls1:hover { stroke: red; fill: red; }`}</style>
        <svg className="cls1" width="20px" height="20px" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <path d="M37.304 11.282l1.414 1.414-26.022 26.02-1.414-1.413z"/>
          <path d="M12.696 11.282l26.022 26.02-1.414 1.415-26.022-26.02z"/>
        </svg>
      </button>
    </div>
  )
}
