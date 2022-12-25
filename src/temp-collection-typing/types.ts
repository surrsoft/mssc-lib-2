import { Collection } from './impl/collection';
import { find } from "./impl/find/find";

export interface IdType {
  id: string;
}

export type AElemType = IdType & {
  some: string;
};

export const arr: AElemType[] = [
  {
    id: "id4",
    some: "hello",
  },
];

export const nxxTemp = () => {
  const col = new Collection(arr)
  const result = col.find('id4')
  console.log('!!-!!-!!  result {221225220344}\n', result); // del+
  // const findResult = find(arr, "");
  // console.log("!!-!!-!!  findResult {221225133507}\n", findResult); // del+
};
