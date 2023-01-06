/**
 * *библиотека - текущая библиотека
 */
export const umsscLIBu = "библиотека";

/**
 * *компонент - главный компонент {@link MsscListFCC} представленный текущей {@link umsscLIBu библиотекой}
 */
export const umsscCOMPONENTu = "компонент";

/**
 * *интерфейс - это ключевой интерфейс *библиотеки - {@link MsscSourceType}
 */
export const umsscINTERFu = "интерфейс";

/**
 * *клиент - это пользователь (программист) который использует *библиотеку - в том числе её *компонент, *интерфейс.
 *
 * Ответственностью *клиента является формирование {@link umsscSOURCEu источника}.
 */
export const umsscCLIENTu = "клиент";

/**
 * - *источник, *source
 * - сущность имплементурующая интерфейс {@link MsscSourceType}
 * - создаётся {@link umsscCLIENTu клиентом} и передаётся на вход {@link umsscCOMPONENTu компоненту} через пропс `source`
 *
 * По запросу {@link umsscCOMPONENTu компонента}, *источник предоставляет разные данные и в том числе
 * готовую JSX разметку отдельного элемента списка.
 *
 * - в составе текущей библиотеке поставляются готовые имплементации
 * - имплементация для сервиса Airtable - см. класс `AirSource`. Для использования, нужно прописать
 * `Airtable API key` в переменной окружения `REACT_APP_AIRTABLE_KEY` вашего проекта,
 * например `REACT_APP_AIRTABLE_KEY=keyzbjKNgs51lb9D4` в вашем файле `.env.local`
 * - `AirSource` принимает в конструктор тип `AirSourceParams`
 */
export const umsscSOURCEu = "источник";

/**
 * *группа-тегов, *т-группа
 *
 * коротко-отрывки - выпадающие списки тегов;
 *
 * {@link umsscCLIENTu клиент} формирует массив из 0+ *т-групп и передаёт на вход в {@link umsscCOMPONENTu компонент}
 * (пропс `tagsFieldNameArr`)
 *
 * описывается типом {@link MsscTagGroupType}
 */
export const umsscTAGGROUPu = "группа-тегов";
