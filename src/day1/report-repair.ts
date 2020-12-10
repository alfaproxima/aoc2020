import { REPORT_DATA } from './data';

export const reportRepairTwoEntries = (report: number[]): number =>  {
  for (let i = 0; i < report.length; i++) {
    const num = report[i];
    const foundNumber = report.find(it => num + it === 2020);

    if (foundNumber) {
      return num * foundNumber;
    }
  }

  return null;
}

export const reportRepairThreeEntries = (report: number[]): number =>  {
  let result = 0;

  for (let i = 0; i < report.length; i++) {
    const a = report[i];

    for (let j = i + 1; j < report.length; j++) {
      const b = report[j];
      const foundNumber = report.find(it => a + b + it === 2020);

      if (foundNumber) {
        return a * b * foundNumber;
      }
    }
  }

  return null;
}

export const execute = () => {
  console.log('DAY 1: Report Repair -------------------------');
  console.log('Part 1: ', reportRepairTwoEntries(REPORT_DATA));
  console.log('Part 2: ', reportRepairThreeEntries(REPORT_DATA));
}