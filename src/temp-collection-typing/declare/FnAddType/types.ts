import { T5TIdType } from "../../types";

export enum TG4TDisEnum {
  TG4T_DIS_SUCCESS = "TG4T_DIS_SUCCESS",
  TG4T_DIS_ALREADY_EXIST = "TG4T_DIS_ALREADY_EXIST",
  TG4T_DIS_ERROR = "TG4T_DIS_ERROR",
}

/**
 * discriminated union type
 */
export type TG4TResultType<T extends T5TIdType, C> =
  | TG4TSuccessType<T>
  | TG4TAlreadyExistType
  | TG4TErrorType<C>;

export interface TG4TSuccessType<T extends T5TIdType> {
  _tag: TG4TDisEnum.TG4T_DIS_SUCCESS;
  /** идентификатор добавленного(созданного) элемента */
  id: string;
  /** добавленный(созданный) элемент */
  addedElem: T;
}

export interface TG4TAlreadyExistType {
  _tag: TG4TDisEnum.TG4T_DIS_ALREADY_EXIST;
}

export interface TG4TErrorType<C> {
  _tag: TG4TDisEnum.TG4T_DIS_ERROR;
  code: C;
  desc?: string;
}
