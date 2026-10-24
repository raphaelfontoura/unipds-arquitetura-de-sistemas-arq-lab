import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import { lessons } from "../src/data/lessons.js";

test("study, progress, search, architecture flows and quizzes work together", async (t) => {
  const dom = new JSDOM(
    await readFile(new URL("../index.html", import.meta.url), "utf8"),
    { url: "http://localhost" },
  );
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  window.scrollTo = () => {};
  window.HTMLElement.prototype.scrollIntoView = () => {};
  const dialog = document.querySelector("#quiz-dialog");
  dialog.showModal = () => dialog.setAttribute("open", "");
  dialog.close = () => dialog.removeAttribute("open");
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const click = (selector) => $(selector).click();
  const key = (selector, value) =>
    $(selector).dispatchEvent(
      new window.KeyboardEvent("keydown", { key: value, bubbles: true }),
    );
  window.localStorage.setItem("arqlab-completed", "{invalid");
  try {
    await import("../app.js");
    assert.equal($$(".lesson-card").length, 13);
    assert.equal($$(".nav-item").length, 13);
    assert.equal($("#progress-value").textContent, "0%");
    click("#start-study");
    assert.equal($("#lesson-title").textContent, lessons[0].title);
    click("#complete-lesson");
    assert.equal($("#progress-detail").textContent, "1 de 13 aulas concluídas");
    assert.deepEqual(
      JSON.parse(window.localStorage.getItem("arqlab-completed")),
      [0],
    );
    click("#next-lesson");
    assert.equal($("#lesson-title").textContent, lessons[1].title);
    click("#previous-lesson");
    click("#complete-lesson");
    assert.equal($("#progress-value").textContent, "0%");
    click('.nav-item[data-lesson="12"]');
    assert.ok($(".clean-architecture-visual"));
    click("#next-lesson");
    assert.equal($("#overview-page").classList.contains("hidden"), false);

    for (let index = 0; index < 7; index++) {
      click(`.style-tab[data-style="${index}"]`);
      assert.ok($("#architecture-diagram svg"));
      assert.ok($("#flow-caption").textContent);
      if (index === 4) {
        click('[data-flow-mode="1"]');
        assert.match(
          $("#flow-diagram svg").getAttribute("aria-label"),
          /Mediator/,
        );
        click('[data-flow-mode="0"]');
        assert.match(
          $("#flow-diagram svg").getAttribute("aria-label"),
          /Broker/,
        );
      }
      click("#replay-flow");
    }
    $("#search-input").value = "Clean Architecture";
    key("#search-input", "Enter");
    assert.ok($$(".result-item").length > 0);
    click(".result-item");
    assert.equal($("#lesson-page").classList.contains("hidden"), false);
    $("#search-input").value = "<img src=x onerror=alert(1)>";
    key("#search-input", "Enter");
    assert.equal($$(".result-item").length, 0);
    assert.equal($("#search-summary img"), null);
    key("#search-input", "Escape");
    assert.equal($("#overview-page").classList.contains("hidden"), false);
    click("#theme-toggle");
    assert.ok(document.body.classList.contains("dark-mode"));

    click("#start-study");
    const originalQuestions = structuredClone(lessons);
    t.mock.method(Math, "random", () => 0);
    click("#lesson-quiz");
    assert.ok(dialog.open);
    for (let index = 0; index < 3; index++) {
      const prompt = $("#quiz-content h2").textContent;
      const question = lessons[0].questions.find(
        (item) => item.prompt === prompt,
      );
      const correctButton = $$(".quiz-option").find(
        (button) =>
          button.textContent.slice(3).trim() ===
          question.options[question.correctAnswer],
      );
      assert.notEqual(+correctButton.dataset.answer, question.correctAnswer);
      correctButton.click();
      assert.ok(correctButton.classList.contains("correct"));
      assert.ok($("#quiz-feedback").classList.contains("good"));
      assert.ok($$(".quiz-option").every((button) => button.disabled));
      click("#quiz-next");
    }
    assert.match($(".quiz-result-score").textContent, /3.*3/);
    assert.equal($("#progress-value").textContent, "0%");
    assert.match($("#complete-lesson").textContent, /Marcar como concluída/);
    click("#quiz-finish");
    assert.equal(dialog.open, false);
    assert.match($("#complete-lesson").textContent, /Aula concluída/);
    assert.ok($("#complete-lesson").classList.contains("done"));
    assert.equal($("#progress-value").textContent, "8%");
    assert.equal($("#progress-detail").textContent, "1 de 13 aulas concluídas");
    assert.ok($('.nav-item[data-lesson="0"] .nav-check'));
    assert.match(
      $('.lesson-card[data-lesson="0"] .lesson-card-status').textContent,
      /Concluída/,
    );
    assert.deepEqual(
      JSON.parse(window.localStorage.getItem("arqlab-completed")),
      [0],
    );

    const answerRemaining = (count, missFirst = false) => {
      for (let index = 0; index < count; index++) {
        const question = lessons
          .flatMap((lesson) => lesson.questions)
          .find((item) => item.prompt === $("#quiz-content h2").textContent);
        $$(".quiz-option")
          .find((button) => {
            const correct =
              button.textContent.slice(3).trim() ===
              question.options[question.correctAnswer];
            return missFirst && index === 0 ? !correct : correct;
          })
          .click();
        click("#quiz-next");
      }
    };
    // Repeating a successful checkpoint must keep the lesson completed.
    click("#lesson-quiz");
    answerRemaining(3);
    click("#quiz-finish");
    assert.match($("#complete-lesson").textContent, /Aula concluída/);
    assert.equal($("#progress-value").textContent, "8%");

    click("#next-lesson");
    click("#lesson-quiz");
    answerRemaining(3, true);
    assert.match($("#complete-lesson").textContent, /Marcar como concluída/);
    assert.equal($("#progress-value").textContent, "8%");
    dialog.close();

    // A mixed challenge does not complete the currently open lesson.
    click("#open-quiz");
    answerRemaining(5);
    click("#quiz-finish");
    assert.match($("#complete-lesson").textContent, /Marcar como concluída/);
    assert.deepEqual(
      JSON.parse(window.localStorage.getItem("arqlab-completed")),
      [0],
    );

    click("#open-quiz");
    assert.match($(".quiz-meta").textContent, /1 \/ 5/);
    const prompt = $("#quiz-content h2").textContent;
    const question = lessons
      .flatMap((lesson) => lesson.questions)
      .find((item) => item.prompt === prompt);
    const wrongButton = $$(".quiz-option").find(
      (button) =>
        button.textContent.slice(3).trim() !==
        question.options[question.correctAnswer],
    );
    wrongButton.click();
    assert.ok(wrongButton.classList.contains("incorrect"));
    assert.equal(
      $(".quiz-option.correct").textContent.slice(3).trim(),
      question.options[question.correctAnswer],
    );
    assert.equal($("#quiz-feedback").classList.contains("good"), false);
    assert.deepEqual(lessons, originalQuestions);
    click(".review-link");
    assert.equal(dialog.open, false);
    assert.equal($("#lesson-page").classList.contains("hidden"), false);
  } finally {
    window.dispatchEvent(new window.Event("pagehide"));
    dom.window.close();
    delete globalThis.window;
    delete globalThis.document;
  }
});
