import { GAME } from './data';

const parseInput = (input: string): number[] => {
  return input.split(',').map(n => parseInt(n));
};

export const play = (input: string, gameLength: number): any => {
  const numbers = parseInput(input);
  const turns = [0];
  const spokenlast = new Map<number, number>();

  numbers.forEach((num, i) => {
    turns.push(num);
    spokenlast.set(num, i + 1);
  });

  for(let i = turns.length; i <= gameLength; i++) {
    const prevNumber = turns[i - 1];
    let lastTurn = spokenlast.get(prevNumber);
    let shout = 0;

    if (lastTurn && lastTurn !== i - 1) {
      shout = (i - 1) - lastTurn;
    }

    spokenlast.set(prevNumber, i - 1);
    turns.push(shout);
  }

  return turns[turns.length - 1];
}

export const execute = () => {
  console.log('DAY 15: Rambunctious Recitation -------------------------');
  console.log('Part 1: ', play(GAME, 2020));
  console.log('Part 2: ', play(GAME, 30000000));
}