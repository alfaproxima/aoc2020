import { TICKETS } from './data';

const parseInput = (input: string): string[] => {
  return input.split('\n');
}

// Range string presented as bite sequence (128-bits integer), where F is low bite (0) and B is high (1).
// So we could just transform those F..B to 1 or 0 respectively and parse int
// Exact same way for RL sequence
export const rowInRange = (range: string): number => {
  const group = range.slice(0, 7);
  return parseInt(group.replace(/F/g, '0').replace(/B/g, '1'), 2);
}

export const columnInRange = (range: string): number => {
  const group = range.slice(-3);
  return parseInt(group.replace(/L/g, '0').replace(/R/g, '1'), 2);
}

export const getSeatId = (row: number, column: number): number => {
  return row * 8 + column;
}

export const parseSeatId = (ticket: string): number => {
  return parseInt(ticket
    .replace(/F/g, '0').replace(/B/g, '1')
    .replace(/L/g, '0').replace(/R/g, '1'), 2);
}

export const findMaxIdInList = (input: string): number => {
  const tickets = parseInput(input);
  let maxId = 0;

  tickets.forEach(ticket => {
    const id = parseSeatId(ticket);
    maxId = maxId >= id ? maxId : id;
  });

  return maxId;
}

export const findMissingSeatId = (input: string): number => {
  const tickets = parseInput(input);
  const frontRow = 7;
  const backRow = 127 * 8;

  const ids = tickets
         .map(parseSeatId)
         .filter(id => id > frontRow && id < backRow)
         .sort();

  const missed = ids.find((id, i, arr) => arr[i + 1] - id === 2) + 1;

  return missed;
}

export const execute = () => {
  console.log('DAY 5: Binary Boarding  -------------------------');
  console.log('Part 1:', findMaxIdInList(TICKETS));
  console.log('Part 2:', findMissingSeatId(TICKETS));
}