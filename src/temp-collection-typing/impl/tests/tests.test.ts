import { AddResultEnum } from "../../declare/FnAddType/types";
import { FindResultEnum } from "../../declare/FnFindType/types";
import { IdType } from "../../types";
import { Collection } from "../collection";
import { ImplFindErrorEnum } from "../enums";

interface ElemType extends IdType {
  some: string;
}

const elems: ElemType[] = [
  { id: "id1", some: "some-1" },
  { id: "id2", some: "some-2" },
  { id: "id3", some: "some-3" },
];

const collection = new Collection<ElemType>(elems);

describe("find", () => {
  it("find - finded", async () => {
    const result = await collection.find("id1");
    expect(result._tag).toEqual(FindResultEnum.FINDED);
  });
  it("find - not finded", async () => {
    const result = await collection.find("---");
    expect(result._tag).toEqual(FindResultEnum.NO_FINDED);
  });
  it("find - error; empty id", async () => {
    const result = await collection.find("");
    expect(result._tag).toEqual(FindResultEnum.FIND_ERROR);
    if (result._tag === FindResultEnum.FIND_ERROR) {
      expect(result.code).toEqual(ImplFindErrorEnum.ID_WRONG);
    }
  });
});

describe("findMulti", () => {
  it("finded all", async () => {
    const result = await collection.findMulti(["id1", "id2"]);
    expect(result).toHaveLength(2);
    result.forEach((el) => {
      expect(el._tag === FindResultEnum.FINDED);
    });
  });
  it("finded not all", async () => {
    const result = await collection.findMulti(["---", "id2"]);
    expect(result).toHaveLength(2);
    const res0 = result[0];
    expect(res0._tag).toEqual(FindResultEnum.NO_FINDED);
    const res1 = result[1];
    expect(res1._tag).toEqual(FindResultEnum.FINDED);
  });
  it("error", async () => {
    const result = await collection.findMulti(["", "id2"]);
    expect(result).toHaveLength(2);

    const res0 = result[0];
    expect(res0._tag).toEqual(FindResultEnum.FIND_ERROR);
    if (res0._tag === FindResultEnum.FIND_ERROR) {
      expect(res0.code).toEqual(ImplFindErrorEnum.ID_WRONG);
    }

    const res1 = result[1];
    expect(res1._tag).toEqual(FindResultEnum.FINDED);
  });
});

describe("add", () => {
  it("added", async () => {
    const val = "some-100";
    const elem: ElemType = { id: "id100", some: val };
    const result = await collection.add(elem);
    expect(elems).toHaveLength(4);
    expect(result._tag === AddResultEnum.SUCCESS);
    if (result._tag === AddResultEnum.SUCCESS) {
      expect(result.id).toBeTruthy();
      expect(result.addedElem.id).toBeTruthy();
      expect(result.addedElem.some).toEqual(val);
    }
  });
});
