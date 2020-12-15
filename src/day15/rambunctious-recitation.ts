import { GAME } from './data';

const parseInput = (input: string): number[] => {
  return input.split(',').map(n => parseInt(n));
};

export const play = (input: string, gameLength: number): any => {
  const numbers = parseInput(input);
  const spokenlast = new Map<number, number>();
  let turn = numbers[numbers.length - 1];

  numbers.forEach((num, i) => {
    spokenlast.set(num, i + 1);
  });

  for(let i = numbers.length + 1; i <= gameLength; i++) {
    const prevNumber = turn;
    let lastTurn = spokenlast.get(prevNumber);
    let shout = 0;

    if (lastTurn && lastTurn !== i - 1) {
      shout = (i - 1) - lastTurn;
    }

    spokenlast.set(prevNumber, i - 1);
    turn = shout;
  }

  return turn;
}

export const execute = () => {
  console.log('DAY 15: Rambunctious Recitation -------------------------');
  console.log('Part 1: ', play(GAME, 2020));
  console.log('Part 2: ', play(GAME, 30000000));
}