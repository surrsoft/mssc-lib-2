import { ListSelectingModelCls } from "../../../commonUtils/ListSelectingModelCls";
import { MsscDialogCreateEditCallbacksType } from "../../../types/types/MsscDialogCreateEditCallbacksType";
import { MsscElemType } from "../../../types/types/MsscElemType";
import { MsscListElemStructType } from "../../../types/types/MsscListElemStructType";
import { MsscRefreshesType } from "../../../types/types/MsscRefreshesType";
import { MsscSourceDialogCreateOrEditType } from "../../../types/types/MsscSourceDialogCreateOrEditType";

export interface MsscListElemPropsBaseType {
  elems: MsscElemType[];
  refreshes: MsscRefreshesType;
  listModel: ListSelectingModelCls;
  dialogCreateOrEdit?: MsscSourceDialogCreateOrEditType<any>;
  dialogDeleteShow: () => void;
  dialogCreateEditCallbacks: MsscDialogCreateEditCallbacksType;
  dialogCreateEditJsxSet: any;
  isDialogCreateEditShowedSet: any;
  listElemStruct?: MsscListElemStructType;
}
