import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import _ from 'lodash';
import './msscListStyles.scss';
import { MsscSourceType } from './types/MsscSourceType';
import {
  RsuvEnResultCrudSet,
  RsuvEnSort,
  RsuvPaginationGyth,
  RsuvTxChecked,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort,
  RsuvTxStringAC
} from 'rsuv-lib';
import { useScrollFix } from 'ueur-lib';
import MsscDialogFCC from './msscComponents/MsscDialogFCC/MsscDialogFCC';
import MsscPaginatorFCC from './msscComponents/MsscPaginatorFCC/MsscPaginatorFCC';
import ListModelAsau59 from './commonUtils/ListModelAsau59';
import SvgIconTrash from './commonIcons/SvgIconTrash/SvgIconTrash';
import SvgIconPlus from './commonIcons/SvgIconPlus/SvgIconPlus';
import SvgIconUnckecked from './commonIcons/SvgIconUnchecked/SvgIconUnckecked';
import { ColorsAsau61 } from './commonIcons/utils/ColorsAsau61';
import SvgIconDice from './commonIcons/SvgIconDice/SvgIconDice';
import MenuAsau54FCC, { DataAtAsau54, ItemAtAsau54, SelectResultAtAsau54 } from './commonUI/MenuFCC/MenuAsau54FCC';
import BrInput, { BrInputEnIcon } from './commonUI/BrFilter/BrInput';
import BrSpinner from './commonUI/BrSpinner/BrSpinner';
import { BrSelectIdType, BrSelectItemType, BrSelectSortDataType } from './commonUI/BrSelect/types';
import BrSelect from './commonUI/BrSelect/BrSelect';
import classNames from 'classnames';
import BrMultiselect from './commonUI/BrMultiselect/BrMultiselect';
import { filtersCreate } from "./msscUtils/filtersCreate";
import { elemsCountByFilterAndIf } from "./msscUtils/elemsCountByFilterAndIf";
import { tagsCookAndSet } from "./msscUtils/tagsCookAndSet";
import { sortsCreate } from "./msscUtils/sortsCreate";
import { MsscFilterType } from './types/types/MsscFilterType';
import { MsscElemType } from './types/types/MsscElemType';
import { MsscColumnNameType } from './types/types/MsscColumnNameType';
import { MsscListAreaHeightModeEnum } from './types/enums/MsscListAreaHeightModeEnum';
import { MsscMenuActionEnum } from './types/enums/MsscMenuActionEnum';
import { MsscJsxExternalType } from './types/types/MsscJsxExternalType';
import { MsscListPropsType } from './types/types/MsscListPropsType';
import { MsscTagsGroupIdType } from './types/types/MsscTagsGroupIdType';
import { MsscTagGroupType } from './types/types/MsscTagGroupType';
import { MsscTagGroupSelectedType } from './types/types/MsscTagGroupSelectedType';
import { MsscIdObjectType } from './types/types/MsscIdObjectType';
import { MsscListAreaHeightCls } from './msscUtils/MsscListAreaHeightCls';
import { ParamUiLocalFCC_B } from './msscComponents/ParamUiLocalFCC_B';

let scrollTop = 0;

