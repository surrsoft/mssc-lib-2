import { T5TIdType } from "../../types";

export enum TG5TDisEnum {
  TG5T_DIS_SUCCESS = "TG5T_DIS_SUCCESS",
  TG5T_DIS_NO_FIND = "TG5T_DIS_NO_FIND",
  TG5T_DIS_ERROR = "TG5T_DIS_ERROR",
}

export interface TG5TSuccessType<T> {
  _tag: TG5TDisEnum.TG5T_DIS_SUCCESS;
  elem: T;
}

export interface TG5TNoFindType {
  _tag: TG5TDisEnum.TG5T_DIS_NO_FIND;
}

export interface TG5TErrorType<C> {
  _tag: TG5TDisEnum.TG5T_DIS_ERROR;
  code: C;
  desc?: string;
}

export type TG5TResultType<T, C> =
  | TG5TSuccessType<T>
  | TG5TNoFindType
  | TG5TErrorType<C>;

/**
 * SHORT DESC выполнение полной замены элемента коллекции
 *
 * Должен найти существующий элемент коллекции (по id из (1)) и "заменить" его.
 * Если замена прошла успешно, должен вернуть тип {@link TG5TSuccessType}.
 * Если найти не удалось, то должен вернуть тип {@link TG5TNoFindType}.
 * Если другая ошибка, то долже вернуть тип {@link TG5TErrorType}.
 *
 * @param elem (1)
 */
export type FnSetType<T extends T5TIdType, C> = (
  elem: T
) => Promise<TG5TResultType<T, C>>;
