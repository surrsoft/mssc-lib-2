import { FindResultType, FnFindType } from "../declare/declare-find";
import { IdType } from "../types";
import { ImplFindErrorEnum } from "./find/enums";

export interface CollectionType<T extends IdType, C> {
  find: FnFindType<T, C>;
}

export class Collection<T1 extends IdType>
  implements CollectionType<T1, ImplFindErrorEnum>
{
  _elems: T1[] = [];

  constructor(elems: T1[]) {
    this._elems = elems;
  }

  find(id: string): FindResultType<T1, ImplFindErrorEnum> {
    if (id.length < 1) {
      return { _tag: "find_error", code: ImplFindErrorEnum.ID_WRONG, desc: "" };
    }

    const index = this._elems.findIndex((el) => el.id === id);
    if (index !== -1) {
      return {
        _tag: "finded",
        elemIndex: index,
        elem: this._elems[index],
      };
    }

    return { _tag: "no_finded" };
  }
}
