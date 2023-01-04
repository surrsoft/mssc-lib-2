import { Collection } from "./impl/collection";
import { T5TIdType } from "./types";

export type AElemType = T5TIdType & {
  some: string;
};
export const arr: AElemType[] = [
  {
    id: "id4",
    some: "hello",
  },
  {
    id: "id5",
    some: "hello-5",
  },
  {
    id: "id6",
    some: "hello-6",
  },
];

export const nxxTemp = () => {
  const col = new Collection(arr);
  const result = col.findMulti(["id4", "", "id1"]);
  console.log("!!-!!-!!  result {221225220344}\n", result); // del+

  // const findResult = find(arr, "");
  // console.log("!!-!!-!!  findResult {221225133507}\n", findResult); // del+
};
