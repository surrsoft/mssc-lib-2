import { MsscTagsGroupIdType } from './MsscTagsGroupIdType';
import { RsuvTxChecked } from 'rsuv-lib';

/**
 * Представляет *группу-тегов всех
 */
export interface MsscTagGroupType {
  id: MsscTagsGroupIdType
  /**
   * сами теги
   */
  elems: RsuvTxChecked[]
  /**
   *
   */
  visibleName: string
}
