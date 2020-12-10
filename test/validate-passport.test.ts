import { parseInput, validatePassport, validatePassportPart2, countValidPassports, isFieldValid } from '../src/day04/validate-passport';

const data = 
`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

const passport = {
  ecl: 'gry',
  pid: '860033327',
  eyr: '2020',
  hcl: '#fffffd',
  byr: '1937',
  iyr: '2017',
  cid: '147',
  hgt: '183cm'
};

const invalidPassport = {
  iyr: '2013',
  ecl: 'amb',
  eyr: '2023',
  pid: '028048884',
  hcl: '#cfa07d',
  byr: '1929'
};

const validPassports = 
`pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;

const invalidPassports = 
`eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`;

describe("Day 4: Passport Processing", () => {
  test("Parse input", () => {
    expect(parseInput(data).length).toBe(4);
    expect(parseInput(data)[0]).toEqual(passport);
  });

  test("Validate passport", () => {
    expect(validatePassport(passport)).toBe(true);
    expect(validatePassport(invalidPassport)).toBe(false);
  })

  test("Count the number of valid passports", () => {
    expect(countValidPassports(data, validatePassport)).toBe(2);
  });

  test("Validate BYR: four digits; at least 1920 and at most 2002", () => {
    expect(isFieldValid('byr', '2002')).toBe(true);
    expect(isFieldValid('byr', '1920')).toBe(true);
    expect(isFieldValid('byr', '2010')).toBe(false);
    expect(isFieldValid('byr', '1919')).toBe(false);
    expect(isFieldValid('byr', '01980')).toBe(false);
  });

  test("Validate IYR: four digits; at least 2010 and at most 2020", () => {
    expect(isFieldValid('iyr', '2010')).toBe(true);
    expect(isFieldValid('iyr', '2021')).toBe(false);
    expect(isFieldValid('iyr', '2015')).toBe(true);
    expect(isFieldValid('iyr', '02015')).toBe(false);
    expect(isFieldValid('iyr', '2008')).toBe(false);
  });

  test("Validate EYR: four digits; at least 2020 and at most 2030", () => {
    expect(isFieldValid('eyr', '2020')).toBe(true);
    expect(isFieldValid('eyr', '2019')).toBe(false);
    expect(isFieldValid('eyr', '2030')).toBe(true);
    expect(isFieldValid('eyr', '02030')).toBe(false);
    expect(isFieldValid('eyr', '2031')).toBe(false);
  })

  test(`Validate HGT: a number followed by either cm or in:
            - If cm, the number must be at least 150 and at most 193.
            - If in, the number must be at least 59 and at most 76.`, () => {
    expect(isFieldValid('hgt', '150')).toBe(false);
    expect(isFieldValid('hgt', '150cm')).toBe(true);
    expect(isFieldValid('hgt', '194cm')).toBe(false);
    expect(isFieldValid('hgt', '58in')).toBe(false);
    expect(isFieldValid('hgt', '76in')).toBe(true);
    expect(isFieldValid('hgt', '190in')).toBe(false);
  });

  test("Validate HCL: a # followed by exactly six characters 0-9 or a-f", () => {
    expect(isFieldValid('hcl', '#123abc')).toBe(true);
    expect(isFieldValid('hcl', '#123ABC')).toBe(true);
    expect(isFieldValid('hcl', '#100abc')).toBe(true);
    expect(isFieldValid('hcl', '#123abz')).toBe(false);
    expect(isFieldValid('hcl', '123abc')).toBe(false);
  });

  test("Validate ECL: exactly one of: amb blu brn gry grn hzl oth", () => {
    expect(isFieldValid('ecl', 'brn')).toBe(true);
    expect(isFieldValid('ecl', 'wat')).toBe(false);
  });

  test("Validate PID: a nine-digit number, including leading zeroes", () => {
    expect(isFieldValid('pid', '000000001')).toBe(true);
    expect(isFieldValid('pid', '0123456789')).toBe(false);
  });

  test("Count valid passports PART 2", () => {
    expect(countValidPassports(validPassports, validatePassportPart2)).toBe(4);
    expect(countValidPassports(invalidPassports, validatePassportPart2)).toBe(0);
  })
});