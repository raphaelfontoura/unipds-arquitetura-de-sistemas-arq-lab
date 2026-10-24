import { lessons } from "../data/lessons.js";
import { $, $$, showPage } from "../shared/dom.js";
import {
  getBrowserStorage,
  loadProgress,
  saveProgress,
} from "../shared/progress.js";

export function createLessonBrowser({
  onOverview: showOverview,
  onLeaveOverview,
}) {
  let currentLesson = 0;
  const storage = getBrowserStorage();
  const completed = loadProgress(storage, lessons.length);
  function updateProgress() {
    const completedCount = completed.size,
      total = lessons.length;
    $("#progress-value").textContent =
      `${Math.round((completedCount / total) * 100)}%`;
    $("#progress-bar").style.width = `${(completedCount / total) * 100}%`;
    $("#progress-detail").textContent =
      `${completedCount} de ${total} aulas concluídas`;
  }
  function renderNav() {
    const nav = $("#lesson-nav");
    nav.innerHTML = lessons
      .map(
        (lesson, lessonIndex) =>
          `<button class="nav-item ${lessonIndex === currentLesson && $("#lesson-page").classList.contains("hidden") === false ? "active" : ""}" data-lesson="${lessonIndex}"><span class="nav-number">${String(lessonIndex + 1).padStart(2, "0")}</span><span>${lesson.short}</span>${completed.has(lessonIndex) ? '<span class="nav-check">✓</span>' : ""}</button>`,
      )
      .join("");
    $$(".nav-item").forEach(
      (button) => (button.onclick = () => openLesson(+button.dataset.lesson)),
    );
  }
  function renderCards() {
    const root = $("#lesson-cards");
    root.innerHTML = lessons
      .map(
        (lesson, lessonIndex) =>
          `<button class="lesson-card" data-lesson="${lessonIndex}"><div class="lesson-card-top"><span class="lesson-card-number">AULA ${String(lessonIndex + 1).padStart(2, "0")}</span><span class="lesson-card-status">${completed.has(lessonIndex) ? "✓ Concluída" : "↗ Estudar"}</span></div><h3>${lesson.title}</h3><p>${lesson.summary}</p></button>`,
      )
      .join("");
    $$(".lesson-card").forEach(
      (button) => (button.onclick = () => openLesson(+button.dataset.lesson)),
    );
  }
  function openLesson(lessonIndex) {
    currentLesson = (lessonIndex + lessons.length) % lessons.length;
    const lesson = lessons[currentLesson];
    onLeaveOverview();
    showPage(
      "lesson-page",
      `AULA ${String(currentLesson + 1).padStart(2, "0")}`,
    );
    $("#lesson-eyebrow").textContent =
      `AULA ${String(currentLesson + 1).padStart(2, "0")} · ${lesson.short.toUpperCase()}`;
    $("#lesson-title").textContent = lesson.title;
    $("#lesson-summary").textContent = lesson.summary;
    $("#lesson-body").innerHTML =
      (lesson.illustration === "clean-architecture"
        ? `<div class="clean-architecture-visual" role="img" aria-label="Camadas concêntricas da Clean Architecture: Entities no núcleo, Use Cases, Interface Adapters e Frameworks and Drivers na borda. Dependências de código apontam para dentro."><div class="clean-ring clean-outer"><span class="ring-label">FRAMEWORKS &amp; DRIVERS</span><div class="clean-ring clean-adapters"><span class="ring-label">INTERFACE ADAPTERS</span><div class="clean-ring clean-usecases"><span class="ring-label">USE CASES</span><div class="clean-ring clean-entities"><strong>ENTITIES</strong><small>políticas de negócio</small></div></div></div><span class="dependency-arrow">← dependências de código apontam para dentro</span></div><p class="diagram-caption">O fluxo de execução pode atravessar as camadas; a direção das dependências de código continua voltada ao núcleo.</p></div>`
        : "") +
      lesson.sections.map((x) => `<h2>${x[0]}</h2><p>${x[1]}</p>`).join("") +
      `<div class="callout"><p><strong>IDEIA-CHAVE</strong><br>${lesson.summary}</p></div>`;
    $("#lesson-concepts").innerHTML = lesson.concepts
      .map((c) => `<span class="concept-tag">${c}</span>`)
      .join("");
    $("#lesson-practice").innerHTML =
      `<ul>${lesson.practice.map((x) => `<li>${x}</li>`).join("")}</ul>`;
    renderCompletionButton();
    $("#previous-lesson").textContent = currentLesson
      ? "← Aula anterior"
      : "← Visão geral";
    $("#previous-lesson").onclick = () =>
      currentLesson ? openLesson(currentLesson - 1) : showOverview();
    $("#next-lesson").textContent =
      currentLesson === lessons.length - 1
        ? "Voltar ao início →"
        : "Próxima aula →";
    $("#next-lesson").onclick = () =>
      currentLesson === lessons.length - 1
        ? showOverview()
        : openLesson(currentLesson + 1);
    renderNav();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function renderCompletionButton() {
    const complete = $("#complete-lesson");
    complete.classList.toggle("done", completed.has(currentLesson));
    complete.innerHTML = completed.has(currentLesson)
      ? "✓ <span>Aula concluída</span>"
      : "✓ <span>Marcar como concluída</span>";
  }
  function refreshCompletion() {
    saveProgress(storage, completed);
    renderCards();
    updateProgress();
    renderNav();
    renderCompletionButton();
  }
  function completeLesson(lessonIndex) {
    completed.add(lessonIndex);
    refreshCompletion();
  }
  function toggleCompleted() {
    if (completed.has(currentLesson)) completed.delete(currentLesson);
    else completed.add(currentLesson);
    refreshCompletion();
  }
  return {
    openLesson,
    renderNav,
    toggleCompleted,
    completeLesson,
    getCurrentLesson: () => currentLesson,
    init() {
      renderNav();
      renderCards();
      updateProgress();
    },
  };
}
