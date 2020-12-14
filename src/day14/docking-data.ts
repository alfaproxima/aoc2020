import { PROGRAM } from './data';

type Memory = Map<number, number>;

export const parseInput = (input: string): string[] => {
  return input.split('\n');
}

export const parseMask = (input: string): string => {
  return input.split(' = ')[1];
}

export const parseCommand = (input: string): [number, number] => {
  return input.match(/\[(\d+)\]\s=\s(\d+)/).slice(1).map(it => parseInt(it)) as [number, number];
}

export const applyMask = (mask: string, value: number): number => {
  const num = value.toString(2).padStart(36, '0');

  const newValue =  [...mask].map((char, i) => {
    return char === 'X' ? num[i] : char;
  }).join('');

  return parseInt(newValue, 2);
}

export const runProgramPart1 = (input: string): any => {
  const lines = parseInput(input);
  const memory: Memory = new Map();
  let mask: string;

  lines.forEach(line => {
    if (line.indexOf('mask') > -1) {
      mask = parseMask(line);
      return;
    }

    const [address, value] = parseCommand(line);
    memory.set(address, applyMask(mask, value));
  });

  return [...memory].reduce((acc, it) => acc + it[1], 0);
}

export const runProgramPart2 = (input: string): any => {
  const lines = parseInput(input);
  const memory: Memory = new Map();
  let mask: string;

  lines.forEach(line => {
    if (line.indexOf('mask') > -1) {
      mask = parseMask(line);
      return;
    }

    const [address, value] = parseCommand(line);
    const addresses = getAddressCombinations(mask, address);
    addresses.forEach(addr => memory.set(addr, value));
  });

  return [...memory].reduce((acc, it) => acc + it[1], 0);
}

export const getAddressCombinations = (mask: string, address: number): any => {
  let combinations = [''];
  const binAddress = address.toString(2).padStart(36, '0');

  [...mask].forEach((char, i) => {
    if (char === 'X') {
      const len = combinations.length;

      for (let i = 0; i < len; i++) {
        const comb = combinations.shift() || '';
        combinations.push(comb + '0');
        combinations.push(comb + '1');
      }
    }

    if (char === '1') {
      combinations = combinations.map(comb => comb + '1');
    }

    if (char === '0') {
      combinations = combinations.map(comb => comb + binAddress[i]);
    }
  });

  return combinations;
}

export const execute = () => {
  console.log('DAY 14: Dockin Data -------------------------');
  console.log('Part 1: ', runProgramPart1(PROGRAM));
  console.log('Part 2: ', runProgramPart2(PROGRAM));
}