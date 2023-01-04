import { T5TIdType } from "../../types";

export enum TG3TDisEnum {
  TG3T_DIS_FINDED = 'TG3T_DIS_FINDED',
  TG3T_DIS_NO_FINDED = 'TG3T_DIS_NO_FINDED',
  TG3T_DIS_FIND_ERROR = 'TG3T_DIS_FIND_ERROR'
}

export type TG3TResultType<T extends T5TIdType, C> =
  | TG3TSuccessType<T>
  | TG3TNoType
  | TG3TErrorType<C>;

export interface TG3TSuccessType<T extends T5TIdType> {
  _tag: TG3TDisEnum.TG3T_DIS_FINDED;
  elemIndex: number;
  elem: T;
}

export interface TG3TNoType {
  _tag: TG3TDisEnum.TG3T_DIS_NO_FINDED;
}

export interface TG3TErrorType<C> {
  _tag: TG3TDisEnum.TG3T_DIS_FIND_ERROR;
  code: C;
  desc?: string;
}
