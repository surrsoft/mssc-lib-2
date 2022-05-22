import { MsscFilter } from '../../msscUtils/MsscFilter';
import { MsscCommonSourceParams } from '../../msscUtils/MsscCommonSourceParams';

export class AirSourceParams<T> extends MsscCommonSourceParams<T> {
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
}
