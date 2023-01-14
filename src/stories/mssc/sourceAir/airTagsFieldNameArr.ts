import { MsscTagGroupType } from '../../../MsscList/types/types/MsscTagGroupType';
import { AirtableFieldEnum } from "./AirtableFieldEnum";

/**  */
export const airTagsFieldNameArr: MsscTagGroupType[] = [
  {
    id: AirtableFieldEnum.TAGS,
    fieldName: AirtableFieldEnum.TAGS,
    visibleName: "теги",
  },
  {
    id: AirtableFieldEnum.TAGS2,
    fieldName: AirtableFieldEnum.TAGS2,
    visibleName: "теги-2",
  },
];
