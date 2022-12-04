(ns aoc2022.day2
  (:require 
    [clojure.string :as str]
    [clojure.set :as set]))

(def sample
  "1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc")

(def data (slurp "src/day2/data"))

(defn parse [data]
  (map
    #(rest (re-find #"(\d+)-(\d+) (\w): (\w+)" %))
      (str/split data #"\n")))

(defn count-letters [string letter]
  (get 
    (frequencies (str/split string #"")) letter 0))

(defn validate [from to letter pwd]
  (let [n (count-letters pwd letter)
        f (parse-long from)
        t (parse-long to)]
  (cond
    (and
      (>= n f)
      (<= n t)) true
    :else false)))


(defn part1 [data]
  (count
    (filter #(apply validate %) data)))

(part1 (parse sample))
(part1 (parse data))

(defn xor [x y]
  (cond
    (and
     (not (and x y))
     (or x y)) true
    :else false))

(defn char-at [string i]
  (str (.charAt string i)))

(defn validate-2 [from to letter pwd]
  (let [f (- (parse-long from) 1)
        t (- (parse-long to) 1)]
    (cond
      (xor
        (= (char-at pwd f) letter)
        (= (char-at pwd t) letter)) true
      :else false)))

(defn part2 [data]
  (count
    (filter #(apply validate-2 %) data)))

(part2 (parse sample))
(part2 (parse data))