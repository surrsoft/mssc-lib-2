import SvgIconMenu from '../../commonIcons/SvgIcons/SvgIconMenu';
import React, { useEffect, useRef, useState } from 'react';
import './stylesMenuPoar.css';
import { IdActionPoarType } from './types/types';
import { PropsAtPoarType } from './types/PropsAtPoarType';

// ID [[asau54]] [[poar]]
// ИСПОЛЬЗОВАННЫЕ ТЕХНИКИ: [asau58]


/**
 * Реализация списка пунктов меню
 * @param data
 * @param cbOnSelected
 * @constructor
 */
function MenuPoar({data, cbOnSelected}: PropsAtPoarType) {
  const [$isListShowed, $isListShowedSet] = useState(false);
  const refBtnDropdown = useRef(null)

  // обработчик нажатия на кнопку меню
  const onClickHandler = () => {
    $isListShowedSet((prev) => {
      return !prev
    })
  };

  const btnOnClick = (idAction: IdActionPoarType, idElem: string) => (ev: any) => {
    ev.stopPropagation()
    $isListShowedSet(false)
    if (cbOnSelected) {
      cbOnSelected({idAction, idElem})
    }
  };

  // срабатывает при любом клике гдебы то нибыло
  const eventClickHandle = (ev: any) => {
    const ix = ev.path.findIndex((el: any) => {
      return el === refBtnDropdown.current;
    })
    if (ix === -1) {
      // ^ если нажатие вне кнопки меню (т.е. в цепочке прохождения события нажатия не нашлось текущего экземпляра
      // кнопки меню)
      $isListShowedSet(false)
    }
  };

  useEffect(() => {
    document.removeEventListener('click', eventClickHandle)
    document.addEventListener('click', eventClickHandle)
    return () => {
      document.removeEventListener('click', eventClickHandle)
    }
  }, []);

  return (
    <div className="asau54-dropdown">
      <button
        ref={refBtnDropdown}
        onClick={onClickHandler}
        className="asau54-dropdown__btn"
      >
        <SvgIconMenu width="24px" height="24px"/>
      </button>
      {!$isListShowed ? null : <div className="asau54-dropdown__content">
        {data?.items.map((el) => {
          return (
            <button
              className="asau54-dropdown__elbutton"
              key={el.idAction}
              onClick={btnOnClick(el.idAction, data.id)}
            >
              {el.text}
            </button>
          )
        })}
      </div>}
    </div>
  )
}

export default MenuPoar;
