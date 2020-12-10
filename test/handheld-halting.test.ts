import { parseInput, run, runWithFix } from '../src/day8/handheld-halting';
import { INSTRUCTIONS } from '../src/day8/data';

const data = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

const data2 = `nop 0
acc +3
acc +2
acc -1`;

describe("Day 8: Handheld halting", () => {
  test("Parse data", () => {
    expect(parseInput(data)[1]).toEqual(['acc', 1]);
  });

  test("Execute commands without loop", () => {
    expect(run(data2)).toBe(4);
  });

  test("Execute commands with infinite loop", () => {
    expect(run(data)).toBe(5);
  });

  test("Execute commands with infinite loop and fix procedures", () => {
    expect(runWithFix(data)).toBe(8);
  });
})