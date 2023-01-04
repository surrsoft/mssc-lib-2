import { T5TIdType } from "../../types";

export enum TG7TDisEnum {
  TG7T_DIS_SUCCESS = "TG7T_DIS_SUCCESS",
  TG7T_DIS_ERROR = "TG7T_DIS_ERROR",
}

export interface TG7TSuccessType<T> {
  _tag: TG7TDisEnum.TG7T_DIS_SUCCESS;
  count: number;
}

export interface TG7TErrorType<C> {
  _tag: TG7TDisEnum.TG7T_DIS_ERROR;
  code: C;
  desc?: string;
}

export type TG7TResultType<T, C> =
  | TG7TSuccessType<T>
  | TG7TErrorType<C>;

/**
 * SHORT DESC получение длины коллекции
 *
 * Должен вернуть длину коллекции.
 * Если длину удалось успешно определить, должен вернуть {@link TG7TSuccessType}.
 * Если ошибка, то должен вернуть тип {@link TG7TErrorType}.
 *
 * @param elem (1)
 */
export type FnLengthGetType<T extends T5TIdType, C> = (
  elem: T
) => Promise<TG7TResultType<T, C>>;
