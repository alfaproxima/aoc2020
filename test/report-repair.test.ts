import { reportRepairTwoEntries, reportRepairThreeEntries } from '../src/day01/report-repair';

const expenseReport = [1721, 979, 366, 299, 675, 1456];

test('Find two numbers', () => {
  expect(reportRepairTwoEntries(expenseReport)).toBe(514579);
});

test('Find three numbers', () => {
  expect(reportRepairThreeEntries(expenseReport)).toBe(241861950);
});