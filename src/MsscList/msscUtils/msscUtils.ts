import { MsscSource } from './MsscSource';
import { MsscTagGroupSelected } from './MsscTagGroupSelected';
import { MsscMultFields } from './MsscMultFields';
import { MsscFilter } from './MsscFilter';
import _ from 'lodash';
import { RsuvTxChecked } from 'rsuv-lib';

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
 * На базе текста-для-поиска {@param searchText} ...
 * @param source
 * @param tagGroupSelectedArr
 * @param searchText - текст поиска введённый пользователем
 * @param tagsFieldNameArr - описания полей с тегами, см. [220607221651]
 */
export function fnFiltersCreate(
  source: MsscSource<any>,
  tagGroupSelectedArr: MsscTagGroupSelected[],
  searchText: string,
  tagsFieldNameArr?: MsscMultFields[],
): MsscFilter[] {
  let filterTags: MsscFilter[] = []
  if (!_.isEmpty(tagsFieldNameArr)) {
    tagGroupSelectedArr.map((elTagGroup: MsscTagGroupSelected) => {
      const tags = elTagGroup.elems.map((el: RsuvTxChecked) => {
        return el.id
      })
      const filters: MsscFilter[] = source?.filterFromTags(tags, elTagGroup.id) || []
      filterTags.push(...filters)
    })
  }
  const filterSearchText = source?.filterFromSearchText(searchText) || []
  // ---
  return [...filterTags, ...filterSearchText];
}
