import { IdType } from "../types";

/**
 * MAIN: {@link FnFindType}
 * MAIN: {@link FnFindMultiType}
 */

/**
 * DESC
 */
export type FnFindType<T extends IdType, C> = (
  id: string
) => FindResultType<T, C>;

export type FnFindTypeB<C> = <T extends IdType>(
  collection: T[],
  id: string
) => FindResultType<T, C>;

/**
 * DESC поиск нескольких элементов
 *
 * Возвращает массив той же длины что и длина {@param ids}
 */
export type FnFindMultiType<C> = <T extends IdType>(
  ids: string[]
) => Array<FindResultType<T, C>>;

export type FindResultType<T extends IdType, C> =
  | FindSuccessType<T>
  | FindNoType
  | FindErrorType<C>;

export interface FindSuccessType<T extends IdType> {
  _tag: "finded";
  elemIndex: number;
  elem: T;
}

export interface FindNoType {
  _tag: "no_finded";
}

export interface FindErrorType<C> {
  _tag: "find_error";
  code: C;
  desc?: string;
}
