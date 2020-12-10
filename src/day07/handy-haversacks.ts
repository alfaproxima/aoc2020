import {RULES} from './data';

type Bags = { [name: string]: string[] };
type BagsCount = { [name: string]: [number, string][] };

export const parseInput = (input: string): Bags => {
  const lines = input.replace(/\./g, '').split('\n');

  return lines.reduce((obj, line) => {
    const [parent, children] = line.split(' contain ');
    const name = parent.replace(' bags', '').trim();
    const contains = children.replace(/ bags?|\d+ /g, '').split(', ');
    
    obj[name] = contains;
    return obj;
  }, {});
}

export const parseInput2 = (input: string): BagsCount => {
  const lines = input.replace(/\./g, '').split('\n');

  return lines.reduce((obj, line) => {
    const [parent, children] = line.split(' contain ');
    const name = parent.replace(' bags', '').trim();
    const contains = children.replace(/ bags?/g, '').split(', ');

    obj[name] = contains
      .filter(it => it.indexOf('no other') === -1)
      .map(it => it.match(/(\d+) (.*)/)?.slice(1))
      .map(([count, name]) => [parseInt(count, 10), name])

    return obj;
  }, {});
}

export const countBagsContainOne = (input: string, bag: string): number => {
  const bags: Bags = parseInput(input);
  return Object.keys(bags).filter(it => hasBag(bags, it, bag)).length;
}

const hasBag = (bags: Bags, current: string, query: string): any => {
  if (current === 'no other') {
    return false;
  }

  if (bags[current].includes(query)) {
    return true;
  }

  return bags[current]
    .map(it => hasBag(bags, it, query))
    .some(it => it === true);
}

export const countBagsInOne = (input: string, bag: string): number => {
  const bagsArray: BagsCount = parseInput2(input);
  return countBags(bagsArray, bag);
}

const countBags = (bags: BagsCount, current: string): number => {
  if (bags[current].length === 0) {
    return 0;
  }

  return bags[current].reduce((acc, [count, name]) => {
    return acc + (count + count * countBags(bags, name));
  }, 0);
}

export const execute = (): void => {
  console.log('DAY 7: Handy Haversacks  -------------------------');
  console.log('Part 1: ', countBagsContainOne(RULES, 'shiny gold'));
  console.log('Part 2: ', countBagsInOne(RULES, 'shiny gold'));
}