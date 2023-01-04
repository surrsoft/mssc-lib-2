import { randomUUID } from "crypto";

import { FnAddMultiType } from "../declare/FnAddMultiType/FnAddMultiType";
import { FnAddType } from "../declare/FnAddType/FnAddType";
import { TG4TDisEnum, TG4TResultType } from "../declare/FnAddType/types";
import {
  FnElemsGetType,
  TG2TDisEnum,
  TG2TResultType,
} from "../declare/FnElemsGet/FnElemsGetType";
import { FnFindMultiType } from "../declare/FnFindMultiType/FnFindMultiType";
import { FnFindType } from "../declare/FnFindType/FnFindType";
import { TG3TDisEnum, TG3TResultType } from "../declare/FnFindType/types";
import {
  FnSetType,
  TG5TDisEnum,
  TG5TResultType,
} from "../declare/FnSetType/FnSetType";
import {
  FnUpdateType,
  TG6TDisEnum,
  TG6TResultType,
} from "../declare/FnUpdateType/FnUpdateType";
import { T5TIdType } from "../types";
import { ImplAddErrorEnum, ImplFindErrorEnum } from "./enums";
import { indexesDiapAdapter } from "./utils/indexesDiapAdapter/indexesDiapAdapter";
import { TG1TDisEnum } from "./utils/indexesDiapAdapter/types";

export interface CollectionType<T extends T5TIdType, C, AC, EC, SC, UC> {
  find: FnFindType<T, C>;
  findMulti: FnFindMultiType<T, C>;
  add: FnAddType<T, AC>;
  addMulti: FnAddMultiType<T, AC>;
  elemsGet: FnElemsGetType<T, EC>;
  elemSet: FnSetType<T, SC>;
  elemUpdate: FnUpdateType<T, UC>;
}

export class Collection<T extends T5TIdType>
  implements
    CollectionType<
      T,
      ImplFindErrorEnum,
      ImplAddErrorEnum,
      string,
      string,
      string
    >
{
  _elems: T[] = [];

  constructor(elems: T[]) {
    this._elems = elems;
  }

  async find(id: string): Promise<TG3TResultType<T, ImplFindErrorEnum>> {
    if (id.length < 1) {
      return {
        _tag: TG3TDisEnum.TG3T_DIS_FIND_ERROR,
        code: ImplFindErrorEnum.ID_WRONG,
        desc: "",
      };
    }
    const index = this._elems.findIndex((el) => el.id === id);
    if (index !== -1) {
      return {
        _tag: TG3TDisEnum.TG3T_DIS_FINDED,
        elemIndex: index,
        elem: this._elems[index],
      };
    }
    return { _tag: TG3TDisEnum.TG3T_DIS_NO_FINDED };
  }

  async findMulti(
    ids: string[]
  ): Promise<Array<TG3TResultType<T, ImplFindErrorEnum>>> {
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

  async add(elem: T): Promise<TG4TResultType<T, ImplAddErrorEnum>> {
    const findResult = await this.find(elem.id);
    if (findResult._tag === TG3TDisEnum.TG3T_DIS_FINDED) {
      return { _tag: TG4TDisEnum.TG4T_DIS_ALREADY_EXIST };
    }
    if (findResult._tag === TG3TDisEnum.TG3T_DIS_NO_FINDED) {
      const uuid = randomUUID();
      elem.id = uuid;
      this._elems.push(elem);
      return { _tag: TG4TDisEnum.TG4T_DIS_SUCCESS, id: uuid, addedElem: elem };
    }
    return {
      _tag: TG4TDisEnum.TG4T_DIS_ERROR,
      code: ImplAddErrorEnum.OTHER_1,
      desc: findResult.desc,
    };
  }

  async addMulti(
    elems: T[]
  ): Promise<Array<TG4TResultType<T, ImplAddErrorEnum>>> {
    const ret: Array<TG4TResultType<T, ImplAddErrorEnum>> = [];
    for (const elem of elems) {
      try {
        const addResult: any = await this.add(elem);
        ret.push(addResult);
      } catch (err: any) {
        ret.push({
          _tag: TG4TDisEnum.TG4T_DIS_ERROR,
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
  ): Promise<TG2TResultType<T, string>> {
    const ixResult = indexesDiapAdapter(
      indexStart,
      indexEnd,
      this._elems.length
    );
    if (ixResult._tag === TG1TDisEnum.TG1T_DIS_EMPTY_ARR) {
      return {
        _tag: TG2TDisEnum.TG2T_DIS_SUCCESS,
        elems: [],
        indexAdaptInfo: ixResult,
      };
    }
    const { indexStart: indexStartNext, indexEnd: indexEndNext } = ixResult;
    try {
      const elems = this._elems.slice(indexStartNext, indexEndNext);
      return {
        _tag: TG2TDisEnum.TG2T_DIS_SUCCESS,
        elems,
        indexAdaptInfo: ixResult,
      };
    } catch (err) {
      return {
        _tag: TG2TDisEnum.TG2T_DIS_ERROR,
        code: "err [[230103200244]]",
        desc: "error at elems slice",
        indexAdaptInfo: ixResult,
      };
    }
  }

  async elemSet(elem: T): Promise<TG5TResultType<T, string>> {
    const fndResult = await this.find(elem.id);
    if (fndResult._tag === TG3TDisEnum.TG3T_DIS_FINDED) {
      const ix = fndResult.elemIndex;
      this._elems.splice(ix, 1, elem);
      return { _tag: TG5TDisEnum.TG5T_DIS_SUCCESS, elem };
    } else if (fndResult._tag === TG3TDisEnum.TG3T_DIS_NO_FINDED) {
      return { _tag: TG5TDisEnum.TG5T_DIS_NO_FIND };
    }
    return { _tag: TG5TDisEnum.TG5T_DIS_ERROR, code: "err [[230104221629]]" };
  }

  async elemUpdate(elem: T): Promise<TG6TResultType<T, string>> {
    const fndResult = await this.find(elem.id);
    if (fndResult._tag === TG3TDisEnum.TG3T_DIS_FINDED) {
      const ix = fndResult.elemIndex;
      this._elems.splice(ix, 1, elem); // TODO
      return { _tag: TG6TDisEnum.TG6T_DIS_SUCCESS, elem };
    } else if (fndResult._tag === TG3TDisEnum.TG3T_DIS_NO_FINDED) {
      return { _tag: TG6TDisEnum.TG6T_DIS_NO_FIND };
    }
    return { _tag: TG6TDisEnum.TG6T_DIS_ERROR, code: "err [[230104223144]]" };
  }
}
