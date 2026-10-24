export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => Array.from(document.querySelectorAll(selector));

export function showPage(pageId, breadcrumb) {
  for (const id of ["overview-page", "lesson-page", "search-results"]) {
    document.getElementById(id).classList.toggle("hidden", id !== pageId);
  }
  $("#breadcrumb-current").textContent = breadcrumb;
}
