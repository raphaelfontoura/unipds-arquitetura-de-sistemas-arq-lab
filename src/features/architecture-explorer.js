import { styles, architectureMaps } from "../data/architectures.js";
import { $, $$ } from "../shared/dom.js";

import { simulationFlows } from "../data/simulation-flows.js";

export function createArchitectureExplorer() {
  let currentStyle = 0;
  const modes = new Map();
  let step = 0;
  let playing = !window.matchMedia?.("(prefers-reduced-motion: reduce)")
    .matches;
  let speed = 1;
  const currentFlow = () =>
    simulationFlows[currentStyle][modes.get(currentStyle) || 0];
  let flowTimer = null;
  function renderArchitectureMap() {
    const map = architectureMaps[currentStyle],
      root = $("#architecture-diagram");
    $("#board-index").textContent =
      `${String(currentStyle + 1).padStart(2, "0")} / ${String(styles.length).padStart(2, "0")}`;
    $("#board-description").textContent = map.description;
    const groups = map.groups
      .map(
        (g) =>
          `<g class="map-boundary"><rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="12"/><text x="${g.x + 13}" y="${g.y + 19}">${g.label}</text></g>`,
      )
      .join("");
    const links = map.links
      .map(
        ([x1, y1, x2, y2]) =>
          `<line class="map-link" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" marker-end="url(#map-arrow)"/>`,
      )
      .join("");
    const nodes = map.nodes
      .map((n) => {
        const kind =
          n.kind ||
          (["Cliente", "Producer"].includes(n.label) ? "external" : "");
        return `<g class="map-node ${kind}"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="8"/><text class="map-title" x="${n.x + n.w / 2}" y="${n.y + n.h / 2 - 3}">${n.label}</text><text class="map-detail" x="${n.x + n.w / 2}" y="${n.y + n.h / 2 + 13}">${n.detail}</text></g>`;
      })
      .join("");
    root.innerHTML = `<svg viewBox="0 0 720 310" role="img" aria-label="Diagrama estrutural: ${map.description}" xmlns="http://www.w3.org/2000/svg"><defs><marker id="map-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z"/></marker></defs>${groups}${links}${nodes}</svg>`;
  }
  function renderStyles() {
    const tabs = $("#style-tabs");
    tabs.innerHTML = styles
      .map(
        (s, i) =>
          `<button class="style-tab ${i === currentStyle ? "active" : ""}" role="tab" aria-selected="${i === currentStyle}" data-style="${i}">${s.name}</button>`,
      )
      .join("");
    $$(".style-tab").forEach(
      (b) =>
        (b.onclick = () => {
          currentStyle = +b.dataset.style;
          renderStyles();
        }),
    );
    const s = styles[currentStyle];
    $("#style-kicker").textContent =
      `ESTILO ${String(currentStyle + 1).padStart(2, "0")} · FLUXO DE VALOR`;
    $("#style-title").textContent = s.title;
    $("#style-description").textContent = s.desc;
    $("#style-tradeoff-text").textContent = s.tradeoff;
    renderFlow();
    renderArchitectureMap();
  }
  function edgeGeometry(edge, nodes) {
    if (edge.d) return edge;
    const a = nodes[edge.from],
      b = nodes[edge.to];
    const ax = a.x + a.w / 2,
      ay = a.y + a.h / 2;
    const bx = b.x + b.w / 2,
      by = b.y + b.h / 2;
    const dx = bx - ax,
      dy = by - ay;
    const sa = 1 / Math.max(Math.abs(dx) / (a.w / 2), Math.abs(dy) / (a.h / 2));
    const sb = 1 / Math.max(Math.abs(dx) / (b.w / 2), Math.abs(dy) / (b.h / 2));
    const x1 = ax + dx * sa,
      y1 = ay + dy * sa;
    const x2 = bx - dx * sb,
      y2 = by - dy * sb;
    const offset = edge.kind === "return" ? 30 : 0;
    const cx = (x1 + x2) / 2 + (Math.abs(dy) > Math.abs(dx) ? offset : 0);
    const cy = (y1 + y2) / 2 + (Math.abs(dy) > Math.abs(dx) ? 0 : offset);
    return {
      ...edge,
      d: `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`,
      x:
        edge.x ??
        (Math.abs(dy) > Math.abs(dx)
          ? cx + (edge.kind === "return" ? 52 : -52)
          : cx),
      y: edge.y ?? cy - 10,
    };
  }
  function renderFlow() {
    stop();
    step = 0;
    const flow = currentFlow(),
      root = $("#flow-diagram");
    root.classList.add("advanced-flow");
    const switcher = $("#flow-mode-switch");
    switcher.classList.toggle(
      "hidden",
      simulationFlows[currentStyle].length < 2,
    );
    switcher.setAttribute(
      "aria-label",
      `Variação de ${styles[currentStyle].name}`,
    );
    switcher.innerHTML = simulationFlows[currentStyle]
      .map(
        (variant, index) =>
          `<button type="button" data-flow-mode="${index}" class="${index === (modes.get(currentStyle) || 0) ? "active" : ""}" aria-pressed="${index === (modes.get(currentStyle) || 0)}">${variant.title.split(" · ")[1] || "Service Mesh"}</button>`,
      )
      .join("");
    $("#flow-communication-legend").classList.remove("hidden");
    $("#flow-topology-note").textContent = flow.note;
    const nodes = Object.fromEntries(flow.nodes.map((node) => [node.id, node]));
    const groups = (flow.groups || [])
      .map(
        (g) =>
          `<g class="map-boundary"><rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="12"/><text x="${g.x + 12}" y="${g.y + 19}">${g.label}</text></g>`,
      )
      .join("");
    const edges = flow.edges
      .map((edge, index) => {
        const e = edgeGeometry(edge, nodes);
        return `<g class="advanced-edge ${e.kind}" data-edge="${index}"><path id="flow-edge-${index}" d="${e.d}" marker-end="url(#flow-arrow)"/><text x="${e.x}" y="${e.y}" text-anchor="middle">${e.label}</text><circle class="flow-traveler" r="4"><animateMotion dur="${1.8 / speed}s" repeatCount="indefinite" path="${e.d}"/></circle></g>`;
      })
      .join("");
    const boxes = flow.nodes
      .map(
        (n) =>
          `<g class="advanced-node ${n.type || ""}" data-node="${n.id}"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="9"/><text class="advanced-node-title" x="${n.x + n.w / 2}" y="${n.y + n.h / 2 - 3}">${n.label}</text><text class="advanced-node-detail" x="${n.x + n.w / 2}" y="${n.y + n.h / 2 + 14}">${n.detail}</text></g>`,
      )
      .join("");
    const height =
      flow.height || Math.max(310, ...flow.nodes.map((n) => n.y + n.h + 16));
    root.innerHTML = `<svg viewBox="0 0 ${flow.width || 720} ${height}" role="img" aria-label="${flow.title}" xmlns="http://www.w3.org/2000/svg"><defs><marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z"/></marker></defs>${groups}${edges}${boxes}</svg>`;
    $("#flow-step-list").innerHTML = flow.steps
      .map(
        (item, index) =>
          `<button type="button" data-step="${index}" aria-label="Etapa ${index + 1}: ${item[1]}">${index + 1}</button>`,
      )
      .join("");
    paintStep();
    startTimer();
  }
  function paintStep() {
    const root = $("#flow-diagram"),
      flow = currentFlow();
    root
      .querySelectorAll(".is-active")
      .forEach((el) => el.classList.remove("is-active"));
    const [indices, caption] = flow.steps[step];
    for (const index of [indices].flat()) {
      root.querySelector(`[data-edge="${index}"]`).classList.add("is-active");
      for (const id of [flow.edges[index].from, flow.edges[index].to])
        root.querySelector(`[data-node="${id}"]`).classList.add("is-active");
    }
    $("#flow-caption").textContent = caption;
    $("#flow-step-count").textContent =
      `Etapa ${step + 1} de ${flow.steps.length}`;
    $$("#flow-step-list button").forEach((button, index) =>
      button.setAttribute("aria-current", index === step ? "step" : "false"),
    );
    root.classList.toggle("is-paused", !playing);
    $("#toggle-flow").textContent = playing ? "Pausar" : "Reproduzir";
    $("#toggle-flow").setAttribute("aria-pressed", String(playing));
    $("#flow-status").textContent = playing ? "● EM EXECUÇÃO" : "Ⅱ PAUSADO";
    $("#flow-caption").setAttribute("aria-live", playing ? "off" : "polite");
  }
  function startTimer() {
    stop();
    if (playing)
      flowTimer = setInterval(() => {
        step = (step + 1) % currentFlow().steps.length;
        paintStep();
      }, 2400 / speed);
  }
  function stop() {
    clearInterval(flowTimer);
    flowTimer = null;
  }
  return {
    stop,
    resume() {
      paintStep();
      startTimer();
    },
    init() {
      renderStyles();
      $("#replay-flow").addEventListener("click", renderFlow);
      $("#flow-mode-switch").addEventListener("click", (event) => {
        const button = event.target.closest("[data-flow-mode]");
        if (!button) return;
        modes.set(currentStyle, Number(button.dataset.flowMode));
        renderFlow();
      });
      $("#toggle-flow").addEventListener("click", () => {
        playing = !playing;
        paintStep();
        startTimer();
      });
      const selectStep = (next) => {
        playing = false;
        step = (next + currentFlow().steps.length) % currentFlow().steps.length;
        stop();
        paintStep();
      };
      $("#previous-flow").addEventListener("click", () => selectStep(step - 1));
      $("#next-flow").addEventListener("click", () => selectStep(step + 1));
      $("#flow-step-list").addEventListener("click", (event) => {
        const button = event.target.closest("[data-step]");
        if (button) selectStep(Number(button.dataset.step));
      });
      $("#flow-speed").addEventListener("change", (event) => {
        speed = Number(event.target.value);
        $$("#flow-diagram animateMotion").forEach((el) =>
          el.setAttribute("dur", `${1.8 / speed}s`),
        );
        startTimer();
      });
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) stop();
        else if (!$("#overview-page").classList.contains("hidden"))
          startTimer();
      });
    },
  };
}
