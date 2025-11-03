<script lang="ts">
  import Display from "./components/Display.svelte";
  import Keypad from "./components/Keypad.svelte";
  import * as Q from "./lib/rational";
  import { calc } from "./lib/calc";

  let current: Q.Q = Q.q(0n);
  let pending: Q.Q | null = null;
  let op: "+" | "-" | "×" | "÷" | null = null;
  let set: "XE" | "Glyphe" = "XE";
  let input = "";

  const controlButtonClasses =
    "rounded-2xl border border-slate-500/20 bg-white/90 px-3 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-500/40 dark:bg-slate-800/90 dark:text-slate-100 dark:hover:bg-slate-700/80";

  function pressDigit(d: string) {
    input += d;
  }

  function clearAll() {
    current = Q.q(0n);
    pending = null;
    op = null;
    input = "";
  }

  function chooseOp(next: "+" | "-" | "×" | "÷") {
    commit();
    pending = current;
    op = next;
    input = "";
  }

  function commit() {
    if (!input) return;

    try {
      const val = Q.q(
        BigInt(
          input
            .replaceAll("↊", "A")
            .replaceAll("↋", "B")
            .replaceAll("X", "A")
            .replaceAll("E", "B")
            .split("")
            .reduce((acc, ch) => {
              const m = ch === "A" ? 10 : ch === "B" ? 11 : Number(ch);
              if (Number.isNaN(m) || m < 0 || m > 11) {
                throw new Error("bad digit");
              }
              return acc * 12 + m;
            }, 0)
        ),
        1n
      );
      current = val;
      input = "";
    } catch (e) {
      console.error(e);
    }
  }

  function equals() {
    commit();
    if (pending && op) {
      current = calc(op, pending, current);
      pending = null;
      op = null;
    }
  }

  function switchSet() {
    set = set === "XE" ? "Glyphe" : "XE";
  }
</script>

<svelte:head>
  <title>Duodecimal Calculator · Base-12 Math</title>
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-10 sm:py-16">
  <section class="flex flex-col gap-4 rounded-3xl border border-slate-500/20 bg-white/90 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur dark:border-slate-500/30 dark:bg-slate-900/80">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div class="space-y-1">
        <h1 class="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Duodecimal Calculator
        </h1>
        <p class="text-sm text-slate-600 dark:text-slate-300">
          Fast, offline-ready base-12 arithmetic.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class={controlButtonClasses}
          on:click={clearAll}
          aria-label="Clear all"
        >
          AC
        </button>
        <button
          type="button"
          class={controlButtonClasses}
          on:click={switchSet}
          aria-label="Toggle digit set"
        >
          {set === "XE" ? "Digits: X, E" : "Digits: ↊, ↋"}
        </button>
      </div>
    </div>

    <Display {current} {pending} {op} {input} {set} />

    <Keypad
      on:digit={(e) => pressDigit(e.detail)}
      on:op={(e) => chooseOp(e.detail)}
      on:commit={commit}
      on:equals={equals}
      {set}
    />
  </section>

  <footer class="text-center text-xs text-slate-500 dark:text-slate-400">
    Built with Svelte, Tailwind, and rational arithmetic for dozenal fans.
  </footer>
</main>
