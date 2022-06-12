import { MsscTagsGroupID } from './MsscTagsGroupID';
import { RsuvTxChecked } from 'rsuv-lib';

/**
 * Представляет *группу-тегов всех
 */
export type MsscTagGroup = {
  id: MsscTagsGroupID
  /**
   * сами теги
   */
  elems: RsuvTxChecked[]
  /**
   *
   */
  visibleName: string
}
