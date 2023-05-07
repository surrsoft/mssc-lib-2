import React, { useEffect, useMemo, useState } from "react";
import { RsuvEnResultCrudSet } from "rsuv-lib";
import { useScrollFix } from "ueur-lib";

import "./msscListStyles.scss";
import { BrSelectIdType } from "./commonUI/BrSelect/types";
import { BrSpinner } from "./commonUI/BrSpinner/BrSpinner";
import { ListSelectingModelCls } from "./commonUtils/ListSelectingModelCls";
import { MsscButtonCreate } from "./msscComponents/MsscButtonCreate";
import { MsscButtonDelete } from "./msscComponents/MsscButtonDelete";
import { MsscButtonDeselectAll } from "./msscComponents/MsscButtonDeselectAll";
import { MsscButtonDice } from './msscComponents/MsscButtonDice';
import { MsscDialogDelete } from "./msscComponents/MsscDialogDelete";
import { MsscInfos } from "./msscComponents/MsscInfos";
import { MsscList } from "./msscComponents/MsscList/MsscList";
import { MsscListElemPropsBaseType } from "./msscComponents/MsscList/types/MsscListElemPropsBaseType";
import { MsscMultiselect } from "./msscComponents/MsscMultiselect";
import { MsscPaginator } from "./msscComponents/MsscPaginator/MsscPaginator";
import { MsscSearch } from "./msscComponents/MsscSearch";
import { MsscSort } from "./msscComponents/MsscSort";
import { useMsscGetData } from "./msscHooks/useMsscGetData/useMsscGetData";
import { MsscListAreaHeightCls } from "./msscUtils/MsscListAreaHeightCls";
import { MSSC_SETTINGS } from "./settings";
import { MsscReqModeEnum } from "./types/enums/MsscReqModeEnum";
import { MsscDialogCreateEditCallbacksType } from "./types/types/MsscDialogCreateEditCallbacksType";
import { MsscJsxExternalType } from "./types/types/MsscJsxExternalType";
import { MsscListPropsType } from "./types/types/MsscListPropsType";
import { MsscRefreshesType } from "./types/types/MsscRefreshesType";
import { MsscTagGroupElemsType } from "./types/types/MsscTagGroupElemsType";
import { SvgButton } from '../stories/SvgButton/SvgButton/SvgButton';

const scrollTop = 0;

