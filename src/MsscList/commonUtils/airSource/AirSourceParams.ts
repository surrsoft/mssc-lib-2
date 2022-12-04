import { MsscFilterType } from '../../types/types/MsscFilterType';
import { MsscCommonSourceParamsType } from '../../types/types/MsscCommonSourceParamsType';

export class AirSourceParams<T> extends MsscCommonSourceParamsType<T> {
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
