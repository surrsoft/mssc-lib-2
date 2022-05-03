import { MsscTagsID } from './MsscTagsID';
import { RsuvTxChecked } from 'rsuv-lib';

/**
 * Представляет *группу-тегов всех
 */
export type MsscTagGroup = {
  id: MsscTagsID
  /**
   * сами теги
   */
  elems: RsuvTxChecked[]
  /**
   *
   */
  visibleName: string
}
