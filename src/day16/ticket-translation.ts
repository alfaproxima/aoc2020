import { TICKETS } from './data';

export type Option = [number, number];
export type Rule = {name: string, params: [Option, Option]};

export const parseInput = (input: string): {rules: Rule[], your: number[], nearby: number[][]} => {
  const [rulesStr, your, nearby] = input.split('\n\n');

  const rules = rulesStr
    .split('\n')
    .map(it => {
      const [name, min, max] = it.match(/([\w\s]+): (\d+-\d+) or (\d+-\d+)/).slice(1);
      return {
        name,
        params: [min.split('-').map(n => parseInt(n)),
                 max.split('-').map(n => parseInt(n))]
      } as Rule;
    });

  const yourTicket = your.match(/\d+/g).map(n => parseInt(n));
  const nerbyTickets = nearby.split('\n').slice(1).map(line => line.split(',').map(n => parseInt(n)));

  return {
    rules: rules,
    your: yourTicket,
    nearby: nerbyTickets
  };
}

export const findInvalidValuesAndSum = (input: string): number => {
  const {rules, your, nearby: tickets} = parseInput(input);
  const params = rules.flatMap(r => r.params);

  return tickets.flat()
    .filter(val => params.every(([min, max]) => val < min || val > max))
    .reduce((acc, n) => acc + n, 0);
}

export const translateTicket = (input: string, matchRule: RegExp = /departure/): any => {
  const {rules, your, nearby: tickets} = parseInput(input);
  const params = rules.flatMap(r => r.params);
  const validTickets = tickets.filter(ticket => isValidValues(ticket, params)).concat([your]);
  const rulesPositions = new Map<string, number>();
  const remainingRulesIndexes = rules.map((it, i) => i);
  const remainingRules = [...rules];

  while (remainingRules.length > 0) {
    let matched = false;

    remainingRulesIndexes.forEach(index => {
      const valuesByPosition = validTickets.flatMap(ticket => ticket[index]);
      const matchedRules = remainingRules.filter(rule => isValidValues(valuesByPosition, rule.params));

      if (matchedRules.length === 1) {
        rulesPositions.set(matchedRules[0].name, index);
        remainingRulesIndexes.splice(remainingRulesIndexes.indexOf(index), 1);
        remainingRules.splice(remainingRules.indexOf(matchedRules[0]), 1);
        matched = true;
      }
    });

    if (!matched) {
      break;
    }
  }

  return [...rulesPositions]
    .filter(([name]) => matchRule.test(name))
    .map(([_, pos]) => pos)
    .reduce((acc, it) => acc * your[it], 1);
}

export const isValidValues = (ticket: number[], rules: Option[]): boolean => {
  return ticket.every(val => rules.some(([min, max]) => val >= min && val <= max));
}

export const execute = () => {
  console.log('DAY 16: Ticket Translation -------------------------');
  console.log('Part 1: ', findInvalidValuesAndSum(TICKETS));
  console.log('Part 2: ', translateTicket(TICKETS));
}