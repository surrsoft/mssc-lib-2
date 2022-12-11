import { BrSelectSortDataType } from '../../commonUI/BrSelect/types';
import { MsscListAreaHeightCls } from '../../msscUtils/MsscListAreaHeightCls';
import { MsscSourceType } from '../MsscSourceType';
import { MsscColumnNameType } from './MsscColumnNameType';
import { MsscListElemStructType } from './MsscListElemStructType';
import { MsscMultFieldsType } from './MsscMultFieldsType';

/** Пропсы для MsscListFCC */
export interface MsscListPropsType {
  /**
   *
   */
  source: MsscSourceType<any> | null
  /** SYNC [[221204124107]] */
  sortData?: BrSelectSortDataType<MsscColumnNameType>
  /**
   * *клиент определяет как должны распологаться элементы отдельного элемента списка
   * @param checkboxJsx
   * @param bodyJsx
   * @param menuJsx
   */
  listElemStruct?: MsscListElemStructType
  children?: any
  /**
   * [[220607221651]] Описание полей содержащих теги. Сколько здесь будет элементов, столько будет показываться
   * выпадающих списков
   */
  tagsFieldNameArr?: MsscMultFieldsType[]
  /**
   * Высота области прокрутки списка
   */
  listAreaHeight?: MsscListAreaHeightCls
}
