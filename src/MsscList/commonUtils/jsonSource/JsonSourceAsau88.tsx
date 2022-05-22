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
   * @param datas
   * @private
   */
  private elemsToMsscElems(datas: any[]): MsscElem[] {
    return datas.map((el: any) => {
      const rr = this.thParams.elemJsx?.(el) || (<div>BR err [[220508132145]]</div>);
      return {id: el.id, elemModel: el, elem: rr} as MsscElem
    })
  }

  async elems(indexDiap: RsuvTxNumIntDiap, filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<MsscElem[]> {
    const {indexStart: {val: ixStart}, indexEnd: {val: ixEnd}} = indexDiap;
    if (filters.length < 1) {
      const datas = await jsonServer?.elemsGet(ixStart, ixEnd - ixStart + 1);
      return this.elemsToMsscElems(datas)
    } else {
      const elemsAll = await jsonServer.elemsGetAll()
      if (elemsAll && elemsAll.length > 0) {
        // --- elemsFilteredAll - все элементы хранилища соответствующие фильтрам 'filters'
        debugger; // del+
        const elemsFilteredAll = this.elemsFiltered(elemsAll, filters);
        console.log('!!-!!-!! 1149- elemsFilteredAll {220514115117}\n', elemsFilteredAll); // del+
        // --- извлекаем диапазон из elemsFilteredAll
        const ixEnd2 = ixEnd < elemsFilteredAll.length ? ixEnd : elemsFilteredAll.length - 1;
        const elemsFilteredRes = RsuvTuArray.elemsDiap(elemsFilteredAll, ixStart, ixEnd2)
        console.log('!!-!!-!! 1149- elemsFilteredRes {220514115211}\n', elemsFilteredRes); // del+
        if (elemsFilteredRes.success) {
          return this.elemsToMsscElems(elemsFilteredRes.value)
        }
      }
    }
    return []
  }

  /**
   * Отбор из массива объектов (1) объектов удовлетворяющих фильтрам (2)
   * @param elemsAll (1) -- массив объектов
   * @param filters (2) -- фильтры. Если пустой массив, возвращает элементы из (1) в виде нового массива
   * @private
   */
  private elemsFiltered(elemsAll: any[], filters: MsscFilter[]) {
    console.log('!!-!!-!! filters {220522001225}\n', filters); // del+
    if (filters.length < 1) {
      return [...elemsAll]
    }
    // ---
    // фильтры означающие поиск просто по строке
    const filtersByOne = _.chain(filters).filter(el => !el.isArrElemFind).value()
    // фильтры означающие поиск по массиву строк
    const filtersByArrObj = _.chain(filters).filter(el => !!el.isArrElemFind).groupBy('paramIdB').value()
    // ---
    const elemsFilteredAll: any[] = []
    elemsAll.map((loopElem: any) => {
      // здесь будет TRUE если элемент соответствует хотя бы одному из фильтров filtersByOne
      let isNeedPush1 = false;
      // здесь будет TRUE если loopElem соответствует всем фильтрам из filtersByArrObj
      let isNeedPush2 = false;
      // --- поиск совпадений для filtersByOne
      if (filtersByOne.length < 1) {
        isNeedPush1 = true;
      } else {
        isNeedPush1 = filtersByOne.some((loopFilter: MsscFilter) => {
          if (loopFilter.filterValue) {
            const val = _.get(loopElem, loopFilter.paramIdB || '')
            if (_.isString(val)) {
              const res = RsuvTuString.substrIndexes(val, loopFilter.filterValue, true)
              return res.length > 0
            }
          }
          return false;
        })
      }
      // --- поиск совпадений для filtersByArrObj
      if (Object.values(filtersByArrObj).length <= 0) {
        isNeedPush2 = true
      } else {
        _.chain(filtersByArrObj).toPairs().forEach(pair => {
          const pairKey = pair[0]
          const pairFilters = pair[1]
          const elFieldValues = _.get(loopElem, pairKey, '')
          if (_.isArray(elFieldValues) && elFieldValues.length > 0) {
            const reduced = pairFilters.reduce((acc: any[], pairFilter) => {
              elFieldValues.includes(pairFilter.filterValue) && acc.push(true)
              return acc;
            }, [])
            isNeedPush2 = reduced.length === pairFilters.length
          }
        }).value()
      }
      // ---
      if (isNeedPush1 && isNeedPush2) {
        elemsFilteredAll.push(loopElem);
      }
    })
    return elemsFilteredAll;
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
    console.log('!!-!!-!! 0846- elems {220521084734}\n', elems); // del+
    console.log('!!-!!-!! 0846- filters {220521084745}\n', filters); // del+
    const elemsFiltered = this.elemsFiltered(elems, filters)
    console.log('!!-!!-!! 0846- elemsFiltered {220521084653}\n', elemsFiltered); // del+
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
