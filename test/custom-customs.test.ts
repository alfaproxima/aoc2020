import { countUniqueAnswersInGroup, sumAllUniqueAnswers, sumAllAnswers } from '../src/day6/custom-customs';

const group = `abcx
abcy
abcz`;

const input = `abc

a
b
c

ab
ac

a
a
a
a

b`;

describe("Day 6: Custom customs", () => {
  test("Count unique answers in group", () => {
    expect(countUniqueAnswersInGroup(group)).toBe(6);
  });

  test("Count all unique answers", () => {
    expect(sumAllUniqueAnswers(input)).toBe(11);
  });

  test("Count all answers", () => {
    expect(sumAllAnswers(input)).toBe(6);
  });
});