import { MsscSource } from './MsscSource';
import { BrSelectSortData } from '../commonUI/BrSelect/brSelectUtils';
import { MsscElemStruct } from './MsscElemStruct';
import { MsscMultFields } from './MsscMultFields';
import { MsscColumnName } from './MsscColumnName';
import { MsscListAreaHeight } from './MsscListAreaHeight';

/** Пропсы для MsscListFCC */
export interface MsscListProps {
  /**
   *
   */
  source: MsscSource<any> | null
  sortData?: BrSelectSortData<MsscColumnName>
  /**
   * *клиент определяет как должны распологаться элементы отдельного элемента списка
   * @param checkboxJsx
   * @param bodyJsx
   * @param menuJsx
   */
  listElemStruct?: ({
                      checkboxJsx,
                      bodyJsx,
                      menuJsx
                    }: MsscElemStruct) => JSX.Element
  children?: any
  /**
   * [[220607221651]] Описание полей содержащих теги. Сколько здесь будет элементов, столько будет показываться
   * выпадающих списков
   */
  tagsFieldNameArr?: MsscMultFields[],
  /**
   * Высота области прокрутки списка
   */
  listAreaHeight?: MsscListAreaHeight
}

