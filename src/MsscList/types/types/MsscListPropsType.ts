import { MsscSourceType } from '../MsscSourceType';
import { BrSelectSortDataType } from '../../commonUI/BrSelect/types';
import { MsscColumnNameType } from './MsscColumnNameType';
import { MsscElemStructType } from './MsscElemStructType';
import { MsscMultFieldsType } from './MsscMultFieldsType';
import { MsscListAreaHeightCls } from '../../msscUtils/MsscListAreaHeightCls';
import { MsscListElemStructType } from './MsscListElemStructType';

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
  tagsFieldNameArr?: MsscMultFieldsType[],
  /**
   * Высота области прокрутки списка
   */
  listAreaHeight?: MsscListAreaHeightCls
}