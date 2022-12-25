import { IdType } from "../types";

/**
 * MAIN: {@link FnFindType}
 */

export type FnFindType<C> = <T extends IdType>(
  id: string
) => FindResultType<T, C>;

export type FnFindTypeB<C> = <T extends IdType>(
  collection: T[],
  id: string
) => FindResultType<T, C>;

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
