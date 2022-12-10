import { EnAirField } from "./EnAirField";
import { MsscMultFieldsType } from "../../../MsscList/types/types/MsscMultFieldsType";

export const airTagsFieldNameArr: MsscMultFieldsType[] = [
  {
    id: EnAirField.TAGS,
    fieldName: EnAirField.TAGS,
    visibleName: "теги",
  },
  {
    id: EnAirField.TAGS2,
    fieldName: EnAirField.TAGS2,
    visibleName: "теги-2",
  },
];
