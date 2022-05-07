import { MsscFilter } from '../../msscUtils/MsscFilter';

export class AirSourceParams<T> {
  /**
   * Ключ БД Airtable, например `appSoHaX1a5tRLJlv` (не путать с Airtable API key)
   */
  dbKey: string = ''
  /**
   * Имя таблицы
   */
  tableName: string = ''
  /**
   * Имена колонок таблицы
   */
  columns: string[] = []
  /**
   * Должен вернуть JSX.Element для элемента списка.
   * Если не указан - возвращается дефолтный JSX.Element вида <div>```id```</div>
   * @param obj (1) -- модель данных для формирования JSX.Element
   */
  elemJsx?: (obj: object) => JSX.Element
  /**
   * Диалог создания/редактирования элемента. Будет ретранслирован *клиенту. Если initialValues is truthy, то это будет означать работу в режиме редактирования, иначе в режиме создания
   */
  dialogCreateEditJsx?: (cbOk: (model: T) => void, cbCancel: () => void, initialValues?: object) => Promise<JSX.Element>
  /**
   * см. [220129122002]
   * если указан, будет исползован вместо прописанного в текущем классе дефолтного
   */
  dialogMiddleware?: (obj: T) => object | T | null
  /**
   * на базе (1) нужно сформировать MsscFilter
   */
  cbFilterFromSearchText?: (searchText: string) => MsscFilter[] | null
  /**
   * на базе тегов (1) нужно сформировать MsscFilter
   */
  cbFilterFromTags?: (tags: string[], fieldName: string) => MsscFilter[] | null
}
