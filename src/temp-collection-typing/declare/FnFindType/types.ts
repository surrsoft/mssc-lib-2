import { IdType } from "../../types";

export enum FindResultEnum {
  FINDED = 'finded',
  NO_FINDED = 'no_finded',
  FIND_ERROR = 'find_error'
}

/**
 * MAIN: {@link FnFindType}
 * MAIN: {@link FnFindMultiType}
 */

export type FindResultType<T extends IdType, C> =
  | FindSuccessType<T>
  | FindNoType
  | FindErrorType<C>;

export interface FindSuccessType<T extends IdType> {
  _tag: FindResultEnum.FINDED;
  elemIndex: number;
  elem: T;
}

export interface FindNoType {
  _tag: FindResultEnum.NO_FINDED;
}

export interface FindErrorType<C> {
  _tag: FindResultEnum.FIND_ERROR;
  code: C;
  desc?: string;
}
