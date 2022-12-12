import _ from 'lodash';
import fp from 'lodash/fp';
import React from 'react';
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
import { RsuvAsau89 } from 'rsuv-lib/src/RsuvTuTree';

import { VanxElemType } from '../../vanx/types/VanxElemType';
import { VanxFilterType } from '../../vanx/types/VanxFilterType';
import { VanxIdObjectType } from '../../vanx/types/VanxIdObjectType';
import { VanxTagType } from '../../vanx/types/VanxTagType';
import { VanxSourceType } from '../../vanx/VanxSourceType';
import { Asau88JsonSourceParams } from './Asau88JsonSourceParams';

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

export class JsonSourceAsau88<T> implements VanxSourceType<T> {
  private readonly thParams: Asau88JsonSourceParams<any>;

  constructor(params: Asau88JsonSourceParams<any>) {
    if (!jsonServer) {
      jsonServer = new RsuvTxJsonServer(params.endpointUrl, params.fieldPath)
    }
    this.thParams = params;
  }

  async dialogCreateOrEdit(cbOk: (model: T) => void, cbCancel: () => void, initialValues?: object): Promise<JSX.Element> {
    return await Promise.resolve(<></>); // TODO
  }

  dialogMiddleware(obj?: T): object | T | null {
    return null; // TODO
  }

  async elems(indexDiap: RsuvTxNumIntDiap, filters: VanxFilterType[], sorts: RsuvTxSort[]): Promise<VanxElemType[]> {
    const { indexStart: { val: ixStart }, indexEnd: { val: ixEnd } } = indexDiap;
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

  async elemsAdd(elems: T[]): Promise<Array<RsuvResultBoolPknz | T>> {
    return await Promise.resolve([]); // TODO
  }

  async elemsById(ids: VanxIdObjectType[]): Promise<VanxElemType[]> {
    const elemsAll = await jsonServer?.elemsGetAll()
    let ret = []
    if (elemsAll && elemsAll.length > 0) {
      ret = elemsAll.filter((el: any) => {
        return ids.some(el2 => el2.id === el.id)
      })
    }
    return this.elemsToMsscElems(ret)
  }

  async elemsCountByFilter(filters: VanxFilterType[]): Promise<RsuvTxNumIntAB> {
    if (filters.length < 1) {
      const count = await jsonServer?.elemsCountGetAll()
      return new RsuvTxNumIntAB(count || 0);
    } else {
      const elems = await Cls1941.elemsAll(jsonServer)
      const elemsFiltered = this.elemsFiltered(elems, filters)
      return new RsuvTxNumIntAB(elemsFiltered.length)
    }
  }

  async elemsDelete(elems: VanxIdObjectType[]): Promise<VanxIdObjectType[]> {
    const ids = elems.map(el => el.id)
    const results = await jsonServer.elemsDeleteB(ids) // g8g

    return await Promise.resolve([]); // TODO
  }

  async elemsSet(elems: T[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    return await Promise.resolve([]); // TODO
  }

  async elemsUpsert(elems: T[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    return await Promise.resolve([]); // TODO
  }

  filterFromSearchText(searchText: string): VanxFilterType[] | null {
    if (searchText) {
      return this.thParams.cbFilterFromSearchText?.(searchText) || null
    }
    return null
  }

  filterFromTags(tags: string[], fieldName: string): VanxFilterType[] | null {
    if (tags && tags.length > 0) {
      return this.thParams.cbFilterFromTags?.(tags, fieldName) || null
    }
    return null;
  }

  /**
   *
   * @param filters
   * @param sorts -- не реализовано
   */
  async idsAll(filters: VanxFilterType[], sorts: RsuvTxSort[]): Promise<string[]> {
    let retIds = []
    const elemsAll = await jsonServer.elemsGetAll()
    if (elemsAll && elemsAll.length > 0) {
      // --- elemsFilteredAll - все элементы хранилища соответствующие фильтрам 'filters'
      const elemsFilteredAll = this.elemsFiltered(elemsAll, filters);
      // ---
      retIds = elemsFilteredAll.map(el => el.id);
    }
    return retIds;
  }

  async tags(filters: VanxFilterType[], fieldName: string): Promise<VanxTagType[]> {
    const elems = await Cls1941.elemsAll(jsonServer)
    const elemsFiltered = this.elemsFiltered(elems, filters)
    // ---
    const tibo: RsuvResultTibo<RsuvAsau89[]> = RsuvTuTree.accum(elemsFiltered, fieldName, 'id', true)
    const msscTags: VanxTagType[] = []
    if (tibo.success) {
      const elems: RsuvAsau89[] | undefined = tibo.value
      elems!.forEach(el1 => {
        const val = el1.value;
        const count = el1.ids.length;
        const msscTag = { value: val, count } as VanxTagType;
        msscTags.push(msscTag)
      })
    }
    return msscTags;
  }

  /**
   * Преобразование (1) к формату MsscElem[]
   * @param data
   * @private
   */
  private elemsToMsscElems(data: any[]): VanxElemType[] {
    return data.map((el: any) => {
      const rr = this.thParams.elemJsx?.(el) ?? (<div>BR err [[220508132145]]</div>);
      return { id: el.id, elemModel: el, elem: rr }
    })
  }

  /**
   * Отбор из массива объектов (1) объектов удовлетворяющих фильтрам (2).
   * Видео-объяснение: https://www.notion.so/surr/video-220522-1353-4ddd18b05a85422fa9855c8afa836f73 .
   * @param elemsAll (1) -- массив объектов
   * @param filters (2) -- фильтры. Если пустой массив, возвращает элементы из (1) в виде нового массива
   * @private
   */
  private elemsFiltered(elemsAll: any[], filters: VanxFilterType[]) {
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
    elemsAll.forEach((elElem: any) => {
      // --- поиск совпадений для filtersByOne
      // здесь будет TRUE если элемент соответствует хотя бы одному из фильтров filtersByOne
      const isFindedByString = fp.anyPass([
        fp.isEmpty,
        fp.some((elFilter: VanxFilterType) => {
          if (elFilter.filterValue) {
            const val = _.get(elElem, elFilter.paramIdB ?? '')
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

}
