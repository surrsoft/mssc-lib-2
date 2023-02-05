import {
  HoggConnectorAirtable,
  HoggConnectorNT,
  HoggOffsetCount,
  HoggResultAccum, HoggResultB,
  HoggTupleNT,
  tupleFrom,
  tupleToObject
} from 'hogg-lib';
import _ from 'lodash';
import React from 'react';
import {
  RsuvAsau67,
  RsuvEnResultCrudSet,
  RsuvEnSort, RsuvPElemAsau66,
  RsuvResultBoolPknz,
  RsuvResultTibo,
  RsuvTu,
  RsuvTuPromiseAllSettled,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort,
  RsuvTxStringAB
} from 'rsuv-lib';

import { MsscSourceType } from '../../types/MsscSourceType';
import { MsscElemType } from '../../types/types/MsscElemType';
import { MsscFilterType } from '../../types/types/MsscFilterType';
import { MsscIdObjectType } from '../../types/types/MsscIdObjectType';
import { MsscTagCls } from '../../types/types/MsscTagCls';
import { MsscTagsGroupIdType } from '../../types/types/MsscTagsGroupIdType';
import { AirSourceParams } from './AirSourceParams';

interface IxtType {
  index: number,
  tuple: HoggTupleNT
}

interface FdType {
  field: string;
  direction: 'desc' | 'asc'
}

function msscFiltersToVuscFilter(filters: MsscFilterType[]) {
  if (filters && filters.length > 0) {
    const rrTags: string[] = []
    const rr0 = filters.reduce<string[]>((acc, elFilter: MsscFilterType) => {
      if (elFilter.paramId?.val && elFilter.filterValue) {
        if (!elFilter.isArrElemFind) {
          acc.push(`(FIND(LOWER("${elFilter.filterValue as string}"),LOWER({${elFilter.paramId.val}})))`)
        } else {
          if (elFilter.filterValue !== RsuvTu.RSUV_NO_TAGS_SPC_VALUE) {
            rrTags.push(`(FIND("${elFilter.filterValue as string}",{${elFilter.paramId.val}}))`)
          } else {
            rrTags.push(`(LEN({${elFilter.paramId.val}}) < 1)`)
          }
        }
      }
      return acc
    }, []);
    // ---
    const rr2 = rrTags.join(',')
    const rr3 = `AND(${rr2})`
    if (rr2) {
      rr0.push(rr3)
    }
    // ---
    const rr = rr0.join(',');
    // ---
    return `SUM(${rr})`
  }
  return ''
}

/**
 * Имплементация {@link MsscSourceType} для источника "airtable.com"
 */
export class AirSource<T> implements MsscSourceType<T> {

  private readonly connector: HoggConnectorNT;
  private readonly thParams: AirSourceParams<T>

  constructor(params: AirSourceParams<T>) {
    this.thParams = params;
    const air = new HoggConnectorAirtable()
    air.init({ apiKey: process.env.REACT_APP_AIRTABLE_KEY ?? '' })
    this.connector = air
      .db(params.dbKey)
      .table(params.tableName)
      .columns(params.columns)
  }

  async dialogCreateOrEdit(cbOk: (model: T) => void, cbCancel: () => void, initialValues?: object): Promise<JSX.Element> {
    if (this.thParams.dialogCreateEditJsx) {
      const initialValues0 = this.dialogMiddleware(initialValues as any)
      return await this.thParams.dialogCreateEditJsx(cbOk, cbCancel, initialValues0 as any)
    }
    return await Promise.resolve(<div>no realised</div>)
  }

  async idsAll(filters: MsscFilterType[]): Promise<string[]> {
    // ---
    const { filterVusc, sortArrObj } = this.fnFilterAndSort(filters, []);
    // ---
    const hoggOffset = new HoggOffsetCount(true);
    this.connector.sort(sortArrObj)
    // --- QUERY
    const queryResult: HoggTupleNT[] = await this.connector
      .filterVusc(filterVusc)
      .query(hoggOffset) // <=== QUERY
    // ---
    if (queryResult && queryResult.length > 0) {
      const objs = queryResult.map((elTuple: HoggTupleNT) => {
        return tupleToObject(elTuple)
      }).filter(elObj => elObj !== null)
      return objs.map((elObj: any) => {
        return elObj.tid
      });
    }
    return await Promise.resolve([]);
  }

