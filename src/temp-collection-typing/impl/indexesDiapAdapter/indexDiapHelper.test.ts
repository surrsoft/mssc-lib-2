import { indexesDiapAdapter } from "./indexesDiapAdapter";
import { TG1TDisEnum, TG1TInfoEnum } from './types';

describe("indexDiapHelper", () => {
  it("standard", () => {
    const result = indexesDiapAdapter(0, 1, 2);
    expect(result._tag).toEqual(TG1TDisEnum.BASE);
    if (result._tag === TG1TDisEnum.BASE) {
      expect(result.indexStart).toEqual(0);
      expect(result.indexEnd).toEqual(1);
      expect(result.infos).toHaveLength(0);
    }
  });

  it("len 0", () => {
    const result = indexesDiapAdapter(0, 1, 0);
    expect(result._tag).toEqual(TG1TDisEnum.EMPTY_ARR);
  });

  it("len -1", () => {
    const result = indexesDiapAdapter(0, 1, -1);
    expect(result._tag).toEqual(TG1TDisEnum.EMPTY_ARR);
  });

  it("indexStart -2", () => {
    const result = indexesDiapAdapter(-2, 2, 5);
    expect(result._tag).toEqual(TG1TDisEnum.BASE);
    if (result._tag === TG1TDisEnum.BASE) {
      expect(result.indexStart).toEqual(0);
      expect(result.indexEnd).toEqual(2);
      expect(result.infos).toHaveLength(1);
      expect(result.infos).toEqual(
        expect.arrayContaining([TG1TInfoEnum.INDEX_START_LESS_NIL])
      );
    }
  });

  it("indexEnd out of range", () => {
    const result = indexesDiapAdapter(2, 6, 5);
    expect(result._tag).toEqual(TG1TDisEnum.BASE);
    if (result._tag === TG1TDisEnum.BASE) {
      expect(result.indexStart).toEqual(2);
      expect(result.indexEnd).toEqual(5);
      expect(result.infos).toHaveLength(1);
      expect(result.infos).toEqual(
        expect.arrayContaining([TG1TInfoEnum.INDEX_END_GREAT_LEN])
      );
    }
  });

  it("indexEnd < indexStart", () => {
    const result = indexesDiapAdapter(4, 2, 5);
    console.log("!!-!!-!!  result {230103125216}\n", result); // del+
    expect(result._tag).toEqual(TG1TDisEnum.BASE);
    if (result._tag === TG1TDisEnum.BASE) {
      expect(result.indexStart).toEqual(4);
      expect(result.indexEnd).toEqual(5);
      expect(result.infos).toHaveLength(1);
      expect(result.infos).toEqual(
        expect.arrayContaining([TG1TInfoEnum.END_GREAT_START])
      );
    }
  });

  it("indexEnd === indexStart", () => {
    const result = indexesDiapAdapter(2, 2, 5);
    console.log("!!-!!-!!  result {230103125216}\n", result); // del+
    expect(result._tag).toEqual(TG1TDisEnum.BASE);
    if (result._tag === TG1TDisEnum.BASE) {
      expect(result.indexStart).toEqual(2);
      expect(result.indexEnd).toEqual(3);
      expect(result.infos).toHaveLength(1);
      expect(result.infos).toEqual(
        expect.arrayContaining([TG1TInfoEnum.END_EQUAL_START])
      );
    }
  });

  it("indexStart > len", () => {
    const result = indexesDiapAdapter(7, 9, 5);
    expect(result._tag).toEqual(TG1TDisEnum.BASE);
    if (result._tag === TG1TDisEnum.BASE) {
      expect(result.indexStart).toEqual(4);
      expect(result.indexEnd).toEqual(5);
      expect(result.infos).toHaveLength(1);
      expect(result.infos).toEqual(
        expect.arrayContaining([TG1TInfoEnum.INDEX_START_GREAT_OR_EQ_LEN])
      );
    }
  });

  it("1 1 1", () => {
    const result = indexesDiapAdapter(1, 1, 1);
    expect(result._tag).toEqual(TG1TDisEnum.BASE);
    if (result._tag === TG1TDisEnum.BASE) {
      expect(result.indexStart).toEqual(0);
      expect(result.indexEnd).toEqual(1);
      expect(result.infos).toHaveLength(1);
      expect(result.infos).toEqual(
        expect.arrayContaining([TG1TInfoEnum.INDEX_START_GREAT_OR_EQ_LEN])
      );
    }
  });
});
