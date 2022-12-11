import { RsuvTxChecked } from "rsuv-lib";

import { MsscTagsGroupIdType } from "./MsscTagsGroupIdType";

/**
 * Представляет *группу-тегов выбранных
 */
export interface MsscTagGroupSelectedType {
  id: MsscTagsGroupIdType;
  /**
   * сами теги
   */
  elems: RsuvTxChecked[];
}
