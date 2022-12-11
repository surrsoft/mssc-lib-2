import { RsuvTxChecked } from "rsuv-lib";

import { MsscTagsGroupIdType } from "./MsscTagsGroupIdType";

/**
 * Представляет *группу-тегов всех
 */
export interface MsscTagGroupType {
  id: MsscTagsGroupIdType;
  /**
   * сами теги
   */
  elems: RsuvTxChecked[];
  /**
   *
   */
  visibleName: string;
}
