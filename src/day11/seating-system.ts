import { SEATINGS } from './data';

type SeatMap = string[];

export const parseInput = (input: string): SeatMap => input.split('\n');

export const last = (array: any[]): any => array[array.length - 1];

export const iterateThroughMap = (map: SeatMap, applyFn: (i, a) => string): SeatMap => {
  const state: SeatMap[] = [map]; 

  while(!compareLastState(state)) {
    state.push(
      last(state).map((line, i, arr) => applyFn(i, arr)));
  }

  return last(state);
}


export const applyRules = (index: number, map: SeatMap): string => {
  const line = map[index].split('');

  return line.map((it, i) => {
    let occupiedCount = 0;

    const prevLine = map[index - 1];
    const nextLine = map[index + 1];
    
    if (prevLine) {
      prevLine[i - 1] === '#' && occupiedCount++;
      prevLine[i + 1] === '#' && occupiedCount++;
      prevLine[i] === '#' && occupiedCount++;
    }

    if (nextLine) {
      nextLine[i - 1] === '#' && occupiedCount++;
      nextLine[i + 1] === '#' && occupiedCount++;
      nextLine[i] === '#' && occupiedCount++;
    }

    line[i - 1] === '#' && occupiedCount++;
    line[i + 1] === '#' && occupiedCount++;

    if (it === 'L' && occupiedCount === 0) {
      return '#';
    }

    if (it === '#' && occupiedCount >= 4) {
      return 'L';
    }

    return it;    
  }).join('');
}

export const applyRulesPart2 = (index: number, map: SeatMap): string => {
  const line = map[index].split('');
  const height = map.length - 1;
  const width = line.length - 1;

  return line.map((it, i) => {
    if (it === '.') {
      return it;
    }

    let occupiedCount = 0;
    const directions = [
      {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1},
      {x: -1, y:  0},                {x: 1, y:  0},
      {x: -1, y:  1}, {x: 0, y:  1}, {x: 1, y:  1},
    ];

    directions.forEach(({x, y}) => {
      let posx = i + x;
      let posy = index + y;

      while ((posy <= height && posy >= 0) && (posx <= width && posx >= 0)) {
        if (map[posy][posx] === '#') {
          occupiedCount++;
          break;
        }

        if (map[posy][posx] === 'L') {
          break;
        }

        posx += x;
        posy += y;
      }
    });

    if (it === 'L' && occupiedCount === 0) {
      return '#';
    }

    if (it === '#' && occupiedCount >= 5) {
      return 'L';
    }

    return it;
  }).join('');
} 

export const compareLastState = (state: SeatMap[]): boolean => {
  const cur = state[state.length - 1];
  const last = state[state.length - 2];

  if (cur && last) {
    return cur.join('') === last.join('');
  }
   
  return false;
}

export const countOccupiedSeats = (input: string, applyFn: (i, a) => string): number => {
  const map = iterateThroughMap(parseInput(input), applyFn);
  return [...map.join('')].reduce((acc, it) => it === '#' ? acc + 1 : acc, 0);
}


export const execute = (): void => {
  console.log('DAY 11: Seating System -------------------------');
  console.log('Part 1: ', countOccupiedSeats(SEATINGS, applyRules));
  console.log('Part 2: ', countOccupiedSeats(SEATINGS, applyRulesPart2));
}