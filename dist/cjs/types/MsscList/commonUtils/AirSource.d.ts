import { MsscIdObject, MsscSource } from '../msscUtils/MsscSource';
import { RsuvEnResultCrudSet, RsuvResultBoolPknz, RsuvResultTibo, RsuvTxNumIntAB, RsuvTxNumIntDiap, RsuvTxSort } from 'rsuv-lib';
import { MsscFilter } from '../msscUtils/MsscFilter';
import { MsscElem } from '../msscUtils/MsscElem';
import { MsscTag } from '../msscUtils/MsscTag';
export declare class AirSourceParams<T> {
    dbKey: string;
    tableName: string;
    columns: string[];
    /**
     * Должен вернуть JSX.Element для элемента списка.
     * Если не указан - возвращается дефолтный JSX.Element вида <div>```id```</div>
     * @param obj (1) -- модель данных для формирования JSX.Element
     */
    elemJsx?: (obj: object) => JSX.Element;
    /**
     * Диалог создания/редактирования элемента. Будет ретранслирован *клиенту
     */
    dialogCreateEditJsx?: (cbOk: (model: T) => void, cbCancel: () => void, initialValues?: object) => Promise<JSX.Element>;
    /**
     * см. [220129122002]
     * если указан, будет исползован вместо прописанного в текущем классе дефолтного
     */
    dialogMiddleware?: (obj: T) => object | T | null;
    /**
     * на базе (1) нужно сформировать MsscFilter
     */
    cbFilterFromSearchText?: (searchText: string) => MsscFilter[] | null;
    /**
     * на базе тегов (1) нужно сформировать MsscFilter
     */
    cbFilterFromTags?: (tags: string[], fieldName: string) => MsscFilter[] | null;
}
/**
 * Имплементация {@link MsscSource} для источника "airtable.com"
 */
export declare class AirSource<T> implements MsscSource<T> {
    params: AirSourceParams<T>;
    private connector;
    constructor(params: AirSourceParams<T>);
    dialogCreateOrEdit(cbOk: (model: T) => void, cbCancel: () => void, initialValues?: object): Promise<JSX.Element>;
    private fnFilterSort;
    idsAll(filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<string[]>;
    elemsById(ids: MsscIdObject[]): Promise<MsscElem[]>;
    elems(indexDiap: RsuvTxNumIntDiap, filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<MsscElem[]>;
    private toMsscElems;
    elemsAdd(elems: T[]): Promise<Array<RsuvResultBoolPknz | T>>;
    elemsCountByFilter(filters: MsscFilter[]): Promise<RsuvTxNumIntAB>;
    elemsDelete(elems: MsscIdObject[]): Promise<MsscIdObject[]>;
    elemsSet(elems: T[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>>;
    elemsUpsert(elems: T[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>>;
    dialogMiddleware(obj?: T): object | T | null;
    filterFromSearchText(searchText: string): MsscFilter[] | null;
    filterFromTags(tags: string[], fieldName: string): MsscFilter[] | null;
    tags(filters: MsscFilter[], fieldName: string): Promise<MsscTag[]>;
}
