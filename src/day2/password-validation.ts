import { PASSWORDS } from './data';

type numberPolicy = number;
type symbolPolicy = string;
type passwordString = string;

type Password = [numberPolicy, numberPolicy, symbolPolicy, passwordString];
type Policy = (p: Password) => boolean;

export const validateByQuantity = (password: Password): boolean => {
  const [min, max, symbol, str] = password;
  let acc = 0;

  for (let char of str) {
     char.toLowerCase() === symbol ? acc++ : acc;
  }

  if (acc < min || acc > max) {
    return false;
  }
  
  return true;
}

export const validateByPosition = (password: Password): boolean => {
  const [posA, posB, symbol, str] = password;

  const atPosA = str.charAt(posA - 1) === symbol;
  const atPosB = str.charAt(posB - 1) === symbol;
  
  if (atPosA && atPosB) {
    return false;
  } else if (atPosA || atPosB) {
    return true;
  }

  return false;
}

export const parsePasswordPolicy = (password: string): Password => {
  const arr = password.split(' ');

  const [posA, posB] = arr[0].match(/(\d+)-(\d+)?/).slice(1).map(it => parseInt(it, 10));
  const symbol = arr[1].charAt(0);
  const pass = arr[2];

  return [posA, posB, symbol, pass];
}

export const countValidPasswords = (passwords: string[], policy: Policy): number => {
   return passwords
     .map(row => parsePasswordPolicy(row))
     .map(password => policy(password))
     .filter(validation => validation === true)
     .length;
}

export const execute = () => {
  console.log('DAY 2: Password Philosophy -------------------------');
  console.log('Part 1: ', countValidPasswords(PASSWORDS, validateByQuantity));
  console.log('Part 2: ', countValidPasswords(PASSWORDS, validateByPosition));
} 