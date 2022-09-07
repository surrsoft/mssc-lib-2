import { RsuvTxChecked, RsuvTxStringAB, RsuvTxStringAC } from 'rsuv-lib';
import { MsscSourceType } from './MsscSourceType';
import { BrSelectSortData } from '../commonUI/BrSelect/types';
import { MsscListAreaHeightCls } from '../classes';

export interface MsscFilterType {
  /**
   * Интерпретируется по разному в зависимости от *источника, например как "имя поля таблицы"
   */
  paramId: RsuvTxStringAC
  /**
   * Интерпретируется по разному в зависимости от *источника
   */
  paramIdB?: string,
  /**
   *
   */
  filterValue?: any
  /**
   * Если truthy то значит этот фильтр относится к поиску значения (filterValue) в массиве значений, по полному
   * совпадению
   */
  isArrElemFind?: boolean
}

/**
 * Тип представляющий *с-элемент
 */
export interface MsscElemType {
  /** идентификатор */
  id: RsuvTxStringAB
  /** JSX элемента */
  elem: JSX.Element
  /** модель элемента */
  elemModel: object
}

export function isMsscElemType(data: any): data is MsscElemType {
  return !!(data && data.id && data.elem && data.elemModel && data.id.bnuwIsValid()?.success);
}

/**
 * Представление для: "имя значения" (тега) + "количество таких значений"
 */
export class MsscTagType {
  value: string
  count: number

  // не использованы public прямо в конструкторе потому, что Typescript в Storybook не понимает такой синтаксис
  constructor(value: string, count: number) {
    this.value = value
    this.count = count
  }
}

/**
 * имя колонки таблицы БД
 */
export type MsscColumnNameType = string

/**
 * Параметры специфичные для многих *источников
 */
export class MsscCommonSourceParamsType<T> {
  /**
   * Должен вернуть JSX.Element для элемента списка.
   * Если не указан - возвращается дефолтный JSX.Element вида <div>```id```</div>
   * @param obj (1) -- модель данных для формирования JSX.Element
   */
  elemJsx?: (obj: object) => JSX.Element
  /**
   * Диалог создания/редактирования элемента. Будет ретранслирован *клиенту. Если initialValues is truthy, то это будет означать работу в режиме редактирования, иначе в режиме создания
   */
  dialogCreateEditJsx?: (cbOk: (model: T) => void, cbCancel: () => void, initialValues?: object) => Promise<JSX.Element>
  /**
   * см. [220129122002]
   * если указан, будет использован вместо прописанного в текущем классе дефолтного
   */
  dialogMiddleware?: (obj: T) => object | T | null
  /**
   * на базе (1) нужно сформировать MsscFilter (см. [220509113255])
   */
  cbFilterFromSearchText?: (searchText: string) => MsscFilterType[] | null
  /**
   * на базе тегов (1) нужно сформировать MsscFilter (см. [220514092623]).
   */
  cbFilterFromTags?: (tags: string[], fieldName: string) => MsscFilterType[] | null
}

/**
 * Режимы от которых зависит высота области прокрутки списка
 */
export enum MsscEnListAreaHeightModeEnum {
  /**
   * область прокрутки списка будет фиксированной высоты, той которая указана здесь в поле 'value'
   */
  FIXED = 'fixed',
  /**
   *  высота области прокрути будет подстраиваться под высоту экрана браузера за вычетом значения указанного здесь в поле 'value' (чтобы учесть наличие других элементов на экране)
   */
  STICKY_DOWN = 'sticky-down',
}

/** представляет *е-объект */
export type MsscElemStructType = {
  isActive?: boolean,
  checkboxJsx?: JSX.Element,
  bodyJsx?: JSX.Element,
  menuJsx?: JSX.Element
}

export enum MsscMenuActionEnum {
  EDIT = 'edit',
  SELECT = 'select',
  DELETE = 'delete'
}

