import {
  RsuvEnResultCrudSet,
  RsuvResultBoolPknz,
  RsuvResultTibo,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort
} from 'rsuv-lib';
import { MsscElem } from './MsscElem';
import { MsscFilter } from './MsscFilter';
import { MsscTag } from './MsscTag';

export interface MsscSource<TModel> {

  /**
   * Возвращает общее количество элементов удовлетворяющих фильтрам (1). Если (1) это пустой массив то возвращает
   * просто общее количество элементов
   * @param filters
   */
  elemsCountByFilter(filters: MsscFilter[]): Promise<RsuvTxNumIntAB>

  /**
   * Возвращает элементы из диапазона (1) удовлетворяющие фильтрам (2) с сортировкой согласно (3)
   *
   * @param indexDiap (1) -- начальный и конечный индексы рассматриваются "включительно", т.е. например для
   * диапазона [0..1] должно вернуться 2 элемента (при условии что в хранилище элементов больше одного)
   * @param filters (2) -- если пустой массив, то не применяется
   * @param sorts (3) -- если пустой массив, то не применяется
   */
  elems(indexDiap: RsuvTxNumIntDiap, filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<MsscElem[]>

  /**
   * Возвращает элементы соответствующие id (1). Для не найденных элементов в ячейке итогового массива будет
   * значение null
   * @param ids
   */
  elemsById(ids: MsscIdObject[]): Promise<MsscElem[]>

  /**
   * Создаёт записи для элементов из (1).
   *
   * Возвращает список той же длины что (1), с теми же элементами, но в месте
   * расположения элементов для которых не удалось создать запись, будет содержаться объект {@link RsuvResultBoolPknz}
   * с информацией о причинах проблемы.
   * У элементов для которых удалось создать запись, будет поле id с индентификатором созданной записи
   *
   * @param elems (1) --
   */
  elemsAdd(elems: TModel[]): Promise<Array<TModel | RsuvResultBoolPknz>>

  /**
   * Удаляет записи соответствующие элементам из (1).
   * Возвращает пустой массив если все элементы были успешно удалены,
   * или список тех элементов (1) записи которых удалить не удалось.
   * @param elems (1) -- любой объект обладающий полем `id`
   */
  elemsDelete(elems: MsscIdObject[]): Promise<MsscIdObject[]>

  /**
   * Выполняет set operation (см. [asau45]) для элементов из (1).
   *
   * Возвращает массив той же длины, что и (1) но со
   * специальными объектами описывающими результат операции для каждого элемента - был ли обновлен существующий элемент,
   * или был создан новый или произошла ошибка (в случае ошибки у объекта {@link RsuvResultTibo}
   * заполнены поля `errCode`, `errMessage`). Расположение объектов-результатов
   * соответствует расположению исходных объектов
   *
   * @param elems
   */
  elemsSet(elems: TModel[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>>

  /**
   * Выполняет upsert operation (см. [asau46]) для элементов из (1).
   *
   * Возвращает массив той же длины, что и (1) но со
   * специальными объектами описывающими результат операции для каждого элемента - был ли обновлен существующий элемент,
   * или был создан новый или произошла ошибка (в случае ошибки у объекта {@link RsuvResultTibo}
   * заполнены поля `errCode`, `errMessage`). Расположение объектов-результатов
   * соответствует расположению исходных объектов
   *
   * @param elems
   */
  elemsUpsert(elems: TModel[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>>

  /**
   * Возвращает диалог создания элемента если (3) is truthy, иначе возвращает диалог редактирования элемента.
   * *С-компонент показывает его. Когда пользователь нажимает ОК вызывается (1)
   * с моделью данных в аргументе
   * @param cbOk (1) -- колбэк, который *клиент должен вызвать по нажатию ОК
   * @param cbCancel (2) -- колбэк, который *клиент должен вызвать по нажатию Cancel
   * @param initialValues (3) --
   */
  dialogCreateOrEdit(cbOk: (model: TModel) => void, cbCancel: () => void, initialValues?: object): Promise<JSX.Element>

  /**
   * *С-компонент вызывает эту функцию чтобы подготовить объект (1) к передаче в диалог создания/редактирования
   * ID [[220129122002]]
   * @param obj (1) --
   */
  dialogMiddleware(obj?: TModel): object | TModel | null;

  /**
   * *С-компонент вызывает эту функцию чтобы *клиент на базе (1) подготовил {@link MsscFilter[]}
   * @param searchText
   */
  filterFromSearchText(searchText: string): MsscFilter[] | null

  /**
   * *С-компонент вызывает эту функцию чтобы *клиент на базе тегов (1) подготовил {@link MsscFilter[]}
   * @param tags (1) --
   * @param fieldName (2) --
   */
  filterFromTags(tags: string[], fieldName: string): MsscFilter[] | null

  /**
   * получение ID всех элементов хранилища удовлетворяющих (1) и (2)
   * @param filters (1) -- пустой или не пустой массив
   * @param sorts (2) --пустой или не пустой массив
   */
  idsAll(filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<string[]>

  /**
   * возвращает теги (значения поля (2)) для виджета тегов
   * @param filters (1) --
   * @param fieldName (2) --
   */
  tags(filters: MsscFilter[], fieldName: string): Promise<MsscTag[]>
}

/**
 * Любой объект обладающий полем `id`
 */
export type MsscIdObject = { id: string, [key: string]: any }
