import { findEarliestBusId, findSequenceTimestamp } from '../src/day13/shuttle-search';
import { DATA } from '../src/day13/data';

const data =
`939
7,13,x,x,59,x,31,19`;

describe("Day 13: Shuttle Search", () => {
  test("Find the ID of earliest bus", () => {
    expect(findEarliestBusId(data)).toBe(295);
  });

  test("Find timestamp when the sequence starts", () => {
    expect(findSequenceTimestamp(data)).toBe(1068781);
  });
});