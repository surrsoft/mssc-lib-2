import { MsscTagsGroupIdType } from './MsscTagsGroupIdType';

/**
 * тип описывающий *т-группу (*группу-тегов)
 *
 * см. {@link umsscTAGGROUPu}
 */
export interface MsscTagGroupType {
  /** идентификатор *группы-тегов */
  id: MsscTagsGroupIdType
  /** имя поля в {@link umsscSOURCEu источнике} с которым эта *группа-тегов ассоциирована */
  fieldName: string
  /** имя *группы-тегов для отображения в UI */
  visibleName: string
}
