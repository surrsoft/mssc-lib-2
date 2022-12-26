import { randomUUID } from 'crypto';

import { AddResultEnum, AddResultType, FnAddType } from '../declare/declare-add';
import { FindResultType, FnFindMultiType, FnFindType } from "../declare/declare-find";
import { IdType } from "../types";
import { ImplFindErrorEnum } from "./find/enums";

export interface CollectionType<T extends IdType, C, AC> {
  find: FnFindType<T, C>;
  findMulti: FnFindMultiType<T, C>
  add: FnAddType<T, AC>
}

export class Collection<T extends IdType>
  implements CollectionType<T, ImplFindErrorEnum, string> {
  _elems: T[] = [];

  constructor(elems: T[]) {
    this._elems = elems;
  }

  find(id: string): FindResultType<T, ImplFindErrorEnum> {
    if (id.length < 1) {
      return { _tag: "find_error", code: ImplFindErrorEnum.ID_WRONG, desc: "" };
    }
    const index = this._elems.findIndex((el) => el.id === id);
    if (index !== -1) {
      return { _tag: "finded", elemIndex: index, elem: this._elems[index] };
    }
    return { _tag: "no_finded" };
  }

  findMulti(ids: string[]): Array<FindResultType<T, ImplFindErrorEnum>> {
    return ids.reduce<Array<FindResultType<T, ImplFindErrorEnum>>>((acc, id) => {
      try {
        const findResult: any = this.find(id);
        acc.push(findResult);
      } catch (err: any) {
        acc.push({ _tag: "find_error", code: ImplFindErrorEnum.OTHER, desc: err?.message ?? "", });
      }
      return acc;
    }, []);
  }

  add(elem: T): AddResultType<T, string> {
    const findResult = this.find(elem.id)
    if (findResult._tag === 'finded') {
      return { _tag: AddResultEnum.ALREADY_EXIST };
    }
    if (findResult._tag === 'no_finded') {
      const uuid = randomUUID();
      elem.id = uuid;
      this._elems.push(elem);
      return { _tag: AddResultEnum.SUCCESS, id: uuid, addedElem: elem }
    }
    return { _tag: AddResultEnum.ERROR, code: '' }
  }
}
