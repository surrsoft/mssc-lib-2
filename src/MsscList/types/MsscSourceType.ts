import {
  RsuvEnResultCrudSet,
  RsuvResultBoolPknz,
  RsuvResultTibo,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort,
} from "rsuv-lib";

import { MsscElemType } from "./types/MsscElemType";
import { MsscFilterType } from "./types/MsscFilterType";
import { MsscIdObjectType } from "./types/MsscIdObjectType";
import { MsscSourceDialogCreateOrEditType } from "./types/MsscSourceDialogCreateOrEditType";
import { MsscSourceElemsDeleteType } from "./types/MsscSourceElemsDeleteType";
import { MsscTagCls } from "./types/MsscTagCls";
import { MsscFieldNameType } from './types/MsscTagGroupType';
import { MsscTagsGroupIdType } from './types/MsscTagsGroupIdType';

/**
 * Интерфейс {@link umsscSOURCEu источника}. Через него {@link umsscCOMPONENTu компонент} получает почти всю нужную
 * ему информацию
 */
export interface MsscSourceType<TModel> {
  /**
   * SHORT DESC Возвращает общее количество элементов или, если {@link filters} не пустой, количество элементов
   * удовлетворяющих фильтру.
   *
   * @param filters
   */
  elemsCountByFilter: (filters: MsscFilterType[]) => Promise<RsuvTxNumIntAB>;

  /**
   * Должен вернуть элементы удовлетворяющие фильтрам (2) с сортировкой согласно (3) в количестве (1)
   *
   * @param indexDiap (1) -- начальный и конечный индексы, рассматриваются "включительно", т.е. например для
   * диапазона [0..1] должно вернуться 2 элемента (при условии что в хранилище элементов больше одного)
   * @param filters (2) -- если пустой массив, то не применяется
   * @param sorts (3) -- если пустой массив, то не применяется
   */
  elems: (
    indexDiap: RsuvTxNumIntDiap,
    filters: MsscFilterType[],
    sorts: RsuvTxSort[]
  ) => Promise<MsscElemType[]>;

  /**
   * Возвращает элементы соответствующие ids из (1).
   *
   * Для не найденных элементов в ячейке итогового массива будет значение null
   * @param ids
   */
  elemsById: (ids: MsscIdObjectType[]) => Promise<Array<MsscElemType | null>>;

  /**
   * SHORT DESC Создаёт записи для элементов из (1).
   *
   * Должен добавить элементы (1) в конец списка. Перед добавлением элемента, должен проверить нет ли уже
   * существующего такого элемента, поиском по id; если уже есть - ничего не делать.
   *
   * Должен возвращать список той же длины что (1), с теми же элементами, но в месте
   * расположения элементов для которых не удалось создать запись (или для которых запись уже существует),
   * должен содержаться объект {@link RsuvResultBoolPknz} с информацией о причинах проблемы.
   * У элементов для которых удалось создать запись, должно быть поле id с индентификатором созданной записи
   *
   * @param elems (1) --
   */
  elemsAdd: (elems: TModel[]) => Promise<Array<TModel | RsuvResultBoolPknz>>;

  /**
   * Должен удалить записи соответствующие элементам из (1).
   * Должен вернуть пустой массив если все элементы были успешно удалены,
   * или список тех элементов (1) записи которых удалить не удалось.
   * @param elems (1) -- любой объект обладающий полем `id`
   */
  elemsDelete: MsscSourceElemsDeleteType;

  /**
   * Выполняет set operation (см. [asau138]) для элементов из (1).
   *
   * Должен вернуть массив той же длины, что и (1) но со
   * специальными объектами описывающими результат операции для каждого элемента - был ли обновлен существующий элемент,
   * или был создан новый или произошла ошибка (в случае ошибки у объекта {@link RsuvResultTibo}
   * заполнены поля `errCode`, `errMessage`). Расположение объектов-результатов
   * соответствует расположению исходных объектов
   *
   * @param elems
   */
  elemsSet: (
    elems: TModel[]
  ) => Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>>;

  /**
   * Должен выполнить upsert operation (см. [asau140]) для элементов из (1).
   *
   * Должен вернуть массив той же длины, что и (1) но со
   * специальными объектами описывающими результат операции для каждого элемента - был ли обновлен существующий элемент,
   * или был создан новый или произошла ошибка (в случае ошибки у объекта {@link RsuvResultTibo}
   * заполнены поля `errCode`, `errMessage`). Расположение объектов-результатов
   * должно соответствовать расположению исходных объектов
   *
   * @param elems
   */
  elemsUpsert: (
    elems: TModel[]
  ) => Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>>;

  /**
   * Должен вернуть JSX диалога создания или редактирования.
   *
   * Должен вернуть диалог создания элемента если (3) is falsy, иначе вернуть диалог редактирования элемента.
   * {@link umsscCOMPONENTu компонент} показывает его. Когда пользователь нажимает ОК вызывается (1)
   * с моделью данных в аргументе
   * @param cbOk (1) -- колбэк, который *клиент должен вызвать по нажатию ОК
   * @param cbCancel (2) -- колбэк, который *клиент должен вызвать по нажатию Cancel
   * @param initialValues (3) -- начальные данные для диалога редактирования
   */
  dialogCreateOrEdit: MsscSourceDialogCreateOrEditType<TModel>;

  /**
   * {@link umsscCOMPONENTu компонент} вызывает эту функцию чтобы подготовить объект (1) к передаче в диалог
   * создания/редактирования ({@link dialogCreateOrEdit})
   * ID [[220129122002]]
   * @param obj (1) --
   */
  dialogMiddleware: (obj?: TModel) => object | TModel | null;

  /**
   * [[220509113255]] {@link umsscCOMPONENTu компонент} вызывает эту функцию чтобы {@link umsscSOURCEu источник}
   * на базе (1) подготовил {@link MsscFilterType[]}
   * @param searchText текст который пользовтаель ввёл в поисковый инпут
   */
  filterFromSearchText: (searchText: string) => MsscFilterType[] | null;

  /**
   * [[220514092623]] {@link umsscCOMPONENTu компонент} вызывает эту функцию чтобы {@link umsscSOURCEu источник}
   * на базе тегов (1) подготовил {@link MsscFilterType[]}
   * @param tagValues (1) -- значения тегов
   * @param tagGroupId (2) -- идентификатор *т-группы {@link umsscTAGGROUPu}
   */
  filterFromTags: (
    tagValues: string[],
    tagGroupId: MsscTagsGroupIdType
  ) => MsscFilterType[] | null;

  /**
   * Получение ID всех элементов хранилища удовлетворяющих (1) и (2). Требуется только для random-режима
   * @param filters (1) -- пустой или не пустой массив
   * @param sorts (2) --пустой или не пустой массив
   */
  idsAll: (filters: MsscFilterType[], sorts: RsuvTxSort[]) => Promise<string[]>;

  /**
   * Должен вернуть теги (то есть значения поля (2) {@link umsscSOURCEu источника}) для виджета тегов, после
   * фильтрации всех данных по (1)
   *
   * @param filters (1) --
   * @param fieldName (2) -- поле {@link umsscSOURCEu источника} в котором нужно искать теги.
   * {@link umsscCOMPONENTu компонент} его берёт из {@link umsscTAGGROUPu т-группы}
   */
  tags: (
    filters: MsscFilterType[],
    fieldName: MsscFieldNameType
  ) => Promise<MsscTagCls[]>;
}
