import { lessons } from "../data/lessons.js";
import { $, $$ } from "../shared/dom.js";
import { shuffle } from "../shared/shuffle.js";

export function createQuiz({ openLesson, completeLesson }) {
  let quizState = null;
  function startQuiz(lessonIndex = null) {
    const pool =
      lessonIndex === null
        ? lessons.flatMap((lesson, index) =>
            lesson.questions.map((question) => ({
              ...question,
              lesson: index,
            })),
          )
        : lessons[lessonIndex].questions.map((question) => ({
            ...question,
            lesson: lessonIndex,
          }));
    const shuffled = shuffle(pool);
    quizState = {
      lessonIndex,
      questions: shuffled
        .slice(0, lessonIndex === null ? 5 : 3)
        .map((question) => {
          const optionIndices = shuffle(
            question.options.map((_, index) => index),
          );
          return {
            ...question,
            options: optionIndices.map((index) => question.options[index]),
            correctAnswer: optionIndices.indexOf(question.correctAnswer),
          };
        }),
      index: 0,
      score: 0,
      wrong: new Set(),
      answered: false,
    };
    $("#quiz-dialog").showModal();
    renderQuestion();
  }
  function renderQuestion() {
    quizState.answered = false;
    const question = quizState.questions[quizState.index],
      root = $("#quiz-content"),
      total = quizState.questions.length;
    root.innerHTML = `<div class="quiz-meta">${question.lesson === undefined ? "DESAFIO RÁPIDO" : `AULA ${String(question.lesson + 1).padStart(2, "0")} · CHECKPOINT`} <span style="float:right">${quizState.index + 1} / ${total}</span></div><div class="quiz-progress"><span style="width:${(quizState.index / total) * 100}%"></span></div><h2>${question.prompt}</h2><div class="quiz-options">${question.options.map((option, index) => `<button class="quiz-option" data-answer="${index}">${String.fromCharCode(65 + index)}. &nbsp;${option}</button>`).join("")}</div><div class="quiz-feedback hidden" id="quiz-feedback"></div><button class="button button-dark quiz-next hidden" id="quiz-next">${quizState.index === total - 1 ? "Ver resultado" : "Próxima pergunta"} <span>→</span></button>`;
    $$(".quiz-option").forEach(
      (button) => (button.onclick = () => answer(+button.dataset.answer)),
    );
    $("#quiz-next").onclick = () => {
      quizState.index++;
      if (quizState.index < quizState.questions.length) renderQuestion();
      else renderQuizResult();
    };
  }
  function answer(choice) {
    if (quizState.answered) return;
    quizState.answered = true;
    const question = quizState.questions[quizState.index],
      buttons = $$(".quiz-option"),
      correct = choice === question.correctAnswer;
    if (correct) quizState.score++;
    else quizState.wrong.add(question.lesson);
    buttons.forEach((button, index) => {
      button.disabled = true;
      if (index === question.correctAnswer) button.classList.add("correct");
      if (index === choice && !correct) button.classList.add("incorrect");
    });
    const feedback = $("#quiz-feedback");
    feedback.classList.remove("hidden");
    feedback.classList.toggle("good", correct);
    feedback.innerHTML = `<strong>${correct ? "Boa! Resposta correta." : "Vale revisar este ponto."}</strong> ${question.explanation}${!correct ? ` <br><a href="#" class="review-link" data-lesson="${question.lesson}">Revisar Aula ${String(question.lesson + 1).padStart(2, "0")} →</a>` : ""}`;
    const link = $(".review-link");
    if (link)
      link.onclick = (e) => {
        e.preventDefault();
        $("#quiz-dialog").close();
        openLesson(+link.dataset.lesson);
      };
    $("#quiz-next").classList.remove("hidden");
  }
  function renderQuizResult() {
    const score = quizState.score,
      total = quizState.questions.length,
      wrong = [...quizState.wrong];
    $("#quiz-content").innerHTML =
      `<div class="quiz-meta">DESAFIO CONCLUÍDO · ${total} QUESTÕES</div><div class="quiz-result-score">${score}<span style="font-size:20px;color:#a4aaa2"> / ${total}</span></div><h2>${score === total ? "Excelente domínio." : "Um bom começo — veja option que revisar."}</h2><p style="color:#718079;font-size:12px;line-height:1.6">${score === total ? "Você acertou todas. Continue explorando os estilos e seus trade-offs." : "As respostas incorretas apontam conceitos úteis para revisar. A arquitetura é sobre entender contexto e consequências."}</p>${wrong.length ? `<div class="aside-label">SUGESTÕES DE REVISÃO</div><div class="quiz-topics">${wrong.map((index) => `<span>${lessons[index].short}</span>`).join("")}</div><div class="quiz-options">${wrong.map((index) => `<button class="quiz-option review-result" data-lesson="${index}">Revisar Aula ${String(index + 1).padStart(2, "0")} · ${lessons[index].short} →</button>`).join("")}</div>` : ""}<button class="button button-dark quiz-next" id="quiz-finish">${wrong.length ? "Tentar outro desafio" : "Concluir"} <span>→</span></button>`;
    $$(".review-result").forEach(
      (button) =>
        (button.onclick = () => {
          $("#quiz-dialog").close();
          openLesson(+button.dataset.lesson);
        }),
    );
    $("#quiz-finish").onclick = () => {
      if (wrong.length) startQuiz();
      else {
        if (score === total && total > 0 && quizState.lessonIndex !== null) {
          completeLesson(quizState.lessonIndex);
        }
        $("#quiz-dialog").close();
      }
    };
  }
  return { startQuiz };
}
