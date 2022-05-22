/**
 * URL-адрес *эндпоинта
 * Например: http://localhost:22121/
 */
import { MsscCommonSourceParams } from '../../msscUtils/MsscCommonSourceParams';

type Asau88EndpointUrl = string;
/**
 * Имя поля *э-сущности в котором располагается *д-массив. Например 'data'
 */
type Asau88FieldPath = string;

export class Asau88JsonSourceParams<T> extends MsscCommonSourceParams<T> {
  endpointUrl: Asau88EndpointUrl = '';
  fieldPath: Asau88FieldPath = '';
}
