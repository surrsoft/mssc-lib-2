import { BrSelectSortDataType } from '../../commonUI/BrSelect/types';
import { MsscListAreaHeightCls } from '../../msscUtils/MsscListAreaHeightCls';
import { MsscSourceType } from '../MsscSourceType';
import { MsscColumnNameType } from './MsscColumnNameType';
import { MsscListElemStructType } from './MsscListElemStructType';
import { MsscTagGroupType } from './MsscTagGroupType';

/** Пропсы для MsscListFCC */
export interface MsscListPropsType {
  /**
   * источник данных (см. {@link umsscSOURCEu источник} )
   */
  source: MsscSourceType<any> | null
  /** SYNC [[221204124107]] */
  sortData?: BrSelectSortDataType<MsscColumnNameType>
  /**
   * {@link umsscCLIENTu клиент} здесь определяет как должны распологаться элементы отдельного элемента списка.
   * Если is falsy то используется структура по умолчанию.
   */
  listElemStruct?: MsscListElemStructType
  children?: any
  /**
   * *т-группы
   *
   * см. {@link umsscTAGGROUPu}
   *
   * Сколько здесь будет элементов, столько будет показываться выпадающих списков
   */
  tagsFieldNameArr?: MsscTagGroupType[]
  /**
   * Высота области прокрутки списка
   */
  listAreaHeight?: MsscListAreaHeightCls
}
