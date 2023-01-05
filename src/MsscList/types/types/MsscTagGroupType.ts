import { MsscTagsGroupIdType } from './MsscTagsGroupIdType';

/** Тип представляющий {@link umsscTAGGROUPu группу-тегов} */
export interface MsscTagGroupType {
  /** идентификатор *группы-тегов */
  id: MsscTagsGroupIdType
  /** имя поля в "источника" с которым эта *группа-тегов ассоциирована */
  fieldName: string
  /** имя *группы-тегов для отображения в UI */
  visibleName: string
}
