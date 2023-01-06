import { RsuvTxChecked } from "rsuv-lib";

import { MsscTagsGroupIdType } from "./MsscTagsGroupIdType";

/**
 * Представляет информацию об элементах {@link umsscTAGGROUPu т-группы}
 */
export interface MsscTagGroupElemsType {
  /** идентификатор *группы-тегов */
  id: MsscTagsGroupIdType;
  /**
   * сами теги
   */
  elems: RsuvTxChecked[];
}
