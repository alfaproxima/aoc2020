import { parseInput, repeatRow, findMarkAtPosition, findTrajectory, countTrees } from '../src/day3/trajectory';

const rowData = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

const parsedData = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#'
];

describe("Day 3: Toboggan Trajectory", () => {

  test("Find mark in a map by position", () => {
    expect(findMarkAtPosition('..#.#', 1)).toBe('.');
    expect(findMarkAtPosition('..#.#', 2)).toBe('.');
    expect(findMarkAtPosition('..#.#', 3)).toBe('#');
    expect(findMarkAtPosition('..#.#', 13)).toBe('#');
    expect(findMarkAtPosition('..#.#', 13)).toBe('#');
    expect(findMarkAtPosition('..#.#', 12)).toBe('.');
  });

  test("Find trajectory", () => {
    expect(findTrajectory(parsedData, {right: 3, down: 1})).toEqual(['.', '.', '#', '.', '#', '#', '.', '#', '#', '#', '#']);
    expect(findTrajectory(parsedData, {right: 3, down: 1})).not.toEqual([".", "#", "#", ".", "#", "#", ".", "#", "#", "#", "#"]);
  });

  test("Count trees", () => {
    expect(countTrees(rowData, {right: 1, down: 1})).toBe(2);
    expect(countTrees(rowData, {right: 3, down: 1})).toBe(7);
    expect(countTrees(rowData, {right: 5, down: 1})).toBe(3);
    expect(countTrees(rowData, {right: 7, down: 1})).toBe(4);
    expect(countTrees(rowData, {right: 1, down: 2})).toBe(2);
  })
});