/**
 * Представление *г-объекта. Сущность этого типа, *компонент предоставляет *клиенту, чтобы он разместил элементы так как ему нужно
 */
export interface MsscJsxExternalType {
  /** главный элемент - непосредственно сам список элементов */
  listJsx?: JSX.Element
  infosJsx?: JSX.Element
  paginator1Jsx?: JSX.Element
  paginator2Jsx?: JSX.Element
  /**
   * Объект с JSX-ами кнопок "Удалить", "Создать", "Сбросить все выделения", "Случайный порядок"
   */
  buttonsJsx?: {
    /**
     * Кнопка "Удалить"
     */
    btnDelete?: JSX.Element,
    /**
     * Кнопка "Создать"
     */
    btnCreate?: JSX.Element,
    /**
     * Кнопка "Сбросить все выделения"
     */
    btnDeselectAll?: JSX.Element,
    /**
     * Кнопка "Случайный порядок"
     */
    btnDice?: JSX.Element,
  }
  sortJsx?: JSX.Element
  searchJsx?: JSX.Element
  multiselectJsxArr?: JSX.Element[]
}

/** Тип представляющий *тег-группу */
export type MsscMultFieldsType = {
  /** идентификатор *тег-группы */
  id: MsscTagsGroupIdType
  fieldName: string
  visibleName: string
}

/** Пропсы для MsscListFCC */
export interface MsscListPropsType {
  /**
   *
   */
  source: MsscSourceType<any> | null
  /** */
  sortData?: BrSelectSortData<MsscColumnNameType>
  /**
   * *клиент определяет как должны распологаться элементы отдельного элемента списка
   * @param checkboxJsx
   * @param bodyJsx
   * @param menuJsx
   */
  listElemStruct?: ({
                      checkboxJsx,
                      bodyJsx,
                      menuJsx
                    }: MsscElemStructType) => JSX.Element
  children?: any
  /**
   * [[220607221651]] Описание полей содержащих теги. Сколько здесь будет элементов, столько будет показываться
   * выпадающих списков
   */
  tagsFieldNameArr?: MsscMultFieldsType[],
  /**
   * Высота области прокрутки списка
   */
  listAreaHeight?: MsscListAreaHeightCls
}

/**
 * идентификатор группы тегов
 */
export type MsscTagsGroupIdType = string

/**
 * Представляет *группу-тегов всех
 */
export type MsscTagGroupType = {
  id: MsscTagsGroupIdType
  /**
   * сами теги
   */
  elems: RsuvTxChecked[]
  /**
   *
   */
  visibleName: string
}

/**
 * Представляет *группу-тегов выбранных
 */
export type MsscTagGroupSelectedType = {
  id: MsscTagsGroupIdType
  /**
   * сами теги
   */
  elems: RsuvTxChecked[]
}

/**
 * Любой объект обладающий полем `id`
 */
export type MsscIdObjectType = { id: string, [key: string]: any }

export interface FiltersCreateParamsType {
  source: MsscSourceType<any>,
  tagGroupSelectedArr: MsscTagGroupSelectedType[],
  /** текст введённый пользователем в строку поиска */
  searchText: string,
  tagsFieldNameArr?: MsscMultFieldsType[],
}

/** входные параметры функции {@link elemsCountByFilterAndIf} */
export interface ElemsCountParamsType {
  source: MsscSourceType<any>,
  filters: MsscFilterType[],
  randomEnabled: boolean,
  sortData?: BrSelectSortData<MsscColumnNameType>,
  sortIdCurr?: string,
}

export interface ElemsCountReturnType {
  elemsCountByFilter: number,
  /** id всех элементов, используется в random-режиме */
  ids: string[]
}

export interface TagsParamsType {
  /** см. [220607221651] */
  tagsFieldNameArr?: MsscMultFieldsType[],
  source: MsscSourceType<any>,
  filters: MsscFilterType[],
  tagGroupSelectedArr: MsscTagGroupSelectedType[],
  $tagGroupArrSet: any,
}
