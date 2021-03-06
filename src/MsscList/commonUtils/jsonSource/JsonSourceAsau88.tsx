import React from 'react';
import { MsscIdObject, MsscSource } from '../../msscUtils/MsscSource';
import {
  RsuvEnResultCrudSet,
  RsuvResultBoolPknz,
  RsuvResultTibo,
  RsuvTuArray,
  RsuvTuString,
  RsuvTuTree,
  RsuvTxJsonServer,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort
} from 'rsuv-lib';
import { MsscFilter } from '../../msscUtils/MsscFilter';
import { MsscElem } from '../../msscUtils/MsscElem';
import { MsscTag } from '../../msscUtils/MsscTag';
import { Asau88JsonSourceParams } from './Asau88JsonSourceParams';
import _ from 'lodash';
import fp from 'lodash/fp';
import { RsuvAsau89 } from 'rsuv-lib/src/RsuvTuTree';

/*
ПОНЯТИЯ:
- [[asau88]] - обозначение для текущего функционала
- *эндпоинт - эндпоинт к которому мы обращаемся чтобы получить *э-сущность, из которой уже будем извлекать *д-массив
- *д-массив, *darray - JSON-массив являющийся источником всех данных
- *э-сущность - то что мы получаем при обращении к *эндопинту. Из *э-сущности мы извлекаем *д-массив
 */

let jsonServer: RsuvTxJsonServer;

class Cls1941 {
  static async elemsAll(jsonServer: RsuvTxJsonServer) {
    return await jsonServer.elemsGetAll()
  }
}

export class JsonSourceAsau88<T> implements MsscSource<T> {
  private thParams: Asau88JsonSourceParams<any>;

  constructor(params: Asau88JsonSourceParams<any>) {
    if (!jsonServer) {
      jsonServer = new RsuvTxJsonServer(params.endpointUrl, params.fieldPath)
    }
    this.thParams = params;
  }

  dialogCreateOrEdit(cbOk: (model: T) => void, cbCancel: () => void, initialValues?: object): Promise<JSX.Element> {
    return Promise.resolve(<></>); // TODO
  }

  dialogMiddleware(obj?: T): object | T | null {
    return null; // TODO
  }

  /**
   * Преобразование (1) к формату MsscElem[]
   * @param data
   * @private
   */
  private elemsToMsscElems(data: any[]): MsscElem[] {
    return data.map((el: any) => {
      const rr = this.thParams.elemJsx?.(el) || (<div>BR err [[220508132145]]</div>);
      return {id: el.id, elemModel: el, elem: rr} as MsscElem
    })
  }

