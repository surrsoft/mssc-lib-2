export enum ElemsGetResultEnum {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface ElemsGetSuccessType<T> {
  _tag: ElemsGetResultEnum.SUCCESS;
  elems: T[];
}

export interface ElemsGetErrorType<C> {
  _tag: ElemsGetResultEnum.ERROR
  code: C,
  desc?: string
}

export type ElemsGetResultType<T, C> = ElemsGetSuccessType<T> | ElemsGetErrorType<C>;

/**
 * SHORT DESC возвращает элементы указанного диапазона
 *
 * Должен вернуть содержимое ячеек расположенных между индексами {@param indexStart}*1 и {@param indexEnd}*1.
 *
 * (*1) это индексы полученные после пропуска входных параметров (1)(2) через {@link indexesDiapAdapter}
 * (ID [230103175044] rev.1 1.0.0).
 *
 * @param indexStart (1) начальный индекс диапазона
 * @param indexEnd (2) конечный индекс диапазона
 */
export type FnElemsGetType<T, C> = (
  indexStart: number,
  indexEnd: number
) => Promise<ElemsGetResultType<T, C>>;
