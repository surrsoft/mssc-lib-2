/**
 * *библиотека - текущая библиотека
 */
export const umsscLIBu = "библиотека";

/**
 * *компонент - главный компонент {@link MsscListFCC} представленный текущей {@link umsscLIBu библиотекой}
 */
export const umsscCOMPONENTu = "компонент";

/**
 * *клиент - внешний клиент, который завязан с {@link umsscLIBu библиотекой} через интерфейс {@link MsscSourceType}.
 * Формируется программистом задействующим {@link umsscLIBu библиотеку}
 */
export const umsscCLIENTu = "клиент";

/**
 * - *источник, *source
 * - сущность {@link umsscCLIENTu клиента} имплементирующая интерфейс {@link MsscSourceType}.
 *
 * Передаётся в обязательный пропс `source` {@link umsscCOMPONENTu компонента} .
 *
 * По запросу {@link umsscLIBu библиотеки}, *источник предоставляет разные данные и в том числе готовую JSX разметку
 * отдельного элемента списка.
 *
 * - в составе текущей библиотеке поставляются готовые имплементации
 * - имплементация для сервиса Airtable - см. класс `AirSource`. Для использования, нужно прописать
 * `Airtable API key` в переменной окружения `REACT_APP_AIRTABLE_KEY` вашего проекта,
 * например `REACT_APP_AIRTABLE_KEY=keyzbjKNgs51lb9D4` в вашем файле `.env.local`
 * - `AirSource` принимает в конструктор тип `AirSourceParams`
 */
export const umsscSOURCEu = "источник";
