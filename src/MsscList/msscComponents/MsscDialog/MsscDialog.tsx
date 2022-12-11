import React from 'react';
import './msscDialogStyles.scss';
import { useScrollFix } from 'ueur-lib';

export class MsscDialogProps {
  show: boolean = false
  title?: string = ''
  body?: string = ''
  /**
   * вызов при отмене
   */
  cbCancel?: () => void
  /**
   * вызов при ОК
   */
  cbOk?: () => void
}

export default function MsscDialog({show, title, body, cbOk, cbCancel}: MsscDialogProps) {

  const scrollFixFn = useScrollFix(show)

  function cancelHandle() {
    cbCancel?.()
    scrollFixFn(false)
  }

  function okHandle() {
    cbOk?.()
  }

  return (
    (!show ? null : <div className="MsscDialogContainer">
      <div className="MsscDialogBlock">
        {!title ? null : <div className="MsscDialogTitle">{title}</div>}
        {!body ? null : <div className="MsscDialogBody">{body}</div>}
        <div className="MsscDialogButtonsBlock">
          <button className="MsscDialogButton" onClick={cancelHandle}>Отмена</button>
          <button className="MsscDialogButton" onClick={okHandle}>ОК</button>
        </div>
      </div>
    </div>)
  )
}
