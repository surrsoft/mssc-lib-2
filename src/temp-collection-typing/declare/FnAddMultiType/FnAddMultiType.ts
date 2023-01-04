import { T5TIdType } from '../../types';
import { TG4TResultType } from '../FnAddType/types';

export type FnAddMultiType<T extends T5TIdType, C> = (elems: T[]) => Promise<Array<TG4TResultType<T, C>>>;
