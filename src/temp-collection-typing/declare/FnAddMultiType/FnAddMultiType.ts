import { IdType } from '../../types';
import { AddResultType } from '../FnAddType/types';

export type FnAddMultiType<T extends IdType, C> = (elems: T[]) => Promise<Array<AddResultType<T, C>>>;