  async elemsById(ids: MsscIdObjectType[]): Promise<MsscElemType[]> {
    const promises = ids.map(async elId => {
      return await this.connector.queryOneById(elId.id)
    })
    const results = await Promise.allSettled(promises)
    if (!RsuvTuPromiseAllSettled.isAllSuccess(results as RsuvPElemAsau66[])) {
      throw new Error('[[220130215035]] not all successed')
    }
    const resultsNext: RsuvAsau67[] = RsuvTuPromiseAllSettled.fulfilled(results as RsuvPElemAsau66[])
    if (resultsNext && resultsNext.length > 0) {
      const tuples: HoggTupleNT[] = resultsNext.map((el: RsuvAsau67) => el.value as HoggTupleNT)
      return this.toMsscElems(tuples);
    }
    return await Promise.resolve([]);
  }

  async elems(indexDiap: RsuvTxNumIntDiap, filters: MsscFilterType[], sorts: RsuvTxSort[]): Promise<MsscElemType[]> {
    const { filterVusc, sortArrObj } = this.fnFilterAndSort(filters, sorts);
    // ---
    const indexStart = indexDiap.indexStart.val;
    const indexEnd = indexDiap.indexEnd.val;
    const hoggOffset = new HoggOffsetCount(false, indexStart, indexEnd - indexStart + 1);
    this.connector.sort(sortArrObj)
    // --- QUERY
    const queryResult: HoggTupleNT[] = await this.connector
      .filterVusc(filterVusc)
      .query(hoggOffset) // <=== QUERY
    // ---
    if (queryResult && queryResult.length > 0) {
      return this.toMsscElems(queryResult);
    }
    return await Promise.resolve([]);
  }

  async elemsAdd(elems: T[]): Promise<Array<RsuvResultBoolPknz | T>> {
    const elems0 = elems.map((el: any) => {
      return _.omit(el, 'id')
    })
    const tuples: Array<HoggTupleNT | null> = elems0.map((el: any) => {
      return tupleFrom(el)
    })
    // отбираем только те для которых успешно создался tuple
    const validTuples = tuples.reduce<IxtType[]>((acc: IxtType[], tuple: HoggTupleNT | null, ix: number) => {
      if (tuple) acc.push({ index: ix, tuple })
      return acc;
    }, [])
    const tuples0 = validTuples.map((el: any) => el.tuple)
    const createResult: HoggResultB<string[]> = await this.connector.create(tuples0)
    if (createResult.success && createResult.value) {
      const ids: string[] | undefined = createResult.value
      return elems.reduce((acc: any, el: any, ix: number) => {
        const tix = validTuples.findIndex((el0: IxtType) => el0.index === ix)
        if (ix === tix) {
          el.id = ids[ix]
          acc.push(el)
        }
        return acc
      }, [])
    }
    throw new Error(`${createResult.errCode ?? ''} : ${createResult.errMessage ?? ''}`);
  }

  async elemsCountByFilter(filters: MsscFilterType[]): Promise<RsuvTxNumIntAB> {
    let vuscFilter: string = '';
    if (filters.length > 0) {
      vuscFilter = msscFiltersToVuscFilter(filters);
    }
    const count = await this.connector.filterVusc(vuscFilter).countAll()
    return new RsuvTxNumIntAB(count)
  }

  async elemsDelete(elems: MsscIdObjectType[]): Promise<MsscIdObjectType[]> {
    const promises = elems.map(async (el: MsscIdObjectType) => {
      return await this.connector.delete([el.id || ''])
    })
    const pResults = await Promise.allSettled(promises)
    const rejectedList = RsuvTuPromiseAllSettled.rejected(pResults as RsuvPElemAsau66[])
    return rejectedList.map(el => {
      return elems[el.ix]
    })
  }

