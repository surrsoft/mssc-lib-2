import { randomUUID } from "crypto";

import { FnAddMultiType } from "../declare/FnAddMultiType/FnAddMultiType";
import { FnAddType } from "../declare/FnAddType/FnAddType";
import { AddResultEnum, AddResultType } from "../declare/FnAddType/types";
import { FnFindMultiType } from "../declare/FnFindMultiType/FnFindMultiType";
import { FnFindType } from "../declare/FnFindType/FnFindType";
import { FindResultType } from "../declare/FnFindType/types";
import { IdType } from "../types";
import { ImplAddErrorEnum, ImplFindErrorEnum } from "./enums";

export interface CollectionType<T extends IdType, C, AC> {
  find: FnFindType<T, C>;
  findMulti: FnFindMultiType<T, C>;
  add: FnAddType<T, AC>;
  addMulti: FnAddMultiType<T, AC>;
}

export class Collection<T extends IdType>
  implements CollectionType<T, ImplFindErrorEnum, ImplAddErrorEnum>
{
  _elems: T[] = [];

  constructor(elems: T[]) {
    this._elems = elems;
  }

  async find(id: string): Promise<FindResultType<T, ImplFindErrorEnum>> {
    if (id.length < 1) {
      return { _tag: "find_error", code: ImplFindErrorEnum.ID_WRONG, desc: "" };
    }
    const index = this._elems.findIndex((el) => el.id === id);
    if (index !== -1) {
      return { _tag: "finded", elemIndex: index, elem: this._elems[index] };
    }
    return { _tag: "no_finded" };
  }

  async findMulti(
    ids: string[]
  ): Promise<Array<FindResultType<T, ImplFindErrorEnum>>> {
    const ret = [];
    for (const id of ids) {
      try {
        const findResult: any = await this.find(id);
        ret.push(findResult);
      } catch (err: any) {
        ret.push({
          _tag: "find_error",
          code: ImplFindErrorEnum.OTHER,
          desc: err?.message ?? "",
        });
      }
    }
    return ret;
  }

  async add(elem: T): Promise<AddResultType<T, ImplAddErrorEnum>> {
    const findResult = await this.find(elem.id);
    if (findResult._tag === "finded") {
      return { _tag: AddResultEnum.ALREADY_EXIST };
    }
    if (findResult._tag === "no_finded") {
      const uuid = randomUUID();
      elem.id = uuid;
      this._elems.push(elem);
      return { _tag: AddResultEnum.SUCCESS, id: uuid, addedElem: elem };
    }
    return {
      _tag: AddResultEnum.ERROR,
      code: ImplAddErrorEnum.OTHER_1,
      desc: findResult.desc,
    };
  }

  async addMulti(
    elems: T[]
  ): Promise<Array<AddResultType<T, ImplAddErrorEnum>>> {
    const ret: Array<AddResultType<T, ImplAddErrorEnum>> = [];
    for (const elem of elems) {
      try {
        const addResult: any = await this.add(elem);
        ret.push(addResult);
      } catch (err: any) {
        ret.push({
          _tag: AddResultEnum.ERROR,
          code: ImplAddErrorEnum.OTHER_2,
          desc: "",
        });
      }
    }
    return ret;
  }
}
