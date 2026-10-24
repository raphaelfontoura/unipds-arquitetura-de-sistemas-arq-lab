import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import { simulationFlows } from "../src/data/simulation-flows.js";
import { createArchitectureExplorer } from "../src/features/architecture-explorer.js";

test("every simulation step references existing connections and components", () => {
  assert.equal(simulationFlows.length, 7);
  for (const flow of simulationFlows.flat()) {
    const ids = new Set(flow.nodes.map((n) => n.id));
    assert.equal(ids.size, flow.nodes.length);
    for (const edge of flow.edges) {
      assert.ok(ids.has(edge.from));
      assert.ok(ids.has(edge.to));
    }
    for (const [edges, caption] of flow.steps) {
      assert.ok(caption.length > 0);
      for (const index of [edges].flat()) assert.ok(flow.edges[index]);
    }
  }
});

test("playback supports manual steps, topology changes, fan-out and reduced motion", async () => {
  const dom = new JSDOM(
    await readFile(new URL("../index.html", import.meta.url), "utf8"),
  );
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  window.matchMedia = () => ({ matches: true });
  const explorer = createArchitectureExplorer();
  const $ = (selector) => document.querySelector(selector);
  const click = (selector) => $(selector).click();
  try {
    explorer.init();
    assert.equal($("#toggle-flow").textContent, "Reproduzir");
    for (let style = 0; style < 7; style++) {
      click(`[data-style="${style}"]`);
      assert.ok($("#flow-diagram svg"));
      const flow = simulationFlows[style][0];
      for (let step = 0; step < flow.steps.length; step++) {
        click(`[data-step="${step}"]`);
        assert.equal($("#flow-caption").textContent, flow.steps[step][1]);
        assert.equal(
          document.querySelectorAll(".advanced-edge.is-active").length,
          [flow.steps[step][0]].flat().length,
        );
      }
      click("#next-flow");
      assert.equal(
        $("#flow-step-count").textContent,
        `Etapa 1 de ${flow.steps.length}`,
      );
      click("#previous-flow");
      assert.equal(
        $("#flow-step-count").textContent,
        `Etapa ${flow.steps.length} de ${flow.steps.length}`,
      );
      click("#replay-flow");
      assert.equal(
        $("#flow-step-count").textContent,
        `Etapa 1 de ${flow.steps.length}`,
      );
    }
    click('[data-flow-mode="1"]');
    assert.match(
      $("#flow-diagram svg").getAttribute("aria-label"),
      /Service Mesh/,
    );
    assert.ok($(".advanced-edge.control"));
    click("#toggle-flow");
    assert.equal($("#toggle-flow").textContent, "Pausar");
    click("#next-flow");
    assert.equal($("#toggle-flow").textContent, "Reproduzir");
    $("#flow-speed").value = "2";
    $("#flow-speed").dispatchEvent(new window.Event("change"));
    assert.equal($("animateMotion").getAttribute("dur"), "0.9s");
    explorer.stop();
    explorer.resume();
    assert.match($("#flow-step-count").textContent, /Etapa 2/);
    click('[data-style="4"]');
    click("#next-flow");
    assert.equal(
      document.querySelectorAll(".advanced-edge.is-active").length,
      3,
    );
    click('[data-flow-mode="1"]');
    assert.match($("#flow-diagram svg").getAttribute("aria-label"), /Mediator/);
    assert.equal(
      document.querySelectorAll(".advanced-edge.is-active").length,
      1,
    );
  } finally {
    explorer.stop();
    dom.window.close();
    delete globalThis.window;
    delete globalThis.document;
  }
});
