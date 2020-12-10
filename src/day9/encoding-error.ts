import { SEQ } from './data';

export const findNumberInSequence = (input: string, preambule: number): number => {
  const list = input.split('\n').map(it => parseInt(it, 10));

  for (let i = preambule; i < list.length; i++) {
    const curr = list[i];

    if (!isSumOfTwoNumbers(list.slice(i - preambule, i), curr)) {
      return curr;
    }
  }
}

const isSumOfTwoNumbers = (array: number[], sum: number): boolean => {
  const set = new Set(array);

  for (let i = 0; i < array.length; i++) {
    if (set.has(sum - array[i])) {
      return true;
    }
  }

  return false;
}

export const findSequenceSum = (input: string, preambule: number): number => {
  const list = input.split('\n').map(it => parseInt(it, 10));
  const sum = findNumberInSequence(input, preambule);
  const rightIndex = list.indexOf(sum);
  let set; 

  for (let i = 0; i < list.slice(0, rightIndex).length; i++) {
    const result = findNumbersForSum(list.slice(i, rightIndex), sum);

    if (result) {
      set = result;
      break;
    }
  }

  return Math.min(...set) + Math.max(...set);
}

const findNumbersForSum = (array: number[], sum: number): any => {
  const seq = [array[0]];
  
  for (let i = 1; i < array.length; i++) {
    const res = seq.reduce((acc, it) => acc + it) + array[i];
    seq.push(array[i]);

    if (res === sum) {
      return seq;
    }
  }

  return null;
}

export const execute = (): void => {
  console.log('DAY 9: Encoding Error -------------------------');
  console.log('Part 1: ', findNumberInSequence(SEQ, 25));
  console.log('Part 2: ', findSequenceSum(SEQ, 25));
}