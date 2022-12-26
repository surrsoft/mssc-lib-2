import { IdType } from "../../types";

/**
 * MAIN: {@link FnFindType}
 * MAIN: {@link FnFindMultiType}
 */

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
