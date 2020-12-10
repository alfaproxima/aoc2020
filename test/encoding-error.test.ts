import { findNumberInSequence, findSequenceSum } from '../src/day9/encoding-error';

const data = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

describe("Day 9: Encoding Error", () => {
  test("Find first number, that isn't sum of 2 numbers from 5 before", () => {
    expect(findNumberInSequence(data, 5)).toBe(127);
  });

  test("Find a contiguous set of at least two numbers which sum to the invalid number", () => {
    expect(findSequenceSum(data, 5)).toBe(62);
  })
});