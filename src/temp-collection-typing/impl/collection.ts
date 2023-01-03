import { randomUUID } from "crypto";

import { FnAddMultiType } from "../declare/FnAddMultiType/FnAddMultiType";
import { FnAddType } from "../declare/FnAddType/FnAddType";
import { AddResultEnum, AddResultType } from "../declare/FnAddType/types";
import {
  ElemsGetResultEnum,
  ElemsGetResultType,
  FnElemsGetType,
} from "../declare/FnElemsGet/FnElemsGetType";
import { FnFindMultiType } from "../declare/FnFindMultiType/FnFindMultiType";
import { FnFindType } from "../declare/FnFindType/FnFindType";
import { FindResultEnum, FindResultType } from "../declare/FnFindType/types";
import { IdType } from "../types";
import { ImplAddErrorEnum, ImplFindErrorEnum } from "./enums";
import { indexesDiapAdapter } from "./utils/indexesDiapAdapter/indexesDiapAdapter";
import { TG1TDisEnum } from "./utils/indexesDiapAdapter/types";

export interface CollectionType<T extends IdType, C, AC, EC> {
  find: FnFindType<T, C>;
  findMulti: FnFindMultiType<T, C>;
  add: FnAddType<T, AC>;
  addMulti: FnAddMultiType<T, AC>;
  elemsGet: FnElemsGetType<T, EC>;
}

export class Collection<T extends IdType>
  implements CollectionType<T, ImplFindErrorEnum, ImplAddErrorEnum, string>
{
  _elems: T[] = [];

  constructor(elems: T[]) {
    this._elems = elems;
  }

  async find(id: string): Promise<FindResultType<T, ImplFindErrorEnum>> {
    if (id.length < 1) {
      return {
        _tag: FindResultEnum.FIND_ERROR,
        code: ImplFindErrorEnum.ID_WRONG,
        desc: "",
      };
    }
    const index = this._elems.findIndex((el) => el.id === id);
    if (index !== -1) {
      return {
        _tag: FindResultEnum.FINDED,
        elemIndex: index,
        elem: this._elems[index],
      };
    }
    return { _tag: FindResultEnum.NO_FINDED };
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
    if (findResult._tag === FindResultEnum.FINDED) {
      return { _tag: AddResultEnum.ALREADY_EXIST };
    }
    if (findResult._tag === FindResultEnum.NO_FINDED) {
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

  async elemsGet(
    indexStart: number,
    indexEnd: number
  ): Promise<ElemsGetResultType<T, string>> {
    const ixResult = indexesDiapAdapter(
      indexStart,
      indexEnd,
      this._elems.length
    );
    if (ixResult._tag === TG1TDisEnum.EMPTY_ARR) {
      return { _tag: ElemsGetResultEnum.SUCCESS, elems: [] };
    }
    const { indexStart: indexStartNext, indexEnd: indexEndNext } = ixResult;
    try {
      const elems = this._elems.slice(indexStartNext, indexEndNext);
      return { _tag: ElemsGetResultEnum.SUCCESS, elems };
    } catch (err) {
      return { _tag: ElemsGetResultEnum.ERROR, code: "err [[230103200244]]" };
    }
  }
}
