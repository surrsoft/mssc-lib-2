* точка входа это компонент `MsscListFCC`
* в его обязательный пропс `source` нужно передать *источник
* в тело `MsscListFCC` нужно передать *г-билдер (паттерн `render props`)

# Понятия
- источник, source - сущность имплементирующая интерфейс `MsscSource`. Передаётся в обязательный пропс `source` компонента `MsscListFCC` 
  - в составе текущей библиотеке поставляются готовые имплементации 
    - имплементация для сервиса Airtable - см. класс `AirSource`. Для использования, нужно прописать `Airtable API key` в переменной окружения `REACT_APP_AIRTABLE_KEY` вашего проекта, например `REACT_APP_AIRTABLE_KEY=keyzbjKNgs51lb9D4` в вашем файле `.env.local`
- г-билдер - колбэк, паттерн 'render props'. Передаём его как children для `MsscListFCC`. Принимает на вход *г-объект и должен вернуть JSX-разметку составленную из желаемых сущностей взятых из *г-объекта
  - пример простейшего *г-билдера
    ```typescript
    const contentRenderProps = ({listJsx}: MsscJsxExternal) => {
      return (
        <div>{listJsx}</div>
      )
    }
    ```
- г-объект - это параметры передаваемые в *г-билдер. Тип `MsscJsxExternal`
