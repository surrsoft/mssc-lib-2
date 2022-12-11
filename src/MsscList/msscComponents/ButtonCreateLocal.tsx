import React from "react";

import { SvgIconPlus } from "../commonIcons/SvgIcons/SvgIconPlus";
import { MSSC_SETTINGS } from "../MsscListFCC";
import { MsscDialogCreateEditCallbacksType } from "../types/types/MsscDialogCreateEditCallbacksType";
import { MsscSourceDialogCreateOrEditType } from "../types/types/MsscSourceDialogCreateOrEditType";

interface PropsType<T> {
  dialogCreateEditCallbacks: MsscDialogCreateEditCallbacksType;
  $dialogCreateEditJsxSet: any;
  $isDialogCreateEditShowedSet: any;
  sourceDialogCreateOrEdit?: MsscSourceDialogCreateOrEditType<T>;
}

export function ButtonCreateLocal<T>({
  sourceDialogCreateOrEdit,
  dialogCreateEditCallbacks,
  $dialogCreateEditJsxSet,
  $isDialogCreateEditShowedSet,
}: PropsType<T>) {
  const createHandler = async () => {
    const jsxCreate = await sourceDialogCreateOrEdit?.(
      dialogCreateEditCallbacks.ok,
      dialogCreateEditCallbacks.cancel
    );
    $dialogCreateEditJsxSet(jsxCreate ?? null);
    if (jsxCreate) {
      $isDialogCreateEditShowedSet(true);
    }
  };
  return (
    <button title="создать новый элемент" onClick={createHandler}>
      <SvgIconPlus {...MSSC_SETTINGS.iconsConf} />
    </button>
  );
}
