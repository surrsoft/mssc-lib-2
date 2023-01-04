import { T5TIdType } from "../../types";

export enum TG6TDisEnum {
  TG6T_DIS_SUCCESS = "TG6T_DIS_SUCCESS",
  TG6T_DIS_NO_FIND = "TG6T_DIS_NO_FIND",
  TG6T_DIS_ERROR = "TG6T_DIS_ERROR",
}

export interface TG6TSuccessType<T> {
  _tag: TG6TDisEnum.TG6T_DIS_SUCCESS;
  elem: T;
}

export interface TG6TNoFindType {
  _tag: TG6TDisEnum.TG6T_DIS_NO_FIND;
}

export interface TG6TErrorType<C> {
  _tag: TG6TDisEnum.TG6T_DIS_ERROR;
  code: C;
  desc?: string;
}

export type TG6TResultType<T, C> =
  | TG6TSuccessType<T>
  | TG6TNoFindType
  | TG6TErrorType<C>;

/**
 * SHORT DESC выполнение "обновления" элемента коллекции
 *
 * Должен найти существующий элемент коллекции (по id из (1)) и "обновить" его.
 *
 * Правила обновления:
 * 1) обновится должны те поля которые есть в (1)
 * 2) если в (1) есть поля которых нет в "таблице коллекции", то ничего не делать для этих полей
 * 3) если поле в (1) пустое, то нужно очистить поле элемента коллекции
 *
 * Если замена прошла успешно, должен вернуть тип {@link TG6TSuccessType}.
 * Если найти не удалось, то должен вернуть тип {@link TG6TNoFindType}.
 * Если другая ошибка, то долже вернуть тип {@link TG6TErrorType}.
 *
 * @param elem (1)
 */
export type FnUpdateType<T extends T5TIdType, C> = (
  elem: T
) => Promise<TG6TResultType<T, C>>;
