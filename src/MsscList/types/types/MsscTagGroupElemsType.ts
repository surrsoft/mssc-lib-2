import { RsuvTxChecked } from "rsuv-lib";

import { MsscTagsGroupIdType } from "./MsscTagsGroupIdType";

/**
 * Представляет информацию об элементах {@link umsscTAGGROUPu т-группы}.
 *
 * ДЛЯ СПРАВКИ
 * Информация о самой *т-группе представляется типом {@link MsscTagGroupType}
 */
export interface MsscTagGroupElemsType {
  /** идентификатор *группы-тегов */
  id: MsscTagsGroupIdType;
  /**
   * сами теги
   */
  elems: RsuvTxChecked[];
}
