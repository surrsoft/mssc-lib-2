import { MsscTagsGroupIdType } from './MsscTagsGroupIdType';

export type MsscFieldNameType = string;

/**
 * тип описывающий *т-группу (*группу-тегов)
 *
 * см. {@link umsscTAGGROUPu}
 */
export interface MsscTagGroupType {
  /** идентификатор *группы-тегов */
  id: MsscTagsGroupIdType
  /** имя поля в {@link umsscSOURCEu источнике} с которым эта *группа-тегов ассоциирована.
   * Передаётся *компонентом {@link umsscCOMPONENTu} в метод {@link MsscSourceType#tags} */
  fieldName: MsscFieldNameType
  /** имя *группы-тегов для отображения в UI */
  visibleName: string
}
