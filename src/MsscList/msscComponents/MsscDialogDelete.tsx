import React from 'react';

import { ListSelectingElemIdType, ListSelectingModelCls } from '../commonUtils/ListSelectingModelCls';
import { MsscRefreshesType } from '../types/types/MsscRefreshesType';
import { VanxIdObjectType } from '../vanx/types/VanxIdObjectType';
import { VanxSourceElemsDeleteType } from '../vanx/types/VanxSourceElemsDeleteType';
import MsscDialog from './MsscDialog/MsscDialog';

export interface PropsType {
  listModel: ListSelectingModelCls
  isDialogDeleteShowedSet: any
  loadingDialogSet: any
  elemsDelete?: VanxSourceElemsDeleteType
  fnError: () => void
  refreshes: MsscRefreshesType
  scrollFixFn: (isFix: boolean) => void
  isDialogDeleteShowed: boolean
  dialogTitle: string
  dialogBody: string
}

export function MsscDialogDelete({
                                       listModel,
                                       isDialogDeleteShowedSet,
                                       loadingDialogSet,
                                       elemsDelete,
                                       fnError,
                                       refreshes,
                                       scrollFixFn,
                                       isDialogDeleteShowed,
                                       dialogTitle,
                                       dialogBody,
                                     }: PropsType) {
  /**
   * [[220128215639]]
   */
  const dialogDeleteHandlers = {
    cancel: () => {
      listModel.selectElemsClear()
      isDialogDeleteShowedSet(false)
    },
    ok: async () => {
      if (listModel.selectElemsCount() > 0) {
        const ids: VanxIdObjectType[] = listModel.selectElems().map((el: ListSelectingElemIdType) => ({id: el}))
        try {
          loadingDialogSet(true)
          const noDeletedElems = await elemsDelete?.(ids)
          if (noDeletedElems) {
            if (noDeletedElems.length === 0) {
              listModel.selectElemsClear()
              scrollFixFn(false)
              isDialogDeleteShowedSet(false)
              refreshes.whole()
            } else {
              console.warn(`[${noDeletedElems.length}] elems not deleted`)
              fnError()
            }
          }
        } catch (err) {
          console.log('!!-!!-!! err {220128215806}\n', err)
        } finally {
          loadingDialogSet(false)
        }
      }
    }
  }

  return (
    <MsscDialog
      show={isDialogDeleteShowed}
      title={dialogTitle}
      body={dialogBody}
      cbCancel={dialogDeleteHandlers.cancel}
      cbOk={dialogDeleteHandlers.ok}
    />
  )
}
