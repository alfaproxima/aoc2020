import { parsePasswordPolicy, validateByQuantity, validateByPosition, countValidPasswords } from '../src/day2/password-validation';

const passwords = [
  '1-3 a: abcde',
  '1-3 b: cdefg',
  '2-9 c: ccccccccc',
 ];

test("Parse password policiy: '1-3 a: abcde' should return [1, 3, 'a', 'abcde']", () => {
  expect(parsePasswordPolicy('1-3 a: abcde')).toEqual([1, 3, 'a', 'abcde']);
});

test("Validate by quantity: [1, 3, 'a', 'abcde'] should return true", () => {
  expect(validateByQuantity([1, 3, 'a', 'abcde'])).toBe(true);
});

test("Validate by quantity: [1, 3, 'b', 'cdefg'] should return false", () => {
  expect(validateByQuantity([1, 3, 'a', 'cdefg'])).toBe(false);
});

test("Validate by quantity: [1, 3, 'a', 'abcde'] should return true", () => {
  expect(validateByPosition([1, 3, 'a', 'abcde'])).toBe(true);
});

test("Validate by quantity: [2, 9, 'c', 'ccccccccc'] should return false", () => {
  expect(validateByPosition([2, 9, 'c', 'ccccccccc'])).toBe(false);
});

test("Validate by quantity: [1, 3, 'b', 'cdefg'] should return false", () => {
  expect(validateByPosition([1, 3, 'b', 'cdefg'])).toBe(false);
});

test(`Count valid passwords by quantity: [
  '1-3 a: abcde',
  '1-3 b: cdefg',
  '2-9 c: ccccccccc',
 ] should return 2`, () => {
  expect(countValidPasswords(passwords, validateByQuantity)).toBe(2);
});

test(`Count valid passwords by position: [
  '1-3 a: abcde',
  '1-3 b: cdefg',
  '2-9 c: ccccccccc',
 ] should return 1`, () => {
  expect(countValidPasswords(passwords, validateByPosition)).toBe(1);
});