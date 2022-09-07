import _ from 'lodash';
import { RsuvEnSort, RsuvTxChecked, RsuvTxNumIntAB, RsuvTxSort, RsuvTxStringAC } from 'rsuv-lib';
import {
  ElemsCountParamsType,
  ElemsCountReturnType,
  FiltersCreateParamsType,
  MsscColumnNameType,
  MsscFilterType,
  MsscTagGroupSelectedType,
  MsscTagGroupType,
  TagsParamsType
} from '../types/types';
import { BrSelectId, BrSelectItem, BrSelectSortData } from '../commonUI/BrSelect/types';

export async function fnWait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, duration);
  });
}

/**
 *
 */
export class SquareBrackets {
  static bracketsRemove(str: string): string {
    if (str && str.length > 0) {
      return str.replace('[', '').replace(']', '')
    }
    return str
  }

  static bracketsAdd(str: string): string {
    if (str && str.length > 0) {
      return `[${str}]`
    }
    return str
  }
}

/**
 * Готовит объекты фильтрации на базе текста-для-поиска {@param searchText}, тегов {@param tagGroupSelectedArr}
 * @param source
 * @param tagGroupSelectedArr
 * @param searchText - текст поиска введённый пользователем
 * @param tagsFieldNameArr - описания полей с тегами, см. [220607221651]
 */
export function filtersCreate(
  {
    source,
    tagGroupSelectedArr,
    searchText,
    tagsFieldNameArr,
  }: FiltersCreateParamsType
): MsscFilterType[] {
  let filterTags: MsscFilterType[] = []
  if (!_.isEmpty(tagsFieldNameArr)) {
    tagGroupSelectedArr.map((elTagGroup: MsscTagGroupSelectedType) => {
      const tags = elTagGroup.elems.map((el: RsuvTxChecked) => {
        return el.id
      })
      const filters: MsscFilterType[] = source?.filterFromTags(tags, elTagGroup.id) || []
      filterTags.push(...filters)
    })
  }
  const filterSearchText = source?.filterFromSearchText(searchText) || []
  // ---
  return [...filterTags, ...filterSearchText];
}

/** создаёт массив стандартных объектов описывающих сортировку */
export function sortsCreate(sortData?: BrSelectSortData<MsscColumnNameType>, sortIdCurr?: BrSelectId): RsuvTxSort[] {
  function fnRsuvTxSort(sortItem: BrSelectItem<string>) {
    if (!sortItem.payload) {
      return null;
    } else {
      const columnName = new RsuvTxStringAC(sortItem.payload);
      return new RsuvTxSort(columnName, sortItem.direction as RsuvEnSort);
    }
  }

  let rsuvTxSort0 = null
  let item: BrSelectItem<string> | undefined;
  if (sortIdCurr) {
    item = sortData?.items.find(el => el.idElem === sortIdCurr);
    if (item) {
      rsuvTxSort0 = fnRsuvTxSort(item)
    }
  }
  return rsuvTxSort0 ? [rsuvTxSort0] : [];
}

/**
 * Получение общего количества элементов с учетом фильтров {@param filters}, и всех ids если {@param randomEnabled}
 * is THRUTHY
 * @param source
 * @param filters
 * @param randomEnabled
 * @param sortData
 * @param sortIdCurr
 */
export async function elemsCountByFilterAndIf(
  {
    source,
    filters,
    randomEnabled,
    sortData,
    sortIdCurr,
  }: ElemsCountParamsType
): Promise<ElemsCountReturnType> {
  let elemsCountByFilter: number = 0;
  let ids: string[] = []
  if (randomEnabled) {
    const sorts = sortsCreate(sortData, sortIdCurr)
    ids = await source?.idsAll(filters, sorts) // AWAIT
    if (ids) {
      elemsCountByFilter = ids.length
    }
  } else {
    const elemsCount: RsuvTxNumIntAB = await source?.elemsCountByFilter(filters)
    if (elemsCount) {
      elemsCountByFilter = elemsCount.val;
    }
  }
  return {elemsCountByFilter, ids}
}

export async function tagsCookAndSet(
  {
    tagsFieldNameArr,
    source,
    filters,
    tagGroupSelectedArr,
    $tagGroupArrSet
  }: TagsParamsType
) {
  if (tagsFieldNameArr && tagsFieldNameArr.length > 0) {
    const tagsTotal: MsscTagGroupType[] = [];
    for (let elTg of tagsFieldNameArr) { // LOOP
      let tags = await source?.tags(filters, elTg.fieldName)
      // --- sort
      tags = _.orderBy(tags, ['count', 'value'], ['desc', 'asc'])
      // ---
      const tags0: RsuvTxChecked[] = tags.map(el => {
        return new RsuvTxChecked(el.value, `${el.value} (${el.count})`)
      })
      // ---
      tags0.forEach(elTag => {
        const b1 = tagGroupSelectedArr.find(el => el.id === elTag.id)
        if (b1) {
          elTag.checked = true;
        }
        elTag.visibleText = SquareBrackets.bracketsRemove(elTag.visibleText)
      })
      // ---
      const rr = {id: elTg.id, elems: tags0, visibleName: elTg.visibleName} as MsscTagGroupType
      tagsTotal.push(rr)
    } // LOOP
    $tagGroupArrSet(tagsTotal)
  }
}
