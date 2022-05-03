import { MsscTagsID } from './MsscTagsID';
import { RsuvTxChecked } from 'rsuv-lib';

/**
 * Представляет *группу-тегов выбранных
 */
export type MsscTagGroupSelected = {
  id: MsscTagsID
  /**
   * сами теги
   */
  elems: RsuvTxChecked[]
}
