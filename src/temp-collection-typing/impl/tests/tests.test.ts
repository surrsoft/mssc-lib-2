import { TG4TDisEnum } from "../../declare/FnAddType/types";
import { TG2TDisEnum } from "../../declare/FnElemsGet/FnElemsGetType";
import { TG3TDisEnum } from "../../declare/FnFindType/types";
import { T5TIdType } from "../../types";
import { Collection } from "../collection";
import { ImplFindErrorEnum } from "../enums";
import { TG1TDisEnum, TG1TInfoEnum } from "../utils/indexesDiapAdapter/types";

interface ElemType extends T5TIdType {
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
    expect(result._tag).toEqual(TG3TDisEnum.TG3T_DIS_FINDED);
  });
  it("find - not finded", async () => {
    const result = await collection.find("---");
    expect(result._tag).toEqual(TG3TDisEnum.TG3T_DIS_NO_FINDED);
  });
  it("find - error; empty id", async () => {
    const result = await collection.find("");
    expect(result._tag).toEqual(TG3TDisEnum.TG3T_DIS_FIND_ERROR);
    if (result._tag === TG3TDisEnum.TG3T_DIS_FIND_ERROR) {
      expect(result.code).toEqual(ImplFindErrorEnum.ID_WRONG);
    }
  });
});

describe("findMulti", () => {
  it("finded all", async () => {
    const result = await collection.findMulti(["id1", "id2"]);
    expect(result).toHaveLength(2);
    result.forEach((el) => {
      expect(el._tag === TG3TDisEnum.TG3T_DIS_FINDED);
    });
  });
  it("finded not all", async () => {
    const result = await collection.findMulti(["---", "id2"]);
    expect(result).toHaveLength(2);
    const res0 = result[0];
    expect(res0._tag).toEqual(TG3TDisEnum.TG3T_DIS_NO_FINDED);
    const res1 = result[1];
    expect(res1._tag).toEqual(TG3TDisEnum.TG3T_DIS_FINDED);
  });
  it("error", async () => {
    const result = await collection.findMulti(["", "id2"]);
    expect(result).toHaveLength(2);

    const res0 = result[0];
    expect(res0._tag).toEqual(TG3TDisEnum.TG3T_DIS_FIND_ERROR);
    if (res0._tag === TG3TDisEnum.TG3T_DIS_FIND_ERROR) {
      expect(res0.code).toEqual(ImplFindErrorEnum.ID_WRONG);
    }

    const res1 = result[1];
    expect(res1._tag).toEqual(TG3TDisEnum.TG3T_DIS_FINDED);
  });
});

describe("add", () => {
  it("added", async () => {
    const val = "some-100";
    const elem: ElemType = { id: "id100", some: val };
    const result = await collection.add(elem);
    expect(elems).toHaveLength(4);
    expect(result._tag === TG4TDisEnum.TG4T_DIS_SUCCESS);
    if (result._tag === TG4TDisEnum.TG4T_DIS_SUCCESS) {
      expect(result.id).toBeTruthy();
      expect(result.addedElem.id).toBeTruthy();
      expect(result.addedElem.some).toEqual(val);
    }
  });
});

describe("elemsGet", () => {
  it("standard", async () => {
    const result = await collection.elemsGet(1, 2);
    expect(result._tag).toEqual(TG2TDisEnum.TG2T_DIS_SUCCESS);
    if (result._tag === TG2TDisEnum.TG2T_DIS_SUCCESS) {
      expect(result.elems).toHaveLength(1);
      expect(result.elems[0].id).toEqual(elems[1].id);
    }
  });

  it("indexEnd out of lenght", async () => {
    const result = await collection.elemsGet(2, 5);
    expect(result._tag).toEqual(TG2TDisEnum.TG2T_DIS_SUCCESS);
    if (result._tag === TG2TDisEnum.TG2T_DIS_SUCCESS) {
      expect(result.elems).toHaveLength(1);
      expect(result.elems[0].id).toEqual(elems[2].id);
    }
  });

  it("indexEnd out of lenght", async () => {
    const result = await collection.elemsGet(7, 8);
    expect(result._tag).toEqual(TG2TDisEnum.TG2T_DIS_SUCCESS);
    if (result._tag === TG2TDisEnum.TG2T_DIS_SUCCESS) {
      expect(result.elems).toHaveLength(1);
      expect(result.elems[0].id).toEqual(elems[2].id);
      expect(result.indexAdaptInfo._tag).toEqual(TG1TDisEnum.TG1T_DIS_BASE);
      if (result.indexAdaptInfo._tag === TG1TDisEnum.TG1T_DIS_BASE) {
        expect(result.indexAdaptInfo.indexStart).toEqual(2);
        expect(result.indexAdaptInfo.indexEnd).toEqual(3);
        expect(result.indexAdaptInfo.infos).toEqual(
          expect.arrayContaining([
            TG1TInfoEnum.TG1T_INF_INDEX_START_GREAT_OR_EQ_LEN,
          ])
        );
      }
    }
  });
});