const MsscListFCC = ({
                       source,
                       sortData,
                       children,
                       listElemStruct,
                       tagsFieldNameArr,
                       listAreaHeight = new MsscListAreaHeightCls(),
                     }: MsscListPropsType): JSX.Element => {

  // --- стейты

  // номер текущей страницы (пагинация)
  const [$pageNumCurrent, $pageNumCurrentSet] = useState(1);
  //
  const [$reqMode, $reqModeSet] = useState<MsscReqModeEnum>(MsscReqModeEnum.UNDEF);
  // номер страницы который был перед тем как изменить его на новый
  const [$pageNumBeforChange, $pageNumBeforChangeSet] = useState(1);
  // показ спиннера для диалогов
  const [$isDialogLoading, $isDialogLoadingSet] = useState(false);
  // для показа ошибки запроса данных
  const [$isError, $isErrorSet] = useState(false);
  // --- диалоги
  const [$isDialogDeleteShowed, $isDialogDeleteShowedSet] = useState(false);
  const [$dialogTitle, $dialogTitleSet] = useState("");
  const [$dialogBody, $dialogBodySet] = useState("");
  const [$dialogCreateEditJsx, $dialogCreateEditJsxSet] = useState<JSX.Element | null>(null);
  const [$isDialogCreateEditShowed, $isDialogCreateEditShowedSet] = useState(false);
  // ---
  const [$listModel] = useState(() => {
    return new ListSelectingModelCls();
  });
  // триггер для инициации пререндера компонента
  const [$toRerender, $toRerenderSet] = useState(false);
  // id выбранной в настоящее время сортировки
  const [$sortIdCurr, $sortIdCurrSet] = useState<BrSelectIdType | undefined>(sortData?.selectedId);
  // текст введённый в поле поиска
  const [$searchText, $searchTextSet] = useState("");
  // вкл/выкл рандом-режим
  const [$randomEnabled, $randomEnabledSet] = useState(false);
  // информация о выбранных-тегах каждой *т-группы
  const [$tagGroupSelectedArr, $tagGroupSelectedArrSet] = useState<MsscTagGroupElemsType[]>([]);

  // ---

  const scrollFixFn = useScrollFix($isDialogCreateEditShowed);

  // --- байндим методы source

  const sourceElemsDelete = useMemo(() => {
    if (source) {
      return source.elemsDelete.bind(source);
    }
  }, [source]);

  const sourceDialogCreateOrEdit = useMemo(() => {
    if (source) {
      return source.dialogCreateOrEdit.bind(source);
    }
  }, [source]);

  // ---

  const fnError = (): void => {
    $isErrorSet(true);
    setTimeout(() => $isErrorSet(false), 2000);
  };

  // --- получение данных

  const getDataResult = useMsscGetData({
    pageNumCurrent: $pageNumCurrent,
    source,
    tagGroupSelectedArr: $tagGroupSelectedArr,
    randomEnabled: $randomEnabled,
    sortIdCurr: $sortIdCurr,
    tagsFieldNameArr,
    sortData,
    $searchText,
  });

  const {
    countByFilter,
    countAll,
    pageCount,
    tags,
    elemsResult,
    firstIsDone,
    detailsIsDone,
    detailsIsError,
    toWholeRefetch,
  } = getDataResult;

  useEffect(() => {
    if (detailsIsError && $reqMode === MsscReqModeEnum.DETAIL) {
      // если получить данные "деталки" не удалось, возвращаемся к последнему "успешному" номеру страницы
      $pageNumBeforChangeSet($pageNumBeforChange);
    }
  }, [detailsIsError, $reqMode]);

  // для показа спиннера при whole-загрузке
  const isLoadingWhole = !firstIsDone;
  // для показа спиннера при запросе данных деталки
  const isLoadingPage = firstIsDone && !detailsIsDone;
  // сколько отображается элементов сейчас на текущей странице
  const elemsCountOnCurrPage = elemsResult.length;

  // ---

  const refreshes: MsscRefreshesType = {
    /** Выполнение полного перезапроса всех данных */
    whole: () => {
      $reqModeSet(MsscReqModeEnum.WHOLE);
      toWholeRefetch();
    },
    /** Только инициация перерендеринга */
    toRerenderPage: () => {
      $toRerenderSet(!$toRerender);
    },
  };

  const handleDialogDeleteShow = (): void => {
    $dialogTitleSet("удаление"); // TODO сделать locale
    $dialogBodySet(`удалить элемент(ы) ? ${$listModel.selectElemsCount()} шт.`);
    $isDialogDeleteShowedSet(true);
  };

  const dialogCreateEditCallbacks: MsscDialogCreateEditCallbacksType = {
    /**
     * [[220128213044]]
     * Будет вызыван при нажатии ОК в диалоге создания/редактировании элемента. Если у (1) не пустое (truthy) поле `id` то
     * значит нужно обновить элемент, иначе - создать элемент
     * @param model
     */
    ok: async (model: any) => {
      let success = false;
      try {
        $isDialogLoadingSet(true);
        if (!model?.id) {
          // ^ создание нового элемента
          const result = await source?.elemsAdd([model]);
          if (result && result.length === 1 && result[0].id) {
            success = true;
            $listModel.activeIdSet(result[0].id);
            $searchTextSet("");
          }
        } else {
          // ^ обновление элемента
          const result = await source?.elemsSet([model]);
          if (result && result.length === 1) {
            const rr = result[0];
            if (rr.success) {
              const enCrudResult: RsuvEnResultCrudSet | undefined = rr.value;
              if (!enCrudResult) {
                console.error("[[220129123729]]");
                return;
              }
              if (enCrudResult === RsuvEnResultCrudSet.ERROR) {
                console.error("[[220129123837]]");
                return;
              }
              success = true;
            } else {
              console.error("[[220129123902]]");
              return;
            }
          } else {
            console.error("[[220129123916]]");
            return;
          }
        }
      } catch (err) {
        console.log("!!-!!-!! err {220126221404}\n", err);
      } finally {
        $isDialogLoadingSet(false);
        scrollFixFn(false);
        if (success) {
          $isDialogCreateEditShowedSet(false);
          refreshes.whole();
        } else {
          fnError();
        }
      }
    },
    /**
     * для вызова при нажатии Cancel в диалоге создания/редактирования нового элемента
     */
    cancel: async () => {
      $isDialogCreateEditShowedSet(false);
      scrollFixFn(false);
    },
  };

  const paginatorJsx = (
    <MsscPaginator
      isDisable={isLoadingPage}
      pageCountAll={pageCount}
      pageNumCurrent={$pageNumCurrent}
      pageNumBeforChangeSet={$pageNumBeforChangeSet}
      pageNumCurrentSet={$pageNumCurrentSet}
      reqModeSet={$reqModeSet}
    />
  );

  const mainListObj: MsscListElemPropsBaseType = {
    listModel: $listModel,
    dialogDeleteShow: handleDialogDeleteShow,
    elems: elemsResult,
    dialogCreateEditJsxSet: $dialogCreateEditJsxSet,
    dialogCreateOrEdit: sourceDialogCreateOrEdit,
    dialogCreateEditCallbacks,
    refreshes,
    listElemStruct,
    isDialogCreateEditShowedSet: $isDialogCreateEditShowedSet,
  };

  const childrenBlock: MsscJsxExternalType = {
    infosJsx: (
      <MsscInfos
        $elemsCountByFilter={countByFilter}
        $elemsCountOnCurrPage={elemsCountOnCurrPage}
        elemsAll={countAll === -1 ? "-" : `${countAll}`}
        elemsCountSelected={$listModel.selectElemsCount()}
      />
    ),
    paginator1Jsx: paginatorJsx,
    paginator2Jsx: paginatorJsx,
    buttonsJsx: {
      btnDelete: (
        <MsscButtonDelete
          listModel={$listModel}
          dialogDeleteShow={handleDialogDeleteShow}
          iconsConf={MSSC_SETTINGS.iconsConf}
        />
      ),
      btnCreate: (
        <MsscButtonCreate
          sourceDialogCreateOrEdit={sourceDialogCreateOrEdit}
          dialogCreateEditCallbacks={dialogCreateEditCallbacks}
          $dialogCreateEditJsxSet={$dialogCreateEditJsxSet}
          $isDialogCreateEditShowedSet={$isDialogCreateEditShowedSet}
        />
      ),
      btnDeselectAll: (
        <MsscButtonDeselectAll
          listModel={$listModel}
          refreshes={refreshes}
          iconsConf={MSSC_SETTINGS.iconsConf}
        />
      ),
      btnDice: <MsscButtonDice
        refreshes={refreshes}
        randomEnabled={$randomEnabled}
        randomEnabledSet={$randomEnabledSet}
      />,
    },
    sortJsx: (
      <MsscSort
        sortData={sortData}
        sortIdCurr={$sortIdCurr}
        sortIdCurrSet={$sortIdCurrSet}
        refreshes={refreshes}
      />
    ),
    searchJsx: (
      <MsscSearch searchText={$searchText} searchTextSet={$searchTextSet} refreshes={refreshes}/>
    ),
    listJsx: (
      <MsscList
        scrollTop={scrollTop}
        listAreaHeight={listAreaHeight}
        isLoadingPage={isLoadingPage}
        mainList={mainListObj}
      />
    ),
    multiselectJsxArr: tagsFieldNameArr?.map((elTagGroup) => (
      <MsscMultiselect
        key={elTagGroup.id}
        tagsGroupId={elTagGroup.id}
        tagGroupSelectedArr={$tagGroupSelectedArr}
        tagGroupSelectedArrSet={$tagGroupSelectedArrSet}
        tagGroupArr={tags}
        refreshes={refreshes}
      />
    )),
  };

  // ---
  return (
    <div className="mssc-base">
      <SvgButton />
      {$isError ? <div className="mssc-base__error">ошибка</div> : null}
      {source ? "" : <div>MsscListFCC-info: source is empty</div>}
      {!isLoadingWhole && children?.(childrenBlock)}
      {/* // --- dialog delete */}
      <MsscDialogDelete
        listModel={$listModel}
        refreshes={refreshes}
        elemsDelete={sourceElemsDelete}
        dialogBody={$dialogBody}
        isDialogDeleteShowed={$isDialogDeleteShowed}
        isDialogDeleteShowedSet={$isDialogDeleteShowedSet}
        dialogTitle={$dialogTitle}
        scrollFixFn={scrollFixFn}
        loadingDialogSet={$isDialogLoadingSet}
        fnError={fnError}
      />
      {/* // --- dialog create/edit */}
      {$isDialogCreateEditShowed && $dialogCreateEditJsx}
      {/* // --- spinner */}
      <BrSpinner show={isLoadingWhole || $isDialogLoading}/>
    </div>
  );
};

export default MsscListFCC;
