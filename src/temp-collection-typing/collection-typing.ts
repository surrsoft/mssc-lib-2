type CollectionType = ElemType[];

interface ElemType {
  id: string;

  [key: string]: any;
}

interface FindSuccessType<T extends ElemType> {
  _tag: 'finded'
  elemIndex: number;
  elem: T
}

interface FindNoType {
  _tag: 'no_finded'
}

type FindErrCode = 'id_wrong'

interface FindErrorKnownType {
  _tag: 'find_error',
  code: FindErrCode,
  desc?: string
}

type FindResultType<T extends ElemType> = FindSuccessType<T> | FindNoType | FindErrorKnownType;

type AElemType = ElemType & {
  some: string
}

const find = <T extends ElemType>(collection: T[], id: string): FindResultType<T> => {
  if (id.length < 1) {
    return {
      _tag: 'find_error',
      code: 'id_wrong',
      desc: ''
    };
  }

  const index = collection.findIndex(el => el.id === id)
  if (index !== -1) {
    return { _tag: 'finded', elemIndex: index, elem: collection[index] };
  }

  return {
    _tag: 'no_finded'
  };
}

const arr: AElemType[] = [{
  id: 'id4',
  some: 'hello'
}]

find(arr, 'x1')


