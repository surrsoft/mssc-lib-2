import {
  FindResultType,
  FnFindMultiType,
  FnFindType,
} from "../declare/declare-find";
import { IdType } from "../types";
import { ImplFindErrorEnum } from "./find/enums";

type Type2241 = IdType & { some: string };

export interface Type2110<T extends IdType, C> {
  find: FnFindType<T, C>;
  findMulti: FnFindMultiType<C>;
}

export class Collection<T1 extends IdType>
  implements Type2110<T1, ImplFindErrorEnum>
{
  _elems: T1[] = [];

  constructor(elems: T1[]) {
    this._elems = elems;
  }

  findMulti<T3 extends IdType>(
    ids: string[]
  ): Array<FindResultType<T3, ImplFindErrorEnum>> {
    return ids.reduce<Array<FindResultType<T3, ImplFindErrorEnum>>>(
      (acc, id) => {
        try {
          const findResult: any = this.find(id);
          acc.push(findResult);
        } catch (err: any) {
          acc.push({
            _tag: "find_error",
            code: ImplFindErrorEnum.OTHER,
            desc: err?.message ?? "",
          });
        }
        return acc;
      },
      []
    );
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
