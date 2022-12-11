import { RsuvEnSort } from 'rsuv-lib';
import { EnAirField } from './sourceAir/EnAirField';
import { BrSelectSortDataType } from '../../MsscList/commonUI/BrSelect/types';
import { MsscColumnNameType } from '../../MsscList/types/types/MsscColumnNameType';

export const sortDataSTA: BrSelectSortDataType<MsscColumnNameType> = {
  selectedId: 'date-create_desc',
  items: [
    { idElem: 'default', direction: RsuvEnSort.ASC, text: 'по умолчанию', payload: '' },
    {
      idElem: 'date-create_asc',
      direction: RsuvEnSort.ASC,
      text: 'дата создания (от старых к свежим)',
      payload: EnAirField.TIME_CREATED
    },
    {
      idElem: 'date-create_desc',
      direction: RsuvEnSort.DESC,
      text: 'дата создания (от свежих к старым)',
      payload: EnAirField.TIME_CREATED
    },
    { idElem: 'title_asc', direction: RsuvEnSort.ASC, text: 'заголовок (по возрастанию)', payload: EnAirField.TITLE },
    { idElem: 'title_desc', direction: RsuvEnSort.DESC, text: 'заголовок (по убыванию)', payload: EnAirField.TITLE },
    {
      idElem: 'time-last-modif_asc',
      direction: RsuvEnSort.ASC,
      text: 'дата последнего изменения (от старых правок к свежим)',
      payload: EnAirField.TIME_LAST_MODIFIED
    },
    {
      idElem: 'time-last-modif_desc',
      direction: RsuvEnSort.DESC,
      text: 'дата последнего изменения (от свежих правок к старым)',
      payload: EnAirField.TIME_LAST_MODIFIED
    },
  ]
}
