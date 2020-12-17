import { parseInput, findInvalidValuesAndSum, translateTicket, isValidValues, Option } from '../src/day16/ticket-translation';

const data =
`class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

const data2 =
`class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`;

const rules = [[1, 3], [5, 7], [6, 11], [33, 44], [13, 40], [45, 50]] as Option[];

describe("Day 16: Ticket Translation", () => {
  const parsedData = parseInput(data);

  test("Parse rules", () => {
    expect(parsedData.rules[0]).toEqual({name: 'class', params: [[1, 3], [5, 7]]});
  });

  test("Parse your ticket", () => {
    expect(parsedData.your).toEqual([7, 1, 14]);
  });

  test("Parse nearby tickets", () => {
    expect(parsedData.nearby[0]).toEqual([7, 3, 47]);
  });

  test("Validate one ticket", () => {
    expect(isValidValues([40, 4, 50], rules)).toBe(false);
    expect(isValidValues([7, 3, 47], rules)).toBe(true);
  });

  test("Find all invalid values", () => {
    expect(findInvalidValuesAndSum(data)).toBe(71);
  });

  test("Translate ticket", () => {
    expect(translateTicket(data2, /class/)).toBe(12);
    expect(translateTicket(data2, /row/)).toBe(11);
    expect(translateTicket(data2, /seat/)).toBe(13);
  });
});
