import { MsscTagsGroupIdType } from './MsscTagsGroupIdType';
import { RsuvTxChecked } from 'rsuv-lib';

/**
 * Представляет *группу-тегов выбранных
 */
export type MsscTagGroupSelectedType = {
  id: MsscTagsGroupIdType
  /**
   * сами теги
   */
  elems: RsuvTxChecked[]
}
