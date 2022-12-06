/**
 * *компонент - главный компонент (`MsscListFCC`) представленный текущей *библиотекой
 */
export const umssccomponentu = 'компонент'
/**
 * *клиент - то кто реализует интефрейс {@link MsscSourceType}
 */
export const umsscclientu = 'клиент'

/**
 * - *источник, *source - сущность имплементирующая интерфейс {@link MsscSourceType}.
 * Передаётся в обязательный пропс `source` компонента {@link MsscListFCC}.
 * По запросу *библиотеки, *источник предоставляет, в том числе, готовую JSX разметку отдельного элемента списка
 *   - в составе текущей библиотеке поставляются готовые имплементации
 *     - имплементация для сервиса Airtable - см. класс `AirSource`. Для использования, нужно прописать `Airtable API key` в переменной окружения `REACT_APP_AIRTABLE_KEY` вашего проекта, например `REACT_APP_AIRTABLE_KEY=keyzbjKNgs51lb9D4` в вашем файле `.env.local`
 *       - `AirSource` принимает в конструктор тип `AirSourceParams`
 */
export const umsscsourceu = 'источник'

/**
 * *библиотека - текущая библиотека
 */
export const umssclibu = 'библиотека'
