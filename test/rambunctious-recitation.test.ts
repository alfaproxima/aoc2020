import { play } from '../src/day15/rambunctious-recitation';
import { GAME } from '../src/day15/data';
const data = `0,3,6`;

describe("Day 15: Rambunctious Recitation", () => {
  test("Get 2020th number in the game", () => {
    expect(play(data, 2020)).toBe(436);
  });

  test("Get 30000000 number in the game", () => {
    expect(play(data, 30000000)).toBe(175594);
  });
});