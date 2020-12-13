import { DATA } from './data';

export const parseInput = (input: string): [number, number[], any[]] => {
  const [head, tail] = input.split('\n');
  const ids = tail.match(/\d+/g).map(it => parseInt(it));
  const idsWithEmpties = tail.split(',').map(it => {
    return isNaN(+it) ? 0 : parseInt(it);
  });
  return [parseInt(head), ids, idsWithEmpties];
}

export const findEarliestBusId = (input: string): number => {
  const [timestamp, ids] = parseInput(input);
  const timeMap = new Map<number, number>();

  ids.forEach(id => {
    const timeMax = Math.floor(timestamp / id) * id;
    const timeMin = Math.ceil(timestamp / id) * id;
    timeMap.set(timeMax, id);
    timeMap.set(timeMin, id);
  });

  let nearest: number;
  timeMap.forEach((id, time) => {
    if (time < timestamp) {
      return;
    }

    if (!nearest) {
      nearest = time;
    }

    const diffCurr = Math.abs(timestamp - nearest);
    const diffNew = Math.abs(timestamp - time);
    nearest = diffNew < diffCurr ? time : nearest;    
  });

  return (nearest - timestamp) * timeMap.get(nearest);
}

export const findSequenceTimestamp = (input: string): number => {
  const [ids]: any[] = parseInput(input).slice(2);

  let timestamp = 0;
  let id = 1;
  let i = ids[0];

  while (true) {
    const curId = ids[id];

    if (curId === 0) {
      id += 1;
      continue;
    }

    if ((timestamp + id) % curId === 0) {
      i *= curId;
      id += 1;
    }

    if (id >= ids.length) {
      break;
    }

    timestamp += i;
  }

  return timestamp;
}

export const execute = () => {
  console.log('DAY 13: Shuttle Search -------------------------');
  console.log('Part 1: ', findEarliestBusId(DATA));
  console.log('Part 2: ', findSequenceTimestamp(DATA));
}