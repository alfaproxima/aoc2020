import { INSTRUCTIONS } from './data';

type Instruction = [string, number];

export const parseInput = (input: string): Instruction[] => {
  const lines = input.split('\n');

  return lines.map(line => {
    const [command, argument] = line.match(/(\w+)\s(.?\d+)/).slice(1);
    return [command, parseInt(argument, 10)];
  });
}


export const run = (input: string): number => {
  const instructions = parseInput(input);
  const execPull = new Set();
  let acc = 0;

  for (let i = 0; i < instructions.length; i++) {
    const [command, arg] = instructions[i];

    if (execPull.has(i)) {
      break;
    }

    execPull.add(i);

    switch (command) {
      case 'nop': continue;
      case 'acc': acc += arg; break;
      case 'jmp': i += arg - 1;
      default: break;
    }
  }

  return acc;
}

export const runWithFix = (input: string): number => {
  const instructions = parseInput(input);
  const execPull = new Set<number>();
  let halt = false;
  let acc = 0;

  for (let i = 0; i < instructions.length; i++) {
    let [command, arg] = instructions[i];

    if (!halt && (command === 'nop' || command === 'jmp')) {
      const interrupted = runIsolate(new Set(execPull), i, [...instructions]);
      if (!interrupted) {
        command = command === 'nop' ? 'jmp' : 'nop';
        halt = true;
      }
    }

    execPull.add(i);

    switch (command) {
      case 'nop': continue;
      case 'acc': acc += arg; break;
      case 'jmp': i += arg - 1;
      default: break;
    }
  }

  return acc;
}

export const runIsolate = (history: Set<number>, index: number, instructions: Instruction[]): boolean => {
  let [cmnd, argument] = instructions[index];
  let interrupted = false;

  instructions[index] = [cmnd === 'nop' ? 'jmp' : 'nop', argument];

  for (let i = index; i < instructions.length; i++) {
    const [command, arg] = instructions[i];

    if (history.has(i)) {
      interrupted = true;
      break;
    }

    history.add(i);

    switch (command) {
      case 'nop': continue;
      case 'acc': continue;
      case 'jmp': i += arg - 1;
    }
  }

  return interrupted;
}

export const execute = (): void => {
  console.log('DAY 8: Handheld Halting  -------------------------');
  console.log('Part 1: ', run(INSTRUCTIONS));
  console.log('Part 2: ', runWithFix(INSTRUCTIONS));
}