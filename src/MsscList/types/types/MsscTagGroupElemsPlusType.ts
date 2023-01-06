
import { MsscTagGroupElemsType } from './MsscTagGroupElemsType';

/**
 * Представляет {@link umsscTAGGROUPu т-группу} с полем для видимого имени
 */
export type MsscTagGroupElemsPlusType = MsscTagGroupElemsType & {
  visibleName: string;
}
