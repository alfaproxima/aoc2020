import { ANSWERS } from './data';

export const sumAllUniqueAnswers = (input: string): number => {
  const groups = input.split('\n\n');
  return groups.reduce((acc, group) => acc + countUniqueAnswersInGroup(group), 0);
}

export const countUniqueAnswersInGroup = (group: string): number => {
  const trimmed = group.replace(/\s/g, '');
  const uniqueAnswers = new Set(trimmed.split(''));

  return uniqueAnswers.size;
}

export const sumAllAnswers = (input: string): number => {
  const groups = input.split('\n\n');

  return groups.reduce((acc, group) => {
    const answers = group.split('\n');
    return acc + answers[0].split('').filter(letter => answers.every(a => a.includes(letter))).length;
  }, 0);
}

export const execute = () => {
  console.log('DAY 6: Custom Customs  -------------------------');
  console.log('Part 1:', sumAllUniqueAnswers(ANSWERS));
  console.log('Part 2:', sumAllAnswers(ANSWERS));
}