const MsscListFCC = ({
                       source,
                       sortData,
                       children,
                       listElemStruct,
                       tagsFieldNameArr,
                       listAreaHeight = new MsscListAreaHeightCls
                     }: MsscListPropsType
): JSX.Element => {

  const configSTA = {
    // записей на странице
    elemsOnPage: 10
  }

  const menuDataSTA = {
    id: '',
    items: [
      {idAction: MsscMenuActionEnum.EDIT, text: 'Изменить'} as ItemAtAsau54,
      {idAction: MsscMenuActionEnum.SELECT, text: 'Выбрать'} as ItemAtAsau54,
      {idAction: MsscMenuActionEnum.DELETE, text: 'Удалить'} as ItemAtAsau54
    ]
  } as DataAtAsau54

  // номер текущей страницы (пагинация)
  const [$pageNumCurrent, $pageNumCurrentSet] = useState(1);
  // номер страницы который был перед тем как изменить его на новый
  const [$pageNumBeforChange, $pageNumBeforChangeSet] = useState(1);
  // всего страниц
  const [$pageCountAll, $pageCountAllSet] = useState(0);
  // текущие элементы для отображения
  const [$elems, $elemsSet] = useState<MsscElemType[]>([]);
  // общее количество элементов хранилища (без учёта каких-либо фильтров)
  const [$elemsCountAll, $elemsCountAllSet] = useState(-1);
  // общее количество элементов хранилища по фильтру
  const [$elemsCountByFilter, $elemsCountByFilterSet] = useState(0);
  // сколько отображается элементов сейчас на текущей странице
  const [$elemsCountOnCurrPage, $elemsCountOnCurrPageSet] = useState(0);
  // для показа спиннера при первоначальной загрузке
  const [$isLoadingInitial, $isLoadingInitialSet] = useState(false);
  // для показа спиннера при запросе данных страницы (пагинация страниц)
  const [$loadingPage, $loadingPageSet] = useState(false);
  // показ спиннера для диалогов
  const [$loadingDialog, $loadingDialogSet] = useState(false);
  // для того чтобы содержимое второго useEffect отрабатывало строго после содержимого первого
  const [$fdone, $fdoneSet] = useState(false);
  // для инициации полного перезапроса данных, например после удаления/добавления элемента(ов)
  const [$needUpdate1, $needUpdate1Set] = useState(false);
  // для инициации запроса данных при нажатии изменения страницы в пагинации
  const [$needUpdate2, $needUpdate2Set] = useState(false);
  // для показа ошибки запроса данных
  const [$isError, $isErrorSet] = useState(false);
  // --- диалоги
  const [$isDialogDeleteShowed, $isDialogDeleteShowedSet] = useState(false);
  const [$dialogTitle, $dialogTitleSet] = useState('');
  const [$dialogBody, $dialogBodySet] = useState('');
  const [$dialogCreateEditJsx, $dialogCreateEditJsxSet] = useState<JSX.Element | null>(null);
  const [$isDialogCreateEditShowed, $isDialogCreateEditShowedSet] = useState(false);
  // ---
  const [$listModel] = useState(() => {
    return new ListModelAsau59()
  });
  const [$refresh, $refreshSet] = useState(false);
  // ---
  // id выбранной в настоящее время сортировки
  const [$sortIdCurr, $sortIdCurrSet] = useState<BrSelectIdType | undefined>(sortData?.selectedId);
  const [$searchText, $searchTextSet] = useState('');
  const [$randomEnabled, $randomEnabledSet] = useState(false);
  // ids элементов в случайном порядке
  const [$idsShuffled, $idsShuffledSet] = useState<string[]>([]);
  // --- теги (мультивыбор)
  // все *группы-тегов
  const [$tagGroupArr, $tagGroupArrSet] = useState<MsscTagGroupType[]>([]);
  // *группы-тегов только с выбранными тегами (отмеченными галками)
  const [$tagGroupSelectedArr, $tagGroupSelectedArrSet] = useState<MsscTagGroupSelectedType[]>([]);

  // ---
  const scrollFixFn = useScrollFix($isDialogCreateEditShowed)

  const shuffleUtils = {
    /**
     * Получить ids из {@link $idsShuffled} начиная с (1) включительно по (2) исключительно
     * @param ixStart (1) -- индекс
     * @param ixEnd (2) -- индекс
     */
    elems(ixStart: number, ixEnd: number): MsscIdObjectType[] {
      return $idsShuffled.slice(ixStart, ixEnd + 1).map((el) => ({id: el}))
    },
  }

  const fnError = () => {
    $isErrorSet(true)
    setTimeout(() => {
      $isErrorSet(false)
    }, 2000);
  }

  /**
   * получение всех основных данных
   * @param sourcePrm
   */
  const requestFirst = async (sourcePrm: MsscSourceType<any>) => {
    try {
      // --- общее кол-во элементов без учета фильтра
      $elemsCountAllSet(-1)
      sourcePrm?.elemsCountByFilter([]).then((result: RsuvTxNumIntAB) => {
        $elemsCountAllSet(result.val);
      }).catch((err) => {
        console.log('!!-!!-!! err {220130133850}\n', err);
      })
      // --- готовка фильтров
      $isLoadingInitialSet(true);
      const filters: MsscFilterType[] = filtersCreate(
        {
          source: sourcePrm,
          tagGroupSelectedArr: $tagGroupSelectedArr,
          searchText: $searchText,
          tagsFieldNameArr
        }
      );
      // --- получение общего количества элементов с учетом фильтров; в random-режиме также получаем список всех ids
      const {elemsCountByFilter, ids} = await elemsCountByFilterAndIf({
        source: sourcePrm,
        filters,
        randomEnabled: $randomEnabled,
        sortData,
        sortIdCurr: $sortIdCurr
      });
      if ($randomEnabled) {
        const idsShuffled = _.shuffle(ids)
        $idsShuffledSet(idsShuffled)
      }
      // --- получение тегов
      await tagsCookAndSet({
        source: sourcePrm,
        filters,
        tagGroupSelectedArr: $tagGroupSelectedArr,
        tagsFieldNameArr,
        $tagGroupArrSet
      })
      // --- pagination - pageCountAll
      const pagination = new RsuvPaginationGyth(elemsCountByFilter, configSTA.elemsOnPage)
      // ---
      $pageCountAllSet(pagination.pageCount)
      $elemsCountByFilterSet(elemsCountByFilter)
    } catch (err) {
      console.log('!!-!!-!! err {220119120755}\n', err)
      fnError()
    } finally {
      $isLoadingInitialSet(false)
    }
  };

  /**
   * получение данных конкретной страницы
   * @param source
   */
  const requestTwo = async (source: MsscSourceType<any>) => {
    try {
      $loadingPageSet(true)
      // await fnWait(3000)
      // --- pagination - ixStart, ixEnd
      const pagination = new RsuvPaginationGyth($elemsCountByFilter, configSTA.elemsOnPage)
      if ($pageNumCurrent > pagination.pageCount) {
        // если в результате удаления элементов, страниц стало меньше чем было раньше
        $pageNumCurrentSet(pagination.pageCount)
      }
      const indexes = pagination.indexesByPageNum($pageNumCurrent)
      const ixStart = indexes.indexStart
      const ixEnd = indexes.indexLast
      // --- --- получение элементов из source
      // --- сортировка
      const sorts: RsuvTxSort[] = sortsCreate(sortData, $sortIdCurr);
      // --- filters
      const filter0 = filtersCreate({
        source,
        tagGroupSelectedArr: $tagGroupSelectedArr,
        searchText: $searchText,
        tagsFieldNameArr
      });
      // ---
      let elemsResult: MsscElemType[]
      if (!$randomEnabled) {
        elemsResult = await source.elems(
          new RsuvTxNumIntDiap(new RsuvTxNumIntAB(ixStart), new RsuvTxNumIntAB(ixEnd)),
          filter0 || [],
          sorts
        )
      } else {
        const idObjs = shuffleUtils.elems(ixStart, ixEnd)
        elemsResult = (
          (await source?.elemsById(idObjs))
            .filter((el: MsscElemType | null) => !!el) as MsscElemType[]
        ) || []
      }
      // --- ---
      $elemsCountOnCurrPageSet(elemsResult.length)
      // ---
      $elemsSet(elemsResult)
    } catch (err) {
      console.log('!!-!!-!! err {220119120754}\n', err)
      // возвращаем старый номер страницы
      $pageNumCurrentSet($pageNumBeforChange)
      fnError()
    } finally {
      $loadingPageSet(false)
    }
  }

  // --- useEffect() 1

  useEffect(() => {
    $fdoneSet(false)
    if (source) {
      (async () => {
        await requestFirst(source)
        $fdoneSet(true)
      })()
    }
  }, [$needUpdate1]);

  // --- useEffect() 2

  useEffect(() => {
    if (source && $fdone) {
      (async () => {
        await requestTwo(source)
      })();
    }
  }, [$fdone, $needUpdate2]);

  // ---

  const refreshes = {
    pageDataRefresh: () => {
      $needUpdate2Set(!$needUpdate2)
    },
    /**
     * Выполнение полного перезапроса всех данных
     *
     * СМ, ТАКЖЕ {@link refresh}
     */
    whole: () => {
      $needUpdate1Set(!$needUpdate1)
    },
    /**
     * Перезапрос данных страницы только.
     *
     * СМ. ТАКЖЕ {@link refreshes#whole}
     */
    refreshPage: () => {
      $refreshSet(!$refresh)
    }
  }


  const dialogDeleteShow = () => {
    $dialogTitleSet('удаление')
    $dialogBodySet(`удалить элемент(ы) ? ${$listModel.selectElemsCount()} шт.`)
    $isDialogDeleteShowedSet(true)
  }

  const dialogCreateEditCallbacks = {
    /**
     * [[220128213044]]
     * Будет вызыван при нажатии ОК в диалоге создания/редактировании элемента. Если у (1) не пустое (truthy) поле `id` то
     * значит нужно обновить элемент, иначе - создать элемент
     * @param model
     */
    ok: async (model: any) => {
      let success = false;
      try {
        $loadingDialogSet(true)
        if (!model.id) {
          // ^ создание нового элемента
          const result = await source?.elemsAdd([model])
          if (result && result.length === 1 && result[0]['id']) {
            success = true;
            $listModel.activeIdSet(result[0]['id'])
            $searchTextSet('')
          }
        } else {
          // ^ обновление элемента
          const result = await source?.elemsSet([model])
          if (result && result.length === 1) {
            const rr = result[0];
            if (rr.success) {
              const enCrudResult: RsuvEnResultCrudSet | undefined = rr.value
              if (!enCrudResult) throw new Error('[[220129123729]]')
              if (enCrudResult === RsuvEnResultCrudSet.ERROR) throw new Error('[[220129123837]]')
              success = true;
            } else {
              throw new Error('[[220129123902]]')
            }
          } else {
            throw new Error('[[220129123916]]')
          }
        }
      } catch (err) {
        console.log('!!-!!-!! err {220126221404}\n', err)
      } finally {
        $loadingDialogSet(false)
        scrollFixFn(false)
        if (success) {
          $isDialogCreateEditShowedSet(false)
          refreshes.whole()
        } else {
          fnError()
        }
      }

    },
    /**
     * для вызова при нажатии Cancel в диалоге создания/редатирования нового элемента
     */
    cancel: async () => {
      $isDialogCreateEditShowedSet(false)
      scrollFixFn(false)
    }
  }

  function ListElemLocalFCC({elem}: { elem: MsscElemType }) {
    const jsxElem: JSX.Element = elem.elem

    /**
     * [[220129111758]]
     * @param obj
     */
    const menuElemOnSelected = async (obj: SelectResultAtAsau54) => {
      switch (obj.idAction) {
        case MsscMenuActionEnum.DELETE:
          if (obj.idElem) {
            // чистим если что-то уже выбрано
            $listModel.selectElemsClear()
            $listModel.selectElemsAdd([obj.idElem])
            $listModel.activeIdSet(obj.idElem)
            refreshes.refreshPage()
          }
          dialogDeleteShow()
          break;
        case MsscMenuActionEnum.SELECT:
          if (obj.idElem) {
            $listModel.selectElemsAdd([obj.idElem])
            $listModel.activeIdSet(obj.idElem)
            refreshes.refreshPage()
          }
          break;
        case MsscMenuActionEnum.EDIT:
          if (obj.idElem) {
            const elem = $elems.find(el => el.id.val === obj.idElem)
            if (elem) {
              $listModel.activeIdSet(elem.id.val)
              const jsxEdit = await source?.dialogCreateOrEdit(dialogCreateEditCallbacks.ok, dialogCreateEditCallbacks.cancel, elem.elemModel)
              $dialogCreateEditJsxSet(jsxEdit || null)
              if (jsxEdit) {
                $isDialogCreateEditShowedSet(true)
              }
            }
          }
          break;
      }
    }

    /**
     * [[220129135526]]
     * @param id
     */
    const checkboxOnChange = (id: string) => (ev: any) => {
      const checked = ev.target.checked
      if (checked) {
        $listModel.selectElemsAdd([id])
        $listModel.activeIdSet(id)
      } else {
        $listModel.selectElemsDelete([id])
        $listModel.activeIdSet(id)
      }
      refreshes.refreshPage()
    }

    function RkCheckboxLocalFCC() {
      return (
        <div className="mssc-list-elem__checkbox">
          <input
            type="checkbox"
            checked={$listModel.selectElemIs(elem.id.val)}
            onChange={checkboxOnChange(elem.id.val)}
          />
        </div>
      )
    }

    function RkBodyLocalFCC() {
      return (
        <div className="mssc-list-elem__body">{jsxElem}</div>
      )
    }

    function RkMenuLocalFCC() {
      return (
        <div className="mssc-list-elem__menu">
          <MenuAsau54FCC
            data={Object.assign({}, menuDataSTA, {id: elem.id.val})}
            cbOnSelected={menuElemOnSelected}
          />
        </div>
      )
    }

    const containerCn = classNames('mssc-list-elem', {'mssc-list-elem_active': $listModel.activeIdIs(elem.id.val)})

    return listElemStruct
      ? (<div className={containerCn}>
        {listElemStruct({
          isActive: $listModel.activeIdIs(elem.id.val),
          checkboxJsx: <RkCheckboxLocalFCC/>,
          bodyJsx: <RkBodyLocalFCC/>,
          menuJsx: <RkMenuLocalFCC/>
        })}
      </div>)
      : (
        <div className={containerCn}>
          <RkCheckboxLocalFCC/>
          <RkBodyLocalFCC/>
          <RkMenuLocalFCC/>
        </div>
      )
  }

  function SearchLocalFCC() {
    /**
     * [[220130110028]]
     */
    function searchHandler(value: string) {
      $searchTextSet(value)
      refreshes.whole()
    }

    return (
      // [[220130103738]]
      <BrInput
        icon={BrInputEnIcon.SEARCH}
        cbOnChange={searchHandler}
        initialValue={$searchText}
        autoFocus={true}
      />
    )
  }

  function SortLocalFCC() {

    /**
     * [[220129163836]]
     * @param sortItem
     */
    const sortHandler = (sortItem: BrSelectItemType<MsscColumnNameType>) => {
      $sortIdCurrSet(sortItem.idElem)
      refreshes.whole()
    }

    return (
      <>
        {
          sortData && <div className="mssc-body__sort-filter-container">
            {/* [[220129214739]] */}
						<BrSelect data={sortData} cbSelect={sortHandler} selectedId={$sortIdCurr}/>
					</div>
        }
      </>
    )
  }

  function PaginatorLocalFCC() {

    async function fnPaginationHandle(nextPage: number) {
      $pageNumBeforChangeSet($pageNumCurrent)
      $pageNumCurrentSet(nextPage)
      refreshes.pageDataRefresh()
    }

    return (
      <div className="mssc-list-paginator">
        <MsscPaginatorFCC
          pageCurrNum={$pageNumCurrent}
          pageAllCountNum={$pageCountAll}
          cbChange={fnPaginationHandle}
          disabled={$loadingPage}
        />
      </div>
    )
  }

  const iconsConf = {
    svgProps: {width: '20px', height: '20px'},
    colors: new ColorsAsau61().buNormal('#474747')
  }

  function ButtonDeleteLocalFCC() {
    const deleteHandler = () => {
      dialogDeleteShow()
    }
    return (
      <button disabled={$listModel.selectElemsCount() < 1} title="удалить выбранные элементы"
              onClick={deleteHandler}>
        <SvgIconTrash {...iconsConf}/>
      </button>
    )
  }

  function ButtonCreateLocalFCC() {
    const createHandler = async () => {
      const jsxCreate = await source?.dialogCreateOrEdit(dialogCreateEditCallbacks.ok, dialogCreateEditCallbacks.cancel)
      $dialogCreateEditJsxSet(jsxCreate || null)
      if (jsxCreate) {
        $isDialogCreateEditShowedSet(true)
      }
    }
    return (
      <button title="создать новый элемент" onClick={createHandler}>
        <SvgIconPlus {...iconsConf}/>
      </button>
    )
  }

  function ButtonDeselectAllLocalFCC() {
    const deselectAllHandler = () => {
      $listModel.selectElemsClear()
      refreshes.refreshPage()
    }
    return (
      <button disabled={$listModel.selectElemsCount() < 1} title="отменить выбор всех элементов"
              onClick={deselectAllHandler}>
        <SvgIconUnckecked {...iconsConf}/>
      </button>
    )
  }

  function ButtonDiceLocalFCC() {
    const fnColorsForRandom = () => {
      if (!$randomEnabled) {
        return new ColorsAsau61()
      }
      return new ColorsAsau61().buNormal('#71fc22').buHover('#71fc22')
    }

    /**
     * [[220130202338]]
     */
    function diceHandler() {
      $randomEnabledSet(!$randomEnabled)
      refreshes.whole()
    }

    // [[220130202258]] random button
    return (
      <button onClick={diceHandler} title="random">
        <SvgIconDice svgProps={{width: '20px', height: '20px'}} colors={fnColorsForRandom()}/>
      </button>
    )
  }

  function DialogDeleteLocalFCC() {
    /**
     * [[220128215639]]
     */
    const dialogDeleteHandlers = {
      cancel: () => {
        $listModel.selectElemsClear()
        $isDialogDeleteShowedSet(false)
      },
      ok: async () => {
        if ($listModel.selectElemsCount() > 0) {
          const ids: MsscIdObjectType[] = $listModel.selectElems().map(el => ({id: el}))
          try {
            $loadingDialogSet(true)
            const noDeletedElems = await source?.elemsDelete(ids)
            if (noDeletedElems) {
              if (noDeletedElems.length === 0) {
                $listModel.selectElemsClear()
                scrollFixFn(false)
                $isDialogDeleteShowedSet(false)
                refreshes.whole()
              } else {
                console.warn(`[${noDeletedElems.length}] elems not deleted`)
                fnError()
              }
            }
          } catch (err) {
            console.log('!!-!!-!! err {220128215806}\n', err)
          } finally {
            $loadingDialogSet(false)
          }
        }
      }
    }

    return (
      <MsscDialogFCC
        show={$isDialogDeleteShowed}
        title={$dialogTitle}
        body={$dialogBody}
        cbCancel={dialogDeleteHandlers.cancel}
        cbOk={dialogDeleteHandlers.ok}
      />
    )
  }

  function InfosLocalFCC_B() {
    return (
      <div className="mssc-infos-b">
        <ParamUiLocalFCC_B str1="элементов на текущ. странице" str2={$elemsCountOnCurrPage}/>
        <span className="mssc-infos-b__divider">/</span>
        <ParamUiLocalFCC_B str1="элементов всего по фильтру" str2={$elemsCountByFilter}/>
        <span className="mssc-infos-b__divider">/</span>
        <ParamUiLocalFCC_B str1="элементов всего" str2={$elemsCountAll === -1 ? '-' : $elemsCountAll}/>
        <span className="mssc-infos-b__divider">/</span>
        <ParamUiLocalFCC_B str1="элементов выбрано" str2={$listModel.selectElemsCount()}/>
      </div>
    )
  }


  function ListLocalFCC() {
    const refDivScroll = useRef(null)

    function onScrollHandler(ev: any) {
      scrollTop = ev?.target?.scrollTop
    }

    useEffect(() => {
      const node: any = refDivScroll.current
      node.scrollTo(0, scrollTop)
    });

    const listAreaHeightCssObj = useMemo(() => {
      if (listAreaHeight?.mode === MsscListAreaHeightModeEnum.FIXED) {
        return {height: listAreaHeight.value}
      } else if (listAreaHeight.mode === MsscListAreaHeightModeEnum.STICKY_DOWN) {
        return {height: `calc(100vh - ${listAreaHeight.value}px)`}
      }
    }, [listAreaHeight, listAreaHeight?.mode, listAreaHeight?.value]) as CSSProperties || {}

    return (
      <div
        ref={refDivScroll}
        className="mssc-list-block"
        style={Object.assign({}, {position: 'relative'}, listAreaHeightCssObj)}
        onScroll={onScrollHandler}
      >
        <BrSpinner show={$loadingPage} fullscreen={false}/>
        {
          $elems.map((elObj: MsscElemType) => {
            return (<ListElemLocalFCC key={elObj.id.val} elem={elObj}/>)
          })
        }
      </div>
    )
  }

  function MultiselectLocalFCC({tagsGroupId}: { tagsGroupId: MsscTagsGroupIdType }) {

    /**
     * Обработчик выбора тега
     * [[220211130543]]
     * @param checkedElems
     */
    const onChangeHandle = (checkedElems: RsuvTxChecked[]) => {
      const tagGroups = _.cloneDeep($tagGroupSelectedArr)
      const group = tagGroups.find((el: MsscTagGroupSelectedType) => el.id === tagsGroupId)
      if (group) {
        group.elems = checkedElems;
      } else {
        const newGroup = {id: tagsGroupId, elems: checkedElems} as MsscTagGroupSelectedType
        tagGroups.push(newGroup)
      }
      $tagGroupSelectedArrSet(tagGroups)
      refreshes.whole()
    }

    const rr: MsscTagGroupType | undefined = $tagGroupArr.find((ell: MsscTagGroupType) => ell.id === tagsGroupId)
    const tagGroup = $tagGroupSelectedArr.find(el => el.id === tagsGroupId)
    rr?.elems.forEach((el: RsuvTxChecked) => {
      const b1 = tagGroup?.elems.find(el0 => el0.id === el.id)
      if (b1) {
        el.checked = true
      }
    })

    return (
      <div className="mscc-mselect">
        <BrMultiselect datas={rr?.elems} cbOnChange={onChangeHandle} text={rr?.visibleName}/>
      </div>
    )
  }

  const handleLogsShow = () => {
  }

  // --- === ---
  return (
    <div className="mssc-base">
      {$isError ? <div className="mssc-base__error">ошибка</div> : null}

      {source ? '' : (<div>MsscListFCC-info: source is empty</div>)}

      {
        !$isLoadingInitial && children?.({
          infosJsx: <InfosLocalFCC_B/>,
          paginator1Jsx: <PaginatorLocalFCC/>,
          paginator2Jsx: <PaginatorLocalFCC/>,
          buttonsJsx: {
            btnDelete: <ButtonDeleteLocalFCC/>,
            btnCreate: <ButtonCreateLocalFCC/>,
            btnDeselectAll: <ButtonDeselectAllLocalFCC/>,
            btnDice: <ButtonDiceLocalFCC/>
          },
          sortJsx: <SortLocalFCC/>,
          searchJsx: <SearchLocalFCC/>,
          listJsx: <ListLocalFCC/>,
          multiselectJsxArr: tagsFieldNameArr?.map(el => (<MultiselectLocalFCC tagsGroupId={el.id}/>))
        } as MsscJsxExternalType)
      }

      {/* ^^dialog delete^^ */}
      <DialogDeleteLocalFCC/>
      {/* ^^dialog create/edit ^^ */}
      {$isDialogCreateEditShowed && $dialogCreateEditJsx}
      {/* spinner */}
      <BrSpinner show={$isLoadingInitial || $loadingDialog}/>
    </div>
  )
}

export default MsscListFCC;