  async elemsSet(elems: T[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    const elems0 = elems.map((el: any) => {
      const ell = _.cloneDeep(el)
      ell.tid = ell.id
      delete ell.id
      return ell
    })
    const tuples: Array<HoggTupleNT | null> = elems0.map((el: any) => {
      return tupleFrom(el)
    })
    // отбираем только те для которых успешно создался tuple
    const validTuples = tuples.reduce<IxtType[]>((acc: IxtType[], tuple: HoggTupleNT | null, ix: number) => {
      if (tuple) acc.push({ index: ix, tuple })
      return acc;
    }, [])
    const tuples0 = validTuples.map((el: any) => el.tuple)
    const result = await this.connector.update(tuples0)
    if (result.value) {
      return elems0.map((_, ix) => {
        const rr = validTuples.find(el0 => el0.index === ix)
        if (rr) {
          return new RsuvResultTibo({ success: true, value: RsuvEnResultCrudSet.UPDATED })
        } else {
          return new RsuvResultTibo({ success: false, errCode: '[[220129125638]]' })
        }
      })
    }
    throw new Error('[[220129125711]]')
  }

  async elemsUpsert(elems: T[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    throw new Error('error [[221211100822]]');
  }

  dialogMiddleware(obj?: T): object | T | null {
    if (obj) {
      if (this.thParams.dialogMiddleware) {
        return this.thParams.dialogMiddleware(obj)
      }
      const obj0: any = _.cloneDeep(obj)
      obj0.id = obj0.tid;
      return obj0;
    }
    return null;
  }

  filterFromSearchText(searchText: string): MsscFilterType[] | null {
    if (searchText) {
      return this.thParams.cbFilterFromSearchText?.(searchText) ?? null
    }
    return null
  }

  filterFromTags(tags: string[], tagGroupId: MsscTagsGroupIdType): MsscFilterType[] | null {
    if (tags && tags.length > 0) {
      return this.thParams.cbFilterFromTags?.(tags, tagGroupId) ?? null
    }
    return null;
  }

  async tags(filters: MsscFilterType[], fieldName: string): Promise<MsscTagCls[]> {
    const { filterVusc } = this.fnFilterAndSort(filters, []);
    // ---
    const hoggOffset = new HoggOffsetCount(true);
    // --- QUERY
    const queryResult: HoggResultAccum[] = await this.connector
      .filterVusc(filterVusc)
      .queryAccum(hoggOffset, fieldName) // <=== QUERY
    // ---
    if (queryResult && queryResult.length > 0) {
      return queryResult.map(el => {
        return new MsscTagCls(el.value, el.ids.length)
      })
    }
    return [];
  }

  /**
   * Для (1) и (2) возвращает соответствующие адаптации под Airtable API
   * @param filters
   * @param sorts
   * @private
   */
  private fnFilterAndSort(filters: MsscFilterType[], sorts: RsuvTxSort[]) {
    const filterVusc = msscFiltersToVuscFilter(filters)
    let sortArrObj: FdType[] = []
    if (sorts.length > 0) {
      sortArrObj = sorts.map(el => {
        const obj: FdType = {
          field: el.id.val,
          direction: el.sortDirect === RsuvEnSort.ASC ? 'asc' : 'desc'
        }
        return obj;
      })
    }
    return { filterVusc, sortArrObj };
  }

  private toMsscElems(queryResult: HoggTupleNT[]) {
    const objs = queryResult.map((elTuple: HoggTupleNT) => {
      return tupleToObject(elTuple)
    }).filter(elObj => elObj !== null)
    return objs.map((elObj: any) => {
      const obj: MsscElemType = {
        id: new RsuvTxStringAB(elObj.tid),
        elem: this.thParams?.elemJsx ? this.thParams.elemJsx(elObj) : (<div>{elObj.id} warn-[[220503114824]]</div>),
        elemModel: elObj
      }
      return obj;
    });
  }

}
