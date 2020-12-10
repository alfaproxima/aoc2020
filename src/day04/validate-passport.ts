import { PASSPORTS } from './data';

type Passport = {
  ecl?: string;
  pid?: string;
  eyr?: string;
  hcl?: string;
  byr?: string;
  iyr?: string;
  hgt?: string;
  cid?: string;
}

const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const EYE_COLORS = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);

export const parseInput = (input: string): Passport[] => {
  const passports = input.split('\n\n');

  return passports
    .map(row => row.split(/\s/).map(pair => pair.split(':')))
    .map(passport => Object.fromEntries(passport));
}

export const validatePassport = (passport: Passport): boolean => {
  return REQUIRED_FIELDS.filter(field => !passport[field]).length === 0;
}

export const validatePassportPart2 = (passport: Passport): boolean => {
  const isHasAllFields = hasAllFields(passport);

  if (!isHasAllFields) {
    return false;
  }

  return Object.entries(passport)
          .map(([key, value]) => isFieldValid(key, value))
          .every(isValid => isValid === true);
}

const hasAllFields = (passport: Passport): boolean => {
  return REQUIRED_FIELDS.filter(field => !passport[field]).length === 0;
}

export const isFieldValid = (fieldName: string, value: string): boolean => {

  switch (fieldName) {
    case 'byr': return validateYearRange(value, 1920, 2002);

    case 'iyr': return validateYearRange(value, 2010, 2020);

    case 'eyr': return validateYearRange(value, 2020, 2030);

    case 'hgt': return validateHeight(value);

    case 'hcl': return (/^#[0-9a-f]{6}$/i).test(value);

    case 'ecl': return EYE_COLORS.has(value);

    case 'pid': return (/^\d{9}$/).test(value);

    default: return true;
  }
}

const validateHeight = (value: string): boolean => {
  const height = value.match(/cm|in/);

  if (height) {
    const size = parseInt(value);
    return height[0] === 'cm' ? 
      validateRange(size, 150, 193) :
      validateRange(size, 59, 76);
  }
  return false;
}

const validateYearRange = (value, from: number, to: number): boolean => {
  const isYear = /^\d{4}$/.test(value);
  const int = parseInt(value, 10);

  return isYear && validateRange(int, from, to);
}

const validateRange = (value, from: number, to: number): boolean => {
  const int = parseInt(value, 10);

  return (int >= from && int <= to)
}

export const countValidPassports = (input: string, validateFn: (p: Passport) => boolean): number => {
  const passports = parseInput(input);

  return passports
    .map(passport => validateFn(passport))
    .filter(isValid => !!isValid)
    .length;
}

export const execute = () => {
  console.log('DAY 4: Passport Processing  -------------------------');
  console.log('Part 1: ', countValidPassports(PASSPORTS, validatePassport));
  console.log('Part 2: ', countValidPassports(PASSPORTS, validatePassportPart2));
}