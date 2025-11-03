<script lang="ts">
  import { tick } from "svelte";
  import Display from "./components/Display.svelte";
  import Keypad from "./components/Keypad.svelte";
  import * as Q from "./lib/rational";
  import { calc } from "./lib/calc";

  let current: Q.Q = Q.q(0n);
  let pending: Q.Q | null = null;
  let op: "+" | "-" | "×" | "÷" | null = null;
  let set: "XE" | "Glyphe" = "XE";
  let input = "";
  let showAbout = false;
  let aboutDialog: HTMLElement | null = null;

  const accentControlButtonClasses =
    "rounded-2xl border border-rose-300/60 bg-rose-200/90 px-4 py-3 text-2xl font-semibold text-rose-950 shadow-sm transition hover:bg-rose-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 dark:border-rose-400/40 dark:bg-rose-500/80 dark:text-slate-100 dark:hover:bg-rose-500";

  const secondaryControlButtonClasses =
    "rounded-xl border border-slate-400/30 bg-slate-200/60 px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-500/30 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700/80";

  const helpButtonClasses =
    "flex h-11 w-11 items-center justify-center rounded-full border border-slate-400/40 bg-white/80 text-lg font-semibold text-slate-600 shadow-md transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-500/50 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-800";

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
            .replaceAll("A", "A")
            .replaceAll("B", "B")
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

  function openAbout() {
    showAbout = true;
  }

  function closeAbout() {
    showAbout = false;
  }

  function handleWindowKeydown(event: KeyboardEvent) {
    if (!showAbout) return;
    if (event.key === "Escape" || event.key === "Esc") {
      closeAbout();
    }
  }

  $: if (showAbout) {
    tick().then(() => {
      aboutDialog?.focus();
    });
  }
</script>

<svelte:window on:keydown={handleWindowKeydown} />

<svelte:head>
  <title>Duodecimal Calculator · Base-12 Math</title>
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-10 sm:py-16">
  <section class="relative flex flex-col gap-4 rounded-3xl border border-slate-500/20 bg-white/90 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur dark:border-slate-500/30 dark:bg-slate-900/80">
    <button
      type="button"
      class={`${helpButtonClasses} absolute right-4 top-4`}
      on:click={openAbout}
      aria-expanded={showAbout}
      aria-controls="about-duodecimal"
      aria-label="Learn about the duodecimal system"
    >
      ?
    </button>
    <div class="flex flex-col items-center gap-4 text-center">
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Duodecimal Calculator
        </h1>
      </div>
      <div class="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center">
        <button
          type="button"
          class={secondaryControlButtonClasses}
          on:click={switchSet}
          aria-label="Toggle digit set"
        >
          {set === "XE" ? "Digits: X, E" : "Digits: A, B"}
        </button>
        <button
          type="button"
          class={`${accentControlButtonClasses} sm:ml-auto`}
          on:click={clearAll}
          aria-label="Clear all"
        >
          AC
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
    Built with ❤️ by <a class="font-medium text-sky-600 underline hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300" href="https://www.stanislavvalasek.com/en">Stanislav Valasek</a> using Svelte, Tailwind, and rational arithmetic for dozenal fans.
  </footer>
</main>

{#if showAbout}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6"
    role="dialog"
    aria-modal="true"
    aria-labelledby="about-duodecimal-title"
  >
    <button
      type="button"
      class="absolute inset-0 h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
      aria-label="Close duodecimal information"
      tabindex="-1"
      on:click={closeAbout}
    />
    <article
      id="about-duodecimal"
      bind:this={aboutDialog}
      class="relative z-10 max-w-2xl rounded-3xl border border-slate-300/40 bg-white px-6 py-6 text-left text-sm text-slate-700 shadow-2xl shadow-slate-900/20 dark:border-slate-500/30 dark:bg-slate-900 dark:text-slate-200"
      tabindex="-1"
    >
      <header class="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 id="about-duodecimal-title" class="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Why duodecimal matters
          </h2>
          <p class="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Inspired by research from mathematicians and the Dozenal Society of America
          </p>
        </div>
        <button
          type="button"
          class="rounded-full border border-slate-400/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-500/40 dark:text-slate-300 dark:hover:bg-slate-800"
          on:click={closeAbout}
        >
          Close
        </button>
      </header>

      <div class="space-y-3 leading-relaxed">
        <p>
          The duodecimal (base-12) system uses twelve distinct digits: 0–9 plus symbols for ten and eleven (often written
          as X and E, or A and B). Just like decimal, each column represents a power of the base—only now the base is 12,
          so place values progress as 1, 12, 144, 1728, and so on.
        </p>
        <p>
          Twelve is highly composite, meaning it has more small factors than ten. Because it divides evenly by 2, 3, 4, and
          6, common fractions such as 1⁄3 or 1⁄4 terminate neatly in duodecimal. Advocates argue this makes everyday mental
          arithmetic simpler, a point emphasized by the
          <a
            class="font-medium text-sky-600 underline hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
            href="https://dozenal.org/"
            target="_blank"
            rel="noreferrer"
          >
            Dozenal Society of America
          </a>
          and mathematicians tracing back to
          19th-century reforms.
        </p>
        <p>
          Historical measurement systems quietly preserve base-12 thinking: a dozen eggs, a gross (12²) of small goods, or
          12 inches to a foot. Merchants in Mesopotamia and medieval Europe leaned on base-12 for similar divisibility
          reasons, long before modern decimal dominance.
        </p>
        <p>
          Modern dozenal enthusiasts continue to explore base-12 numeration, studying how it affects education,
          engineering, and digital displays. Their publications highlight consistent notation (X/E or A/B), conversion
          techniques, and even proposals for calendar reform or timekeeping rooted in twelvefold symmetry.
        </p>
        <p>
          Curious to dig deeper? Browse the Dozenal Society of America’s resources or the extensive literature collected on
          duodecimal’s Wikipedia entry to find primers, conversion charts, and historical documents supporting this elegant
          number system.
        </p>
      </div>
    </article>
  </div>
{/if}
