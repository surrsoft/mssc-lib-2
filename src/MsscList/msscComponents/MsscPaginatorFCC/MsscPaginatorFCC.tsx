import React from 'react';
import SvgIconChevron from '../../commonIcons/SvgIcons/SvgIconChevron';
import SvgIconChevronDouble from '../../commonIcons/SvgIcons/SvgIconChevronDouble';
import _ from 'lodash';

export interface MsscPaginatorProps {
  pageCurrNum?: number
  pageAllCountNum?: number
  disabled?: boolean
  cbChange?: (nextPageNum: number) => void
}

export default function MsscPaginatorFCC({
                                           pageCurrNum = 1,
                                           pageAllCountNum = 1,
                                           cbChange,
                                           disabled = false
                                         }: MsscPaginatorProps) {
  const paginationHandler = {
    /**
     *
     * @param toLimit (1) -- если TRUE то значит нужно перейти на последнюю страницу если (2) === TRUE, и на первую
     * если (2) === false; если FALSE то значит нужно перейти на одну страницу вверху или вниз в зависимости от (2)
     * @param isUp (2) -- см. (1)
     */
    handle: (toLimit = false, isUp = false) => async () => {
      if (cbChange) {
        let nextPage: number = 0;
        if (isUp) {
          if (pageCurrNum < pageAllCountNum) {
            nextPage = toLimit ? pageAllCountNum : pageCurrNum + 1;
          }
        } else {
          if (pageCurrNum > 1) {
            nextPage = toLimit ? 1 : pageCurrNum - 1
          }
        }
        if (nextPage > 0) {
          cbChange?.(nextPage)
        }
      }
    },
  }

  function selectHandler(ev: any) {
    const pageNum = ev.target.value
    cbChange?.(pageNum)
  }

  return (
    <div className="mssc-paginator">

      <button
        className="mssc-paginator__btn-m-step"
        disabled={disabled}
        onClick={paginationHandler.handle(true, false)}
      >
        <SvgIconChevronDouble
          svgProps={{width: "14px", height: "14px"}}
          angle={180}
          animate={{enabled: true, durationMillisec: 600}}
        />
      </button>

      <button
        className="mssc-paginator__btn-one-step"
        disabled={disabled}
        onClick={paginationHandler.handle(false, false)}
      >
        <SvgIconChevron
          svgProps={{width: "20px", height: "20px"}}
          angle={180}
          animate={{enabled: true, durationMillisec: 600}}
        />
      </button>
      {/*  */}
      <div className="mssc-paginator__in-container">
        <select
          className="mssc-paginator__select"
          value={pageCurrNum}
          onChange={selectHandler}
          disabled={disabled}
        >
          {
            _.times(pageAllCountNum).map(el => {
              return (<option key={el + 1} value={el + 1}>{el + 1}</option>)
            })
          }
        </select>
        <span> / {pageAllCountNum}</span>
      </div>
      {/*  */}
      <button
        className="mssc-paginator__btn-one-step"
        disabled={disabled}
        onClick={paginationHandler.handle(false, true)}
      >
        <SvgIconChevron
          svgProps={{width: "20px", height: "20px"}}
          angle={0}
          animate={{enabled: true, durationMillisec: 600}}
        />
      </button>

      <button
        className="mssc-paginator__btn-m-step"
        disabled={disabled}
        onClick={paginationHandler.handle(true, true)}
      >
        <SvgIconChevronDouble
          svgProps={{width: "14px", height: "14px"}}
          angle={0}
          animate={{enabled: true, durationMillisec: 600}}
        />
      </button>

    </div>
  )
}
