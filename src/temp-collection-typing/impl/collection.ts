import {
  FindResultType,
  FnFindMultiType,
  FnFindType,
} from "../declare/declare-find";
import { IdType } from "../types";
import { ImplFindErrorEnum } from "./find/enums";

export interface Type2110 {
  find: FnFindType<ImplFindErrorEnum>;
  findMulti: FnFindMultiType<ImplFindErrorEnum>;
}

type Type2241 = IdType & { some: string };

export class Collection<T1 extends IdType> implements Type2110 {
  _elems: T1[] = [];

  constructor(elems: T1[]) {
    this._elems = elems;
  }

  find<T extends IdType>(id: string): FindResultType<T, ImplFindErrorEnum> {
    if (id.length < 1) {
      return { _tag: "find_error", code: ImplFindErrorEnum.ID_WRONG, desc: "" };
    }

    const index = this._elems.findIndex((el) => el.id === id);
    if (index !== -1) {
      return {
        _tag: "finded",
        elemIndex: index,
        elem: this._elems[index] as unknown as T,
      };
    }

    return { _tag: "no_finded" };
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
}
