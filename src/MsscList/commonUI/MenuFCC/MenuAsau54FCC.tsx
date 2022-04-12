import SvgIconMenu from '../../commonIcons/SvgIconMenu/SvgIconMenu';
import React, { useEffect, useRef, useState } from 'react';
import './stylesMenuAsau54.css';

// ID [[asau54]]
// ИСПОЛЬЗОВАННЫЕ ТЕХНИКИ: [asau58]


export class DataAtAsau54 {
  id: string = ''
  items: ItemAtAsau54[] = []
}

/**
 * идентификатор действия которое пункт меню представляет
 */
export type IdActionAtAsau54PMT = string
/**
 * текст для отображения на пункте меню
 */
export type ActionTextAtAsau54PMT = string

/**
 * представляет элемент меню
 */
export class ItemAtAsau54 {
  idAction: IdActionAtAsau54PMT = ''
  text: ActionTextAtAsau54PMT = ''
}

export class SelectResultAtAsau54 {
  idAction?: IdActionAtAsau54PMT
  idElem?: string
}

export class PropsAtAsau54 {
  /**
   * Данные описывающие пункты меню
   */
  data?: DataAtAsau54
  /**
   * Вызывается когда сделан выбор пункта
   * @param el (1) -- выбранный пункт
   */
  cbOnSelected?: (el: SelectResultAtAsau54) => void
}

function MenuAsau54FCC({data, cbOnSelected}: PropsAtAsau54) {
  const [$isListShowed, $isListShowedSet] = useState(false);
  const refBtnDropdown = useRef(null)

  // обработчик нажатия на кнопку меню
  const onClickHandler = () => {
    $isListShowedSet((prev) => {
      return !prev
    })
  };

  const btnOnClick = (idAction: IdActionAtAsau54PMT, idElem: string) => (ev: any) => {
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

export default MenuAsau54FCC;
