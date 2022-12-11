import { MsscTagsGroupIdType } from './MsscTagsGroupIdType';
import { RsuvTxChecked } from 'rsuv-lib';

/**
 * Представляет *группу-тегов выбранных
 */
export interface MsscTagGroupSelectedType {
  id: MsscTagsGroupIdType
  /**
   * сами теги
   */
  elems: RsuvTxChecked[]
}
