import { INSTRUCTIONS } from './data';

type Instruction = [string, number];
type Direction = 'E' | 'W' | 'N' | 'S';
type Turn = 'L' | 'R';
type Position = {north?: number, west?: number, direction?: Direction};

export const parseInput = (input: string): Instruction[] => {
  return input.split('\n')
              .map(it => it.match(/(\w)(\d+)/).slice(1))
              .map(([l, num]) => [l, parseInt(num)]);
}

export const last = (arr: any[]): any => arr[arr.length - 1];

export const navigate = (input: string): any => {
  const instructions = parseInput(input);
  let position: Position = {north: 0, west: 0, direction: 'E'};

  instructions.forEach(([name, arg]) => {
    if (['N', 'E', 'S', 'W'].includes(name)) {
      position = move([name, arg], position);
    }

    if (name === 'F') {
      position = move([position.direction, arg], position);
    }

    if (name === 'L' || name === 'R') {
      position = rotate(name, arg, position);
    }
  })

  const {north, west} = position;

  return Math.abs(north) + Math.abs(west);
}

export const navigatePart2 = (input: string): any => {
  const instructions = parseInput(input);

  let waypoint: Position = {north: 1, west: -10};
  let ship: Position = {north: 0, west: 0};

  instructions.forEach(([name, arg]) => {
    if (['N', 'E', 'S', 'W'].includes(name)) {
      waypoint = move([name, arg], waypoint);
    }

    if (name === 'L' || name === 'R') {
      waypoint = rotateWaypoint(name, arg, waypoint);
    }

    if (name === 'F') {
      const distance = { 
        north: waypoint.north * arg,
        west: waypoint.west * arg
      };

      ship = {
        north: ship.north + distance.north,
        west: ship.west + distance.west
      };
    }
  });

  return Math.abs(ship.north) + Math.abs(ship.west);
}

export const move = ([direction, steps]: Instruction, pos: Position): Position => {
  const position = {...pos};

  switch (direction) {
    case 'N': position.north += steps; break;
    case 'E': position.west  -= steps; break;
    case 'S': position.north -= steps; break;
    case 'W': position.west  += steps; break;
  }

  return position;
}


export const rotate = (turn: Turn, degree: number, pos: Position): Position => {
  const position = {...pos};
  const directions: Direction[] = ['N', 'E', 'S', 'W'];
  const index = directions.indexOf(position.direction);

  switch (turn) {
    case 'L': {
      const rolls = index - degree / 90;
      const directionIndex = rolls >= 0 ? rolls : rolls + directions.length;
      position.direction = directions[directionIndex];
      break;
    }
    case 'R': {
      const rolls = index + degree / 90;
      const directionIndex = rolls < directions.length ? rolls : rolls - directions.length;
      position.direction = directions[directionIndex];
      break;
    }
  }

  return position;
}
 
// Because of using north-west positioning in part one I decide to continue that calculations in the part 2 either.
export const rotateWaypoint = (turn: Turn, degree: number, waypoint: Position): Position => {
  const pos = {...waypoint};
  const directions: Direction[] = ['N', 'E', 'S', 'W'];

  const directionX = waypoint.north >= 0 ? 'N' : 'S';
  const directionY = waypoint.west >= 0 ? 'W' : 'E';

  switch (rotate(turn, degree, {direction: directionX}).direction) {
    case 'N': pos.north = Math.abs(waypoint.north); break;
    case 'S': pos.north = Math.abs(waypoint.north) * -1; break;
    case 'W': pos.west  = Math.abs(waypoint.north); break;
    case 'E': pos.west  = Math.abs(waypoint.north) * -1; break;
  }

  switch (rotate(turn, degree, {direction: directionY}).direction) {
    case 'N': pos.north = Math.abs(waypoint.west); break;
    case 'S': pos.north = Math.abs(waypoint.west) * -1; break;
    case 'W': pos.west  = Math.abs(waypoint.west); break;
    case 'E': pos.west  = Math.abs(waypoint.west) * -1; break;
  }

  return pos;
}

export const execute = (): void => {
  console.log('DAY 12: Rain Risk-------------------------');
  console.log('Part 1: ', navigate(INSTRUCTIONS));
  console.log('Part 2: ', navigatePart2(INSTRUCTIONS));
} 