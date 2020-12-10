import { countDiffs, countWays } from '../src/day10/adapter-array';
import { ADAPTERS } from '../src/day10/data';

const data = `16
10
15
5
1
11
7
19
6
12
4`;

describe("Day 10: Adapter array", () => {
  test("Count adapters", () => {
    expect(countDiffs(data)).toBe(7 * 5);
  });

  test("Count ways", () => {
    expect(countWays(data)).toBe(8);
  });
});