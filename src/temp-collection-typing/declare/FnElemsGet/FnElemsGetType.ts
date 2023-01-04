import { TG1TResultType } from '../../impl/utils/indexesDiapAdapter/types';

export enum TG2TDisEnum {
  TG2T_DIS_SUCCESS = "TG2T_DIS_SUCCESS",
  TG2T_DIS_ERROR = "TG2T_DIS_ERROR",
}

export interface TG2TSuccessType<T> {
  _tag: TG2TDisEnum.TG2T_DIS_SUCCESS;
  elems: T[];
  /** результат работы {@link indexesDiapAdapter} */
  indexAdaptInfo: TG1TResultType;
}

export interface TG2TErrorType<C> {
  _tag: TG2TDisEnum.TG2T_DIS_ERROR
  code: C,
  desc?: string
  /** результат работы {@link indexesDiapAdapter} */
  indexAdaptInfo: TG1TResultType;
}

export type TG2TResultType<T, C> = TG2TSuccessType<T> | TG2TErrorType<C>;

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
) => Promise<TG2TResultType<T, C>>;
