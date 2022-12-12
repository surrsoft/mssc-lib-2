
# Запуски
- запускаем JSON-сервер `npm run json-server-start` или `make json-server-start`
  - должен быть установлен глобально `json-server` - `npm install -g json-server`
  - в проекте должен быть файл `jsonServer/db-01.json`
- запускаем Storybook `npm run storybook` или `make storybook_start`
- если необходимо, с помощью `npm run rollup` билдим библиотеку `MsscList`

# .env.local
```
REACT_APP_AIRTABLE_KEY=<value>
REACT_APP_VNCZ_ENABLED=true
```

# Публикация
- выполняем билд и публикацию с помощью `npm run rollup && npm publish`

# Описание
- точка входа это компонент `MsscListFCC`
  - пропсы:
    - `source` - обязательный, сюда нужно передать *источник
    - `listElemStruct` - сюда нужно передать *е-билдер
    - `children` или тело - сюда нужно передать *г-билдер (паттерн `render props`)
    - `sortData` - структура, предоставив которую, у *компонента появится выпадающий список с пунктами для сортировки
    - `tagsFieldNameArr` - 
- из *источника *библиотека берёт всю необходимую ей информацию, в том числе, *источник предоставляет ей, по запросу, JSX каждого отдельного элемента списка  

# Понятия
- *клиент - клиент текущей *библиотеки, тот кто её использует
- *библиотека - текущая библиотека
- *компонент - главный компонент (`MsscListFCC`) представленный текущей *библиотекой
- *источник, *source - сущность имплементирующая интерфейс `MsscSource`. Передаётся в обязательный пропс `source` компонента `MsscListFCC`. По запросу *библиотеки, *источник предоставляет, в том числе, готовую JSX разметку отдельного элемента списка  
  - в составе текущей библиотеке поставляются готовые имплементации 
    - имплементация для сервиса Airtable - см. класс `AirSource`. Для использования, нужно прописать `Airtable API key` в переменной окружения `REACT_APP_AIRTABLE_KEY` вашего проекта, например `REACT_APP_AIRTABLE_KEY=keyzbjKNgs51lb9D4` в вашем файле `.env.local`
      - `AirSource` принимает в конструктор тип `AirSourceParams` 
- интерфейс `MsscSource` - 
  - *с-элемент, *s-element, [[221204121005]] - информация об отдельном элементе *источника в виде типа `VanxElemType`. Содержит идентификатор, JSX-разметку и объект-модель
- *г-билдер - колбэк, паттерн 'render props'. Передаём его как children для `MsscListFCC`. Получает на вход *г-объект и должен вернуть JSX-разметку, представляющую структуру всего компонента `MsscListFCC`, составленную из желаемых сущностей взятых из *г-объекта
  - пример простейшего *г-билдера
    ```typescript
    const contentRenderProps = ({listJsx}: MsscJsxExternal) => {
      return (
        <div>{listJsx}</div>
      )
    }
    ```
- *г-объект - это объект передаваемый библиотекой в *г-билдер. Тип `MsscJsxExternal`
- *е-билдер - колбэк, паттерн 'render props'. Передаётся в пропс `listElemStruct`. Получает от библиотеки на вход *е-объект и должен вернуть JSX-разметку, представляющую структуру отдельного элемента списка, составленную из сущностей взятых из *е-объекта
- *е-объект, [[221204121706]] - это объект передаваемый библиотекой в *е-билдер. Тип `MsscElemStruct`
- *тег-группа - группа тегов. Определяется типом `MsscMultFieldsType`. Сколько *клиент укажет *тег-групп, столько будет выпадющих списков тегов


# Места
* диалог создания/редактирования
  * [220129101243] - где он определяется
  * обработчик ОК - [220128213044]
* диалог удаления
  * обработчики - [220128215639]
* элемент списка (контейнер)
  * меню
    * [220129111758] - обработчики
  * чекбокс
    * [220129135526] - обработчики
* [220129145117] - панель кнопок (удалить, создать, сбросить все чекбоксы)
  * [220129214739] - выпадающий список выбора сортировки
  * [220130103738] - поле поиска
    * [220130110028] - обработчик
    * [220130145735] - вызов метода *клиента
  * [220130202258] - кнопка 'random'
    * [220130202338] - обработчик
* теги
  * [220211130543] - обработчик

# Разное
* техника [[asau69]] - возврат номера страницы если запрос данных был неудачным
  * помимо нового номера страницы, храним также старый номер. Если запрос данных оказался неудачным, возвращаемся к старому номеру
