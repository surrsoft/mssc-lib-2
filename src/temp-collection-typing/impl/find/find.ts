import { FnFindType, FnFindTypeB } from '../../declare/declare-find';
import { ImplFindErrorEnum } from "./enums";

export const find: FnFindTypeB<ImplFindErrorEnum> = (collection, id) => {
  if (id.length < 1) {
    return { _tag: "find_error", code: ImplFindErrorEnum.ID_WRONG, desc: "" };
  }

  const index = collection.findIndex((el) => el.id === id);
  if (index !== -1) {
    return { _tag: "finded", elemIndex: index, elem: collection[index] };
  }

  return { _tag: "no_finded" };
};

