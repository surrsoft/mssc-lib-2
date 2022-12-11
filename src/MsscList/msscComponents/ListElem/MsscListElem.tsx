import classNames from 'classnames';
import React from 'react';

import { SelectResultPoarType } from '../../commonUI/MenuPoar/types/SelectResultPoarType';
import { ListSelectingModelCls } from '../../commonUtils/ListSelectingModelCls';
import { menuDataSTA } from '../../msscUtils/menuDataSTA';
import { MsscMenuActionEnum } from '../../types/enums/MsscMenuActionEnum';
import { MsscElemType } from '../../types/types/MsscElemType';
import { MsscListElemStructType } from '../../types/types/MsscListElemStructType';
import { MsscRefreshesType } from '../../types/types/MsscRefreshesType';
import { MsscSourceDialogCreateOrEditType } from '../../types/types/MsscSourceDialogCreateOrEditType';
import { RkBody } from './components/RkBody';
import { RkCheckbox } from './components/RkCheckbox';
import { RkMenu } from './components/RkMenu';

export interface PropsType {
  elem: MsscElemType
  elems: MsscElemType[]
  refreshes: MsscRefreshesType
  listModel: ListSelectingModelCls
  dialogCreateOrEdit?: MsscSourceDialogCreateOrEditType<any>
  dialogDeleteShow: () => void
  dialogCreateEditCallbacks: any
  dialogCreateEditJsxSet: any
  isDialogCreateEditShowedSet: any
  listElemStruct?: MsscListElemStructType
}

export function MsscListElem({
                                   elem,
                                   refreshes,
                                   listModel,
                                   dialogDeleteShow,
                                   elems,
                                   dialogCreateOrEdit,
                                   dialogCreateEditCallbacks,
                                   dialogCreateEditJsxSet,
                                   isDialogCreateEditShowedSet,
                                   listElemStruct
                                 }: PropsType) {
  const jsxElem: JSX.Element = elem.elem

  /**
   * [[220129111758]]
   * @param obj
   */
  const menuElemOnSelected = async (obj: SelectResultPoarType) => {
    switch (obj.idAction) {
      case MsscMenuActionEnum.DELETE:
        if (obj.idElem) {
          // чистим если что-то уже выбрано
          listModel.selectElemsClear()
          listModel.selectElemsAdd([obj.idElem])
          listModel.activeIdSet(obj.idElem)
          refreshes.refreshPage()
        }
        dialogDeleteShow()
        break;
      case MsscMenuActionEnum.SELECT:
        if (obj.idElem) {
          listModel.selectElemsAdd([obj.idElem])
          listModel.activeIdSet(obj.idElem)
          refreshes.refreshPage()
        }
        break;
      case MsscMenuActionEnum.EDIT:
        if (obj.idElem) {
          const elem = elems.find((el: MsscElemType) => el.id.val === obj.idElem)
          if (elem) {
            listModel.activeIdSet(elem.id.val)
            const jsxEdit = await dialogCreateOrEdit?.(dialogCreateEditCallbacks.ok, dialogCreateEditCallbacks.cancel, elem.elemModel)
            dialogCreateEditJsxSet(jsxEdit ?? null)
            if (jsxEdit) {
              isDialogCreateEditShowedSet(true)
            }
          }
        }
        break;
    }
  }

  /**
   * [[220129135526]]
   * @param id
   */
  const checkboxOnChange = (id: string) => (ev: any) => {
    const checked = ev.target.checked
    if (checked) {
      listModel.selectElemsAdd([id])
      listModel.activeIdSet(id)
    } else {
      listModel.selectElemsDelete([id])
      listModel.activeIdSet(id)
    }
    refreshes.refreshPage()
  }

  const containerCn = classNames('mssc-list-elem', {'mssc-list-elem_active': listModel.activeIdIs(elem.id.val)})

  const CheckboxJsx = <RkCheckbox
    onCheckboxChange={checkboxOnChange(elem.id.val)}
    isChecked={listModel.selectElemIs(elem.id.val)}
  />

  const BodyJsx = <RkBody jsxElem={jsxElem}/>

  const MenuJsx = <RkMenu
    data={Object.assign({}, menuDataSTA, {id: elem.id.val})}
    menuElemOnSelected={menuElemOnSelected}
  />

  return listElemStruct
    ? (<div className={containerCn}>
      {listElemStruct({
        isActive: listModel.activeIdIs(elem.id.val),
        checkboxJsx: CheckboxJsx,
        bodyJsx: BodyJsx,
        menuJsx: MenuJsx
      })}
    </div>)
    : (
      <div className={containerCn}>
        CheckboxJsx
        BodyJsx
        MenuJsx
      </div>
    )
}
