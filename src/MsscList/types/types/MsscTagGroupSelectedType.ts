import { RsuvTxChecked } from "rsuv-lib";

import { MsscTagsGroupIdType } from "./MsscTagsGroupIdType";

/**
 * Представляет {@link umsscTAGGROUPu группу-тегов} выбранных
 */
export interface MsscTagGroupSelectedType {
  /** идентификатор *группы-тегов */
  id: MsscTagsGroupIdType;
  /**
   * сами теги
   */
  elems: RsuvTxChecked[];
}