  async elems(indexDiap: RsuvTxNumIntDiap, filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<MsscElem[]> {
    const {indexStart: {val: ixStart}, indexEnd: {val: ixEnd}} = indexDiap;
    if (filters.length < 1) {
      const data = await jsonServer?.elemsGet(ixStart, ixEnd - ixStart + 1);
      return this.elemsToMsscElems(data)
    } else {
      const elemsAll = await jsonServer.elemsGetAll()
      if (elemsAll && elemsAll.length > 0) {
        // --- elemsFilteredAll - все элементы хранилища соответствующие фильтрам 'filters'
        const elemsFilteredAll = this.elemsFiltered(elemsAll, filters);
        // --- извлекаем диапазон из elemsFilteredAll
        const ixEnd2 = ixEnd < elemsFilteredAll.length ? ixEnd : elemsFilteredAll.length - 1;
        const elemsFilteredRes = RsuvTuArray.elemsDiap(elemsFilteredAll, ixStart, ixEnd2)
        if (elemsFilteredRes.success) {
          return this.elemsToMsscElems(elemsFilteredRes.value)
        }
      }
    }
    return []
  }

  /**
   * Отбор из массива объектов (1) объектов удовлетворяющих фильтрам (2).
   * Видео-объяснение: https://www.notion.so/surr/video-220522-1353-4ddd18b05a85422fa9855c8afa836f73 .
   * @param elemsAll (1) -- массив объектов
   * @param filters (2) -- фильтры. Если пустой массив, возвращает элементы из (1) в виде нового массива
   * @private
   */
  private elemsFiltered(elemsAll: any[], filters: MsscFilter[]) {
    if (filters.length < 1) {
      return [...elemsAll]
    }
    // ---
    // фильтры означающие поиск просто по строке
    const filtersByOne = _.filter(filters, el => !el.isArrElemFind)
    // фильтры означающие поиск по массиву строк
    const filtersByArrPairs = fp.pipe([
      fp.filter(fp.property('isArrElemFind')),
      fp.groupBy('paramIdB'),
      fp.mapValues(fp.map('filterValue')), // {roles: ['admin', 'guest'], ...}
      fp.toPairs // [ ['roles', ['admin', 'guest']], ...]
    ])(filters)
    // ---
    const retElemsFiltered: any[] = []
    elemsAll.map((elElem: any) => {
      // --- поиск совпадений для filtersByOne
      // здесь будет TRUE если элемент соответствует хотя бы одному из фильтров filtersByOne
      const isFindedByString = fp.anyPass([
        fp.isEmpty,
        fp.some((elFilter: MsscFilter) => {
          if (elFilter.filterValue) {
            const val = _.get(elElem, elFilter.paramIdB || '')
            if (_.isString(val)) {
              const res = RsuvTuString.substrIndexes(val, elFilter.filterValue, true)
              return res.length > 0
            }
          }
          return false;
        })
      ])(filtersByOne)
      // --- поиск совпадений для filtersByArrPairs
      // здесь будет TRUE если elElem соответствует всем фильтрам из filtersByArrPairs
      const isFindedByTags = fp.anyPass([
        fp.isEmpty,
        fp.every((elFilterPair: any) => {
          const fieldName = elFilterPair[0]
          const filterValues = elFilterPair[1]
          const elemValues = _.get(elElem, fieldName, [])
          // TRUE если в elemValues содержаться все значения из filterValues, при условии что filterValues не пустой
          return RsuvTuArray.containsAll(elemValues, filterValues)
        })
      ])(filtersByArrPairs)
      // ---
      if (isFindedByString && isFindedByTags) {
        retElemsFiltered.push(elElem);
      }
    })
    return retElemsFiltered;
  }

  elemsAdd(elems: T[]): Promise<Array<RsuvResultBoolPknz | T>> {
    return Promise.resolve([]); // TODO
  }

  elemsById(ids: MsscIdObject[]): Promise<MsscElem[]> {
    return Promise.resolve([]); // TODO
  }

  async elemsCountByFilter(filters: MsscFilter[]): Promise<RsuvTxNumIntAB> {
    if (filters.length < 1) {
      const count = await jsonServer?.elemsCountGetAll()
      return new RsuvTxNumIntAB(count || 0);
    } else {
      const elems = await Cls1941.elemsAll(jsonServer)
      const elemsFiltered = this.elemsFiltered(elems, filters)
      return new RsuvTxNumIntAB(elemsFiltered.length)
    }
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
    if (searchText) {
      return this.thParams.cbFilterFromSearchText?.(searchText) || null
    }
    return null
  }

  filterFromTags(tags: string[], fieldName: string): MsscFilter[] | null {
    if (tags && tags.length > 0) {
      return this.thParams.cbFilterFromTags?.(tags, fieldName) || null
    }
    return null;
  }

  idsAll(filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<string[]> {
    return Promise.resolve([]); // TODO
  }

  async tags(filters: MsscFilter[], fieldName: string): Promise<MsscTag[]> {
    const elems = await Cls1941.elemsAll(jsonServer)
    const elemsFiltered = this.elemsFiltered(elems, filters)
    // ---
    const tibo: RsuvResultTibo<RsuvAsau89[]> = RsuvTuTree.accum(elemsFiltered, fieldName, 'id', true)
    const msscTags: MsscTag[] = []
    if (tibo.success) {
      const elems: RsuvAsau89[] | undefined = tibo.value
      elems!.forEach(el1 => {
        const val = el1.value;
        const count = el1.ids.length;
        const msscTag = {value: val, count} as MsscTag;
        msscTags.push(msscTag)
      })
    }
    return msscTags;
  }

}
