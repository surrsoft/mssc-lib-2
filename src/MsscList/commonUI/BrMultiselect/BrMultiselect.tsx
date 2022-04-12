import './brMultiselectStyles.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { RsuvTxChecked } from 'rsuv-lib';
import React from 'react';

// [[asau73]]

/*
ПОНЯТИЯ:
-- *t-component, *т-компонент - текущий компонент
 */

export interface PropsAtAsau73 {
  /**
   *
   */
  datas?: RsuvTxChecked[]
  /**
   * *Т-компонент вызывает это при установке/снятии галки, передавая в (1) список текущих чекнутых элементов
   * (т.е. в состоянии после установки/снятия галки)
   * @param data (1) --
   */
  cbOnChange?: (checkedList: RsuvTxChecked[]) => void
  /**
   *
   */
  text?: string
}

export default function BrMultiselect({datas = [], cbOnChange, text = 'selected'}: PropsAtAsau73) {

  const [$selectCount] = useState(() => {
    return datas.filter(el => el.checked)?.length || 0
  });
  const [$dropdownShow, $dropdownShowSet] = useState(false);

  function btnHandle() {
    $dropdownShowSet(!$dropdownShow)
  }

  function btnClearHandle(ev: any) {
    ev.stopPropagation()
    cbOnChange?.([])
  }

  const checkboxChange = (elem: RsuvTxChecked) => (ev: any) => {
    const checked = ev?.target?.checked
    if (cbOnChange) {
      if (checked) {
        const rr = datas.find(el => el.id === elem.id)
        if (rr) {
          rr.checked = true
        }
        cbOnChange(datas.filter(el => el.checked))
      } else {
        cbOnChange(datas.filter(el => el.id !== elem.id && el.checked))
      }
    }
  };

  function dropdownCanvasHandle(ev: any) {
    ev.stopPropagation()
    $dropdownShowSet(false)
  }

  return (<div className="br-mselect">
    <button onClick={btnHandle}>{text} <span
      className={classNames("br-mselect__text0", {'br-mselect__text0_highlight': $selectCount > 0})}>{$selectCount}</span>
    </button>
    <button className="br-mselect__btn-clear" onClick={btnClearHandle}>
      <style>{`.cls1:hover { stroke: red; fill: red; }`}</style>
      <svg className="cls1" width="20px" height="20px" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <path d="M37.304 11.282l1.414 1.414-26.022 26.02-1.414-1.413z"/>
        <path d="M12.696 11.282l26.022 26.02-1.414 1.415-26.022-26.02z"/>
      </svg>
    </button>
    {$dropdownShow && <div className="br-mselect__dropdown-canvas" onClick={dropdownCanvasHandle}></div>}
    <div className={classNames('br-mselect__dropdown', {'br-mselect__dropdown_showed': $dropdownShow})}>
      {
        datas.map(el => {
          return (
            <div className="br-mselect__elem" key={el.id}>
              <input
                type="checkbox"
                checked={el.checked}
                disabled={el.disabled}
                onChange={checkboxChange(el)}
              /> <span
              className={classNames('br-mselect__text', {'br-mselect__text_disabled': el.disabled})}>{el.visibleText}</span>
            </div>
          )
        })
      }
    </div>
  </div>)
}
