import { lessons } from "../data/lessons.js";
import { $, $$, showPage } from "../shared/dom.js";

export function createSearch({ openLesson, showOverview, onLeaveOverview }) {
  function search(query) {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      showOverview();
      return;
    }
    const matches = lessons
      .map((lesson, lessonIndex) => ({
        lesson,
        lessonIndex,
        terms: [
          lesson.title,
          lesson.summary,
          ...lesson.concepts,
          ...lesson.sections.flat(),
          ...lesson.practice,
        ]
          .join(" ")
          .toLowerCase(),
      }))
      .filter((match) => match.terms.includes(normalizedQuery));
    onLeaveOverview();
    showPage("search-results", "BUSCA");
    $("#search-summary").textContent = matches.length
      ? `${matches.length} aula${matches.length === 1 ? "" : "s"} relacionada${matches.length === 1 ? "" : "s"} a “${query}”`
      : `Nenhuma aula encontrada para “${query}”.`;
    $("#search-list").innerHTML = matches.length
      ? matches
          .map(
            ({ lesson, lessonIndex }) =>
              `<button class="result-item" data-lesson="${lessonIndex}"><strong>Aula ${String(lessonIndex + 1).padStart(2, "0")} · ${lesson.title}</strong><span>${lesson.summary}</span></button>`,
          )
          .join("")
      : `<div class="empty-state">Tente outro termo ou explore o mapa das ${lessons.length} aulas.</div>`;
    $$(".result-item").forEach(
      (button) => (button.onclick = () => openLesson(+button.dataset.lesson)),
    );
  }
  return { search };
}
