import {
  RsuvEnResultCrudSet,
  RsuvResultBoolPknz,
  RsuvResultTibo,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort,
} from "rsuv-lib";

import { VanxElemType } from "./types/VanxElemType";
import { VanxFilterType } from "./types/VanxFilterType";
import { VanxIdObjectType } from "./types/VanxIdObjectType";
import { VanxSourceDialogCreateOrEditType } from "./types/VanxSourceDialogCreateOrEditType";
import { VanxSourceElemsDeleteType } from './types/VanxSourceElemsDeleteFnType';
import { VanxTagType } from "./types/VanxTagType";

/**
 * [vanx]-интерфейс
 */
export interface VanxSourceType<TModel> {
  /**
   * DESC Возвращает сколько всего *элементов в *списке или сколько *элементов удовлетворяющих указанным фильтрам.
   *
   * Должен вернуть сколько в {@link uvanxLISTu списке} есть элементов удовлетворяющих
   * фильтрам {@param filters}.
   * Если {@param filters} это пустой массив, то должен вернуть общее кол-во элементов.
   *
   * @param filters
   */
  elemsCountByFilter: (filters: VanxFilterType[]) => Promise<RsuvTxNumIntAB>;

  /**
   * DESC Из *элементов удовлетворяющие фильтрам (2), возвращает элементы из диапазона (1), с сортировкой согласно (3)
   *
   * @param indexDiap (1) -- начальный и конечный индексы, рассматриваются "включительно", т.е. например для
   * диапазона [0..1] должно вернуться 2 элемента (при условии что в хранилище элементов больше одного)
   * @param filters (2) -- если пустой массив, то не применяется
   * @param sorts (3) -- если пустой массив, то не применяется
   */
  elems: (
    indexDiap: RsuvTxNumIntDiap,
    filters: VanxFilterType[],
    sorts: RsuvTxSort[]
  ) => Promise<Array<VanxElemType<TModel>>>;

  /**
   * DESC Возвращает элементы соответствующие ids (1).
   *
   * Для не найденных элементов в ячейке итогового массива должно быть значение null
   * @param ids
   */
  elemsById: (ids: VanxIdObjectType[]) => Promise<Array<VanxElemType<TModel> | null>>;

  /**
   * Создаёт записи для элементов из (1).
   *
   * Возвращает список той же длины что (1), с теми же элементами, но в месте
   * расположения элементов для которых не удалось создать запись, должен содержаться объект {@link RsuvResultBoolPknz}
   * с информацией о причинах проблемы.
   * У элементов для которых удалось создать запись, будет поле id с индентификатором созданной записи
   *
   * // TODO как быть если элемент с указанным ID уже существует ?
   *
   * @param elems (1) --
   */
  elemsAdd: (elems: TModel[]) => Promise<Array<TModel | RsuvResultBoolPknz>>;

  /**
   * Удаляет записи соответствующие элементам из (1).
   * Возвращает пустой массив если все элементы были успешно удалены,
   * или список тех элементов (1) записи которых удалить не удалось.
   * @param elems (1) -- любой объект обладающий полем `id`
   */
  elemsDelete: VanxSourceElemsDeleteType;

  /**
   * Выполняет set operation (см. [asau138]) для элементов из (1).
   *
   * Возвращает массив той же длины, что и (1) но со
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
   * Выполняет upsert operation (см. [asau140]) для элементов из (1).
   *
   * Возвращает массив той же длины, что и (1) но со
   * специальными объектами описывающими результат операции для каждого элемента - был ли обновлен существующий элемент,
   * или был создан новый или произошла ошибка (в случае ошибки у объекта {@link RsuvResultTibo}
   * заполнены поля `errCode`, `errMessage`). Расположение объектов-результатов
   * соответствует расположению исходных объектов
   *
   * @param elems
   */
  elemsUpsert: (
    elems: TModel[]
  ) => Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>>;

  /**
   * Должен вернуть JSX диалога создания или редактирования.
   *
   * Возвращает диалог создания элемента если (3) is falsy, иначе возвращает диалог редактирования элемента.
   * *С-компонент показывает его. Когда пользователь нажимает ОК вызывается (1)
   * с моделью данных в аргументе
   * @param cbOk (1) -- колбэк, который *клиент должен вызвать по нажатию ОК
   * @param cbCancel (2) -- колбэк, который *клиент должен вызвать по нажатию Cancel
   * @param initialValues (3) -- начальные данные для диалога редактирования
   */
  dialogCreateOrEdit: VanxSourceDialogCreateOrEditType<TModel>;

  /**
   * {@link umsscCOMPONENTu компонент} вызывает эту функцию чтобы подготовить объект (1) к передаче в диалог создания/редактирования ({@link dialogCreateOrEdit})
   * ID [[220129122002]]
   * @param obj (1) --
   */
  dialogMiddleware: (obj?: TModel) => object | TModel | null;

  /**
   * [[220509113255]] {@link umsscCOMPONENTu компонент} вызывает эту функцию чтобы {@link umsscCLIENTu клиент}
   * на базе (1) подготовил {@link VanxFilterType[]}
   * @param searchText
   */
  filterFromSearchText: (searchText: string) => VanxFilterType[] | null;

  /**
   * [[220514092623]] {@link umsscCOMPONENTu компонент} вызывает эту функцию чтобы {@link umsscCLIENTu клиент}
   * на базе тегов (1) подготовил {@link VanxFilterType[]}
   * @param tags (1) --
   * @param fieldName (2) -- поле в котором нужно искать теги (1)
   */
  filterFromTags: (
    tags: string[],
    fieldName: string
  ) => VanxFilterType[] | null;

  /**
   * Получение ID всех элементов хранилища удовлетворяющих (1) и (2). Требуется только для random-режима
   * @param filters (1) -- пустой или не пустой массив
   * @param sorts (2) --пустой или не пустой массив
   */
  idsAll: (filters: VanxFilterType[], sorts: RsuvTxSort[]) => Promise<string[]>;

  /**
   * Возвращает теги (значения поля (2)) для виджета тегов, после фильтрации всех данных по (1)
   * @param filters (1) --
   * @param fieldName (2) -- поле в котором нужно искать теги
   */
  tags: (
    filters: VanxFilterType[],
    fieldName: string
  ) => Promise<VanxTagType[]>;
}
