import { rowInRange, columnInRange, getSeatId, findMaxIdInList } from '../src/day5/binary-boarding';

const data = `BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;

describe("Day 5: Binary bording", () => {
 
  test("Find row in a range - FBFBBFFRLR", () => {
    expect(rowInRange('FBFBBFFRLR')).toBe(44);
  });

  test("Find column in a range - FBFBBFFRLR", () => {
    expect(columnInRange('FBFBBFFRLR')).toBe(5);
  });

  test("Calculate seat ID - FBFBBFFRLR", () => {
    expect(getSeatId(44, 5)).toBe(357);
  });

  test("Calculate seat ID - BFFFBBFRRR", () => {
    expect(getSeatId(70, 7)).toBe(567);
  });

  test("Find max ID in list", () => {
    expect(findMaxIdInList(data)).toBe(820);
  });
});