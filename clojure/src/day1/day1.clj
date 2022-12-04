(ns aoc2020.clojure.day1
  (:require
    [clojure.java.io :as io]
    [clojure.string :as str]
    [clojure.set :as set]))

(def sample
  "1721
979
366
299
675
1456")

(defn parse [data]
  (mapv parse-long
    (re-seq #"\d+" data)))

(def data (slurp (io/file "src/day1/data")))

(defn two-sum [numbers, sum]
  (let [indx (range (count numbers))]
    (first (for [i indx
                 j indx
                 :when (and (not= i j)
                            (= sum (+ (nth numbers i)
                                      (nth numbers j))))]
                 [(nth numbers i) (nth numbers j)]))))

(defn part1 [data]
  (apply * 
    (two-sum data 2020)))

(part1 (parse sample))
(part1 (parse data))