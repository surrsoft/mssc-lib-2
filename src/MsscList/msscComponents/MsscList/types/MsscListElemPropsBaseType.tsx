import { ListSelectingModelCls } from "../../../commonUtils/ListSelectingModelCls";
import { MsscDialogCreateEditCallbacksType } from "../../../types/types/MsscDialogCreateEditCallbacksType";
import { MsscListElemStructType } from "../../../types/types/MsscListElemStructType";
import { MsscRefreshesType } from "../../../types/types/MsscRefreshesType";
import { VanxElemType } from "../../../vanx/types/VanxElemType";
import { VanxSourceDialogCreateOrEditType } from "../../../vanx/types/VanxSourceDialogCreateOrEditType";

export interface MsscListElemPropsBaseType {
  elems: VanxElemType[];
  refreshes: MsscRefreshesType;
  listModel: ListSelectingModelCls;
  dialogCreateOrEdit?: VanxSourceDialogCreateOrEditType<any>;
  dialogDeleteShow: () => void;
  dialogCreateEditCallbacks: MsscDialogCreateEditCallbacksType;
  dialogCreateEditJsxSet: any;
  isDialogCreateEditShowedSet: any;
  listElemStruct?: MsscListElemStructType;
}
