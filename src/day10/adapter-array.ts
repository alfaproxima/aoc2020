import { ADAPTERS } from './data';

export const countDiffs = (input: string): number => {
  const adapters = input.split('\n').map(it => parseInt(it, 10)).sort((a, b) => a - b);
  let d1 = 0;
  let d3 = 1;

  adapters.reduce((acc, it) => {
    const diff = it - acc;

    if (diff === 1) {
      d1++;
    }

    if (diff === 3) {
      d3++;
    }

    return it;
  }, 0);

  return d1 * d3;
}


export const countWays = (input: string): number => {
  let adapters = input.split('\n').map(it => parseInt(it, 10)).sort((a, b) => a - b);;
  adapters.unshift(0);
  adapters.push(atLastIndex(adapters) + 3);

  const paths = new Map();

  adapters.forEach(it => paths.set(it, 0));
  paths.set(0, 1);

  adapters.forEach(adapter => {
    [1, 2, 3].forEach(diff => {
      const closest = paths.get(adapter + diff);
      const curr = paths.get(adapter);

      if (paths.has(adapter + diff)) {
        paths.set(adapter + diff, closest + curr);
      }
    });
  });

  return paths.get(atLastIndex(adapters));
}

const atLastIndex = (array: any[]): number => array[array.length - 1];

export const execute = (): void => {
  console.log('DAY 10: Adapter array -------------------------');
  console.log('Part 1: ', countDiffs(ADAPTERS));
  console.log('Part 2: ', countWays(ADAPTERS));
}