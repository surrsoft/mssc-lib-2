import React from 'react';
import { MsscIdObject, MsscSource } from '../../msscUtils/MsscSource';
import {
  RsuvEnResultCrudSet,
  RsuvResultBoolPknz,
  RsuvResultTibo,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort
} from 'rsuv-lib';
import { MsscFilter } from '../../msscUtils/MsscFilter';
import { MsscElem } from '../../msscUtils/MsscElem';
import { MsscTag } from '../../msscUtils/MsscTag';

/*
ПОНЯТИЯ:
- *д-массив, *darray - JSON-массив являющийся источником всех данных
 */

interface ArraySourceParams {
  /**
   * Абсолютный путь к *д-массиву
   */
  filePath: string;
}

export class ArraySource<T> implements MsscSource<T> {
  private thParams: ArraySourceParams;

  constructor(params: ArraySourceParams) {
    this.thParams = params;
  }

  dialogCreateOrEdit(cbOk: (model: T) => void, cbCancel: () => void, initialValues?: object): Promise<JSX.Element> {
    return Promise.resolve(<></>); // TODO
  }

  dialogMiddleware(obj?: T): object | T | null {
    return null; // TODO
  }

  elems(indexDiap: RsuvTxNumIntDiap, filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<MsscElem[]> {
    return Promise.resolve([]); // TODO
  }

  elemsAdd(elems: T[]): Promise<Array<RsuvResultBoolPknz | T>> {
    return Promise.resolve([]); // TODO
  }

  elemsById(ids: MsscIdObject[]): Promise<MsscElem[]> {
    return Promise.resolve([]); // TODO
  }

  elemsCountByFilter(filters: MsscFilter[]): Promise<RsuvTxNumIntAB> {
    return Promise.resolve(new RsuvTxNumIntAB(0)); // TODO
  }

  elemsDelete(elems: MsscIdObject[]): Promise<MsscIdObject[]> {
    return Promise.resolve([]); // TODO
  }

  elemsSet(elems: T[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    return Promise.resolve([]); // TODO
  }

  elemsUpsert(elems: T[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    return Promise.resolve([]); // TODO
  }

  filterFromSearchText(searchText: string): MsscFilter[] | null {
    return null; // TODO
  }

  filterFromTags(tags: string[], fieldName: string): MsscFilter[] | null {
    return null; // TODO
  }

  idsAll(filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<string[]> {
    return Promise.resolve([]); // TODO
  }

  tags(filters: MsscFilter[], fieldName: string): Promise<MsscTag[]> {
    return Promise.resolve([]); // TODO
  }

}
