import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RsuvEnResultCrudSet } from "rsuv-lib";
import { useScrollFix } from "ueur-lib";

import "./msscListStyles.scss";
import { nxxTemp } from "../temp-collection-typing/temp";
import { SvgIconDice } from "./commonIcons/SvgIcons/SvgIconDice";
import { ColorsCls } from "./commonIcons/SvgIcons/utils/ColorsCls";
import { BrSelectIdType } from "./commonUI/BrSelect/types";
import { BrSpinner } from "./commonUI/BrSpinner/BrSpinner";
import { ListSelectingModelCls } from "./commonUtils/ListSelectingModelCls";
import { ButtonCreateLocal } from "./msscComponents/ButtonCreateLocal";
import { MsscButtonDelete } from "./msscComponents/MsscButtonDelete";
import { MsscButtonDeselectAll } from "./msscComponents/MsscButtonDeselectAll";
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
import { MsscSourceElemsDeleteType } from "./types/types/MsscSourceElemsDeleteType";
import { MsscTagGroupElemsType } from "./types/types/MsscTagGroupElemsType";

const scrollTop = 0;

const MsscListFCC = ({
  source,
  sortData,
  children,
  listElemStruct,
  tagsFieldNameArr,
  listAreaHeight = new MsscListAreaHeightCls(),
}: MsscListPropsType): JSX.Element => {
  nxxTemp();

  // номер текущей страницы (пагинация)
  const [$pageNumCurrent, $pageNumCurrentSet] = useState(1);
  //
  const [$reqMode, $reqModeSet] = useState<MsscReqModeEnum>(MsscReqModeEnum.UNDEF);
  // номер страницы который был перед тем как изменить его на новый
  const [$pageNumBeforChange, $pageNumBeforChangeSet] = useState(1);
  // показ спиннера для диалогов
  const [$loadingDialog, $loadingDialogSet] = useState(false);
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

  const fnError = (): void => {
    $isErrorSet(true);
    setTimeout(() => {
      $isErrorSet(false);
    }, 2000);
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
  console.log("!!-!!-!! getDataResult {230114121219}\n", getDataResult); // del+

  const {
    countByFilter,
    countAll,
    pageCount,
    tags,
    elemsResult,
    firstIsDone,
    twoIsDone,
    twoIsError,
    toWholeRefetch,
  } = getDataResult;

  useEffect(() => {
    if (twoIsError && $reqMode === MsscReqModeEnum.DETAIL) {
      // если получить данные "деталки" не удалось, возвращаемся к последнему номеру страницы
      $pageNumBeforChangeSet($pageNumBeforChange);
    }
  }, [twoIsError, $reqMode]);

  // для показа спиннера при полной загрузке
  const isLoadingWhole = !firstIsDone;
  // для показа спиннера при запросе данных страницы (пагинация страниц)
  const isLoadingPage = firstIsDone && !twoIsDone;
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
    $dialogTitleSet("удаление");
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
        $loadingDialogSet(true);
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
        $loadingDialogSet(false);
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
     * для вызова при нажатии Cancel в диалоге создания/редатирования нового элемента
     */
    cancel: async () => {
      $isDialogCreateEditShowedSet(false);
      scrollFixFn(false);
    },
  };

  function ButtonDiceLocalFCC() {
    // TODO вынести
    const fnColorsForRandom = () => {
      if (!$randomEnabled) {
        return new ColorsCls();
      }
      return new ColorsCls().buNormal("#71fc22").buHover("#71fc22");
    };

    /**
     * [[220130202338]]
     */
    function diceHandler() {
      $randomEnabledSet(!$randomEnabled);
      refreshes.whole();
    }

    // [[220130202258]] random button
    return (
      <button onClick={diceHandler} title="random">
        <SvgIconDice
          svgProps={{
            width: "20px",
            height: "20px",
          }}
          colors={fnColorsForRandom()}
        />
      </button>
    );
  }

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
    dialogCreateOrEdit: source?.dialogCreateOrEdit,
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
        <ButtonCreateLocal
          sourceDialogCreateOrEdit={source?.dialogCreateOrEdit}
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
      btnDice: <ButtonDiceLocalFCC />,
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
      <MsscSearch searchText={$searchText} searchTextSet={$searchTextSet} refreshes={refreshes} />
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

  const elemsDelete = useMemo(() => {
    if (source) {
      return source.elemsDelete.bind(source);
    }
  }, [source]);

  // ---
  return (
    <div className="mssc-base">
      {$isError ? <div className="mssc-base__error">ошибка</div> : null}
      {source ? "" : <div>MsscListFCC-info: source is empty</div>}
      {!isLoadingWhole && children?.(childrenBlock)}
      {/* // --- dialog delete */}
      <MsscDialogDelete
        listModel={$listModel}
        refreshes={refreshes}
        elemsDelete={elemsDelete}
        dialogBody={$dialogBody}
        isDialogDeleteShowed={$isDialogDeleteShowed}
        isDialogDeleteShowedSet={$isDialogDeleteShowedSet}
        dialogTitle={$dialogTitle}
        scrollFixFn={scrollFixFn}
        loadingDialogSet={$loadingDialogSet}
        fnError={fnError}
      />
      {/* // --- dialog create/edit */}
      {$isDialogCreateEditShowed && $dialogCreateEditJsx}
      {/* // --- spinner */}
      <BrSpinner show={isLoadingWhole || $loadingDialog} />
    </div>
  );
};

export default MsscListFCC;
