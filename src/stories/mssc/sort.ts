import { RsuvEnSort } from 'rsuv-lib';
import { EnField } from './EnField';
import { BrSelectSortData } from '../../MsscList/commonUI/BrSelect/brSelectUtils';
import { MsscColumnName } from '../../MsscList/msscUtils/MsscColumnName';

export const sortDataSTA = {
  selectedId: 'date-create_desc',
  items: [
    {idElem: 'default', direction: RsuvEnSort.ASC, text: 'по умолчанию', payload: ''},
    {
      idElem: 'date-create_asc',
      direction: RsuvEnSort.ASC,
      text: 'дата создания (от старых к свежим)',
      payload: EnField.TIME_CREATED
    },
    {
      idElem: 'date-create_desc',
      direction: RsuvEnSort.DESC,
      text: 'дата создания (от свежих к старым)',
      payload: EnField.TIME_CREATED
    },
    {idElem: 'title_asc', direction: RsuvEnSort.ASC, text: 'заголовок (по возрастанию)', payload: EnField.TITLE},
    {idElem: 'title_desc', direction: RsuvEnSort.DESC, text: 'заголовок (по убыванию)', payload: EnField.TITLE},
    {
      idElem: 'time-last-modif_asc',
      direction: RsuvEnSort.ASC,
      text: 'дата последнего изменения (от старых правок к свежим)',
      payload: EnField.TIME_LAST_MODIFIED
    },
    {
      idElem: 'time-last-modif_desc',
      direction: RsuvEnSort.DESC,
      text: 'дата последнего изменения (от свежих правок к старым)',
      payload: EnField.TIME_LAST_MODIFIED
    },
  ]
} as BrSelectSortData<MsscColumnName>
