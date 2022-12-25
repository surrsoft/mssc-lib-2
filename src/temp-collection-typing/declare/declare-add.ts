import { IdType } from "../types";

export type FnAddType<C> = <T extends IdType>(elem: T) => AddResultType<T, C>;

export type AddResultType<T extends IdType, C> =
  | AddSuccessType<T>
  | AddAlreadyExistType
  | AddErrorType<C>;

export interface AddSuccessType<T extends IdType> {
  _tag: "add_success";
  /** идентификатор добавленного(созданного) элемента */
  id: string;
  /** добавленный(созданный) элемент */
  addedElem: T;
}

export interface AddAlreadyExistType {
  _tag: "add_already_exist";
}

export interface AddErrorType<C> {
  _tag: "add_error";
  code: C;
  desc?: string;
}
