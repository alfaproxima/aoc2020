import {parseInput, parseInput2, countBagsContainOne, countBagsInOne} from '../src/day07/handy-haversacks';

const rules = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const rules2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

const lightRed = ['bright white', 'muted yellow'];
const lightRed2 = [[1, 'bright white'], [2, 'muted yellow']];

describe("Day 7: Handy Haversacks", () => {
  test("Parse rules", () => {
    expect(parseInput(rules)['light red']).toEqual(lightRed);
  })

  test("Count bags that can containes shiny gold bag", () => {
    expect(countBagsContainOne(rules, 'shiny gold')).toBe(4);
  });

  test("Parse rules 2", () => {
    expect(parseInput2(rules)['light red']).toEqual(lightRed2);
  })

  test("Count bags that shine gold bag contain", () => {
    expect(countBagsInOne(rules, 'shiny gold')).toBe(32);
    expect(countBagsInOne(rules2, 'shiny gold')).toBe(126);
  })
});