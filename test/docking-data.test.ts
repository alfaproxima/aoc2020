import { applyMask, runProgramPart1, getAddressCombinations, runProgramPart2 } from '../src/day14/docking-data';

const data =
`mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

const data2 =
`mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;
describe("Day 14: Dickinf Data", () => {
  test("Apply mask to value", () => {
    expect(applyMask('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', 11)).toBe(73);
  });

  test("Run program part 1", () => {
    expect(runProgramPart1(data)).toBe(165);
  });

  test("Find combinations", () => {
    expect(getAddressCombinations('000000000000000000000000000000X1001X', 42).length).toBe(4);
  });

  test("Run program part2", () => {
    expect(runProgramPart2(data2)).toBe(208);
  });
});