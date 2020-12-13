import {parseInput, navigate, rotate, rotateWaypoint, navigatePart2} from '../src/day12/rain-risk';

const data =
`F10
N3
F7
R90
F11`;

const parsed = [
['F', 10],
['N', 3],
['F', 7],
['R', 90],
['F', 11]];

describe("Day 12: Rain Risk", () => {
  test("Parse input", () => {
    expect(parseInput('F10')).toEqual([['F', 10]]);
  })

  test("Turn ship to the given number of degrees", () => {
    expect(rotate('L', 90, {direction: 'E'})).toEqual({direction: 'N'});
    expect(rotate('L', 180, {direction: 'E'})).toEqual({direction: 'W'});
    expect(rotate('L', 270, {direction: 'W'})).toEqual({direction: 'N'});
    expect(rotate('L', 270, {direction: 'N'})).toEqual({direction: 'E'});
    expect(rotate('R', 180, {direction: 'S'})).toEqual({direction: 'N'});
    expect(rotate('R', 360, {direction: 'W'})).toEqual({direction: 'W'});
    expect(rotate('R', 270, {direction: 'W'})).toEqual({direction: 'S'});
    expect(rotate('R', 90, {direction: 'N'})).toEqual({direction: 'E'});
    expect(rotate('R', 180, {direction: 'N'})).toEqual({direction: 'S'});
    expect(rotate('R', 270, {direction: 'N'})).toEqual({direction: 'W'});
  })

  test("Turn waypoint to the given number of degrees", () => {
    expect(rotateWaypoint('R', 90, {north: 10, west: -4})).toEqual({north: -4, west: -10});
    expect(rotateWaypoint('R', 180, {north: 10, west: -4})).toEqual({north: -10, west: 4});
    expect(rotateWaypoint('R', 270, {north: 10, west: -4})).toEqual({north: 4, west: 10});
    expect(rotateWaypoint('L', 90, {north: 10, west: -4})).toEqual({north: 4, west: 10});
    expect(rotateWaypoint('L', 180, {north: 10, west: -4})).toEqual({north: -10, west: 4});
  })

  test("Move ship", () => {
    expect(navigate(data)).toBe(25);
    expect(navigatePart2(data)).toBe(286);
  });
});
