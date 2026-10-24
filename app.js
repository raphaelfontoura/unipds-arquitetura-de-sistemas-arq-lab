import { $, $$, showPage } from "./src/shared/dom.js";
import { createLessonBrowser } from "./src/features/lessons.js";
import { createArchitectureExplorer } from "./src/features/architecture-explorer.js";
import { createQuiz } from "./src/features/quiz.js";
import { createSearch } from "./src/features/search.js";

const explorer = createArchitectureExplorer();
const lessonBrowser = createLessonBrowser({
  onOverview: showOverview,
  onLeaveOverview: explorer.stop,
});
const { openLesson } = lessonBrowser;
const quiz = createQuiz({ openLesson });
const { search } = createSearch({
  openLesson,
  showOverview,
  onLeaveOverview: explorer.stop,
});

function showOverview() {
  showPage("overview-page", "VISÃO GERAL");
  lessonBrowser.renderNav();
  explorer.resume();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindEvents() {
  $("#open-quiz").addEventListener("click", () => quiz.startQuiz());
  $("#lesson-quiz").addEventListener("click", () =>
    quiz.startQuiz(lessonBrowser.getCurrentLesson()),
  );
  $("#complete-lesson").addEventListener(
    "click",
    lessonBrowser.toggleCompleted,
  );
  $("#back-home").addEventListener("click", showOverview);
  $("#start-study").addEventListener("click", () => openLesson(0));
  $("#browse-styles").addEventListener("click", () =>
    $("#styles-section").scrollIntoView({ behavior: "smooth" }),
  );
  $("#all-lessons").addEventListener("click", () =>
    $("#lesson-cards").scrollIntoView({ behavior: "smooth" }),
  );
  $("#theme-toggle").addEventListener("click", () =>
    document.body.classList.toggle("dark-mode"),
  );
  $("#search-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") search(event.target.value);
    if (event.key === "Escape") {
      event.target.value = "";
      showOverview();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "/" &&
      !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) &&
      !document.activeElement.isContentEditable
    ) {
      event.preventDefault();
      $("#search-input").focus();
    }
  });
  $$(".home-link,.home-breadcrumb").forEach((link) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showOverview();
    }),
  );
  window.addEventListener("pagehide", explorer.stop);
  window.addEventListener("pageshow", () => {
    if (!$("#overview-page").classList.contains("hidden")) explorer.resume();
  });
}

lessonBrowser.init();
explorer.init();
bindEvents();
