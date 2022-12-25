import { FindResultType, FindSuccessType, FnFindType } from "../declare/declare-find";
import { IdType } from "../types";
import { ImplFindErrorEnum } from "./find/enums";

export interface Type2110 {
  find: FnFindType<ImplFindErrorEnum>;
}

export class Collection<T extends IdType>
  implements Type2110
{
  _elems: T[] = [];

  constructor(elems: T[]) {
    this._elems = elems;
  }

  find<T2 extends IdType>(id: string): FindResultType<T2, ImplFindErrorEnum> {
    if (id.length < 1) {
      return { _tag: "find_error", code: ImplFindErrorEnum.ID_WRONG, desc: "" };
    }

    const index = this._elems.findIndex((el) => el.id === id);
    if (index !== -1) {
      return {
        _tag: "finded",
        elemIndex: index,
        elem: (this._elems[index] as unknown) as T2,
      };
    }

    return { _tag: "no_finded" };
  }

}
