import test from "node:test";
import assert from "node:assert/strict";
import { loadProgress, saveProgress } from "../src/shared/progress.js";
import { shuffle } from "../src/shared/shuffle.js";

test("progress tolerates malformed, incompatible and unavailable storage", () => {
  for (const value of ["{broken", "null", "{}", "false"]) {
    assert.deepEqual([...loadProgress({ getItem: () => value }, 13)], []);
  }
  assert.deepEqual([...loadProgress(null, 13)], []);
  assert.deepEqual(
    [...loadProgress({ getItem: () => '[0,0,12,13,-1,"2",1.5]' }, 13)],
    [0, 12],
  );
  assert.equal(saveProgress(null, new Set([1])), false);
});

test("progress retains the existing storage key and round-trips completed lessons", () => {
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key),
    setItem: (key, value) => values.set(key, value),
  };
  assert.equal(saveProgress(storage, new Set([0, 4])), true);
  assert.equal(values.get("arqlab-completed"), "[0,4]");
  assert.deepEqual([...loadProgress(storage, 13)], [0, 4]);
});

test("shuffle preserves the question pool without mutating it", () => {
  const questions = ["a", "b", "c", "d"];
  const result = shuffle(questions, () => 0);
  assert.deepEqual(questions, ["a", "b", "c", "d"]);
  assert.notDeepEqual(result, questions);
  assert.deepEqual([...result].sort(), questions);
});
