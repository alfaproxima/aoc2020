import { applyRules, applyRulesPart2, iterateThroughMap, countOccupiedSeats } from '../src/day11/seating-system';

const input =
`L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

const iterated = 
['#.#L.L#.##',
'#LLL#LL.L#',
'L.#.L..#..',
'#L##.##.L#',
'#.#L.LL.LL',
'#.#L#L#.##',
'..L.L.....',
'#L#L##L#L#',
'#.LLLLLL.L',
'#.#L#L#.##']

const parsed =
['L.LL.LL.LL',
'LLLLLLL.LL',
'L.L.L..L..',
'LLLL.LL.LL',
'L.LL.LL.LL',
'L.LLLLL.LL',
'..L.L.....',
'LLLLLLLLLL',
'L.LLLLLL.L',
'L.LLLLL.LL'];

describe("Day 11: Seating System", () => {
  test("Apply rules to given line", () => {
    expect(applyRules(0, parsed)).toBe('#.##.##.##');
  })

  test("Iterate map", () => {
    expect(iterateThroughMap(parsed, applyRules)).toEqual(iterated);
  })

  test("Count occupied seats", () => {
    expect(countOccupiedSeats(input, applyRules)).toBe(37);
  })

  test("Apply rules to given line part 2", () => {
    expect(countOccupiedSeats(input, applyRulesPart2)).toBe(26);
  })
});

