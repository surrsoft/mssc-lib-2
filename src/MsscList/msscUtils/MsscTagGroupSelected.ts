import { MsscTagsGroupID } from './MsscTagsGroupID';
import { RsuvTxChecked } from 'rsuv-lib';

/**
 * Представляет *группу-тегов выбранных
 */
export type MsscTagGroupSelected = {
  id: MsscTagsGroupID
  /**
   * сами теги
   */
  elems: RsuvTxChecked[]
}
