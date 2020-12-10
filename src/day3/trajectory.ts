import { TRAJECTORY_MAP } from './data';

type TrajectoryMap = string[];
type Mark = '.' | '#';
type Steps = {right: number, down: number};

export const parseInput = (input: string): TrajectoryMap => input.split('\n');

export const findMarkAtPosition = (row: string, position: number): Mark => {
  const times = Math.floor(position / row.length + 1) || 1;
  return row.repeat(times).charAt(position - 1) as Mark;
}

export const findTrajectory = (map: TrajectoryMap, {right, down}: Steps): TrajectoryMap => {
  let trajectory = [];

  for (let i = 0; i < map.length; i += down) {
    const position = i * right / down + 1;
    const row = map[i];

    trajectory.push(findMarkAtPosition(row, position));
  }

  return trajectory;
}

export const countTrees = (input: string, steps: Steps): number => {
  return findTrajectory(parseInput(input), steps).filter(it => it === '#').length;
}

const multiplyResults = () => {
  const result = [];
  result.push(countTrees(TRAJECTORY_MAP, {right: 1, down: 1}));
  result.push(countTrees(TRAJECTORY_MAP, {right: 3, down: 1}));
  result.push(countTrees(TRAJECTORY_MAP, {right: 5, down: 1}));
  result.push(countTrees(TRAJECTORY_MAP, {right: 7, down: 1}));
  result.push(countTrees(TRAJECTORY_MAP, {right: 1, down: 2}));

  return result.reduce((acc, res) => res * acc, 1);
}

export const execute = () => {
  console.log('DAY 3: Toboggan Trajectory  -------------------------');
  console.log('Part one: ', countTrees(TRAJECTORY_MAP, {right: 3, down: 1}));
  console.log('Part two: ', multiplyResults());
}
