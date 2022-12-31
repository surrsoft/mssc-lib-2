import { IdType } from "../../types";

export enum AddResultEnum {
  SUCCESS = "success",
  ALREADY_EXIST = "already_exist",
  ERROR = "error",
}

/**
 * discriminated union type
 */
export type AddResultType<T extends IdType, C> =
  | AddSuccessType<T>
  | AddAlreadyExistType
  | AddErrorType<C>;

export interface AddSuccessType<T extends IdType> {
  _tag: AddResultEnum.SUCCESS;
  /** идентификатор добавленного(созданного) элемента */
  id: string;
  /** добавленный(созданный) элемент */
  addedElem: T;
}

export interface AddAlreadyExistType {
  _tag: AddResultEnum.ALREADY_EXIST;
}

export interface AddErrorType<C> {
  _tag: AddResultEnum.ERROR;
  code: C;
  desc?: string;
}
