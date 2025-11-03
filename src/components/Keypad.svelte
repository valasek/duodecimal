<script lang="ts">
  import { createEventDispatcher } from "svelte";

  type Operator = "+" | "-" | "×" | "÷";
  type Command = "commit" | "equals";

  interface KeyBase {
    id: string;
    label: string;
    spanClass?: string;
  }

  type DigitKey = KeyBase & { type: "digit"; value: string };
  type OpKey = KeyBase & { type: "op"; value: Operator };
  type CommandKey = KeyBase & { type: "command"; action: Command };

  type Key = DigitKey | OpKey | CommandKey;

  const dispatch = createEventDispatcher();

  export let set: "XE" | "Glyphe" = "XE";

  const digitClasses =
    "rounded-2xl border border-slate-500/20 bg-white/90 px-4 py-3 text-2xl font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-500/40 dark:bg-slate-800/90 dark:text-slate-100 dark:hover:bg-slate-700/80";
  const opClasses =
    "rounded-2xl border border-amber-400/40 bg-amber-400/80 px-4 py-3 text-2xl font-semibold text-amber-950 shadow-sm transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 dark:border-amber-300/40 dark:bg-amber-500/80";
  const commandClasses =
    "rounded-2xl border border-slate-500/20 bg-slate-900/90 px-4 py-3 text-xl font-semibold text-white shadow-sm transition hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 dark:border-slate-500/40";

  $: ten = set === "XE" ? "X" : "↊";
  $: eleven = set === "XE" ? "E" : "↋";

  $: keypad = [
    { id: "digit-1", type: "digit", label: "1", value: "1" },
    { id: "digit-2", type: "digit", label: "2", value: "2" },
    { id: "digit-3", type: "digit", label: "3", value: "3" },
    { id: "op-plus", type: "op", label: "+", value: "+" },
    { id: "digit-4", type: "digit", label: "4", value: "4" },
    { id: "digit-5", type: "digit", label: "5", value: "5" },
    { id: "digit-6", type: "digit", label: "6", value: "6" },
    { id: "op-minus", type: "op", label: "-", value: "-" },
    { id: "digit-7", type: "digit", label: "7", value: "7" },
    { id: "digit-8", type: "digit", label: "8", value: "8" },
    { id: "digit-9", type: "digit", label: "9", value: "9" },
    { id: "op-times", type: "op", label: "×", value: "×" },
    { id: "digit-ten", type: "digit", label: ten, value: ten },
    { id: "digit-eleven", type: "digit", label: eleven, value: eleven },
    { id: "digit-0", type: "digit", label: "0", value: "0" },
    { id: "op-divide", type: "op", label: "÷", value: "÷" },
    { id: "command-enter", type: "command", label: "Enter", action: "commit", spanClass: "col-span-2" },
    { id: "command-equals", type: "command", label: "=", action: "equals", spanClass: "col-span-2" }
  ] satisfies Key[];

  function classFor(key: Key) {
    if (key.type === "digit") return digitClasses;
    if (key.type === "op") return opClasses;
    return commandClasses;
  }

  function ariaFor(key: Key) {
    if (key.type === "digit") return `Digit ${key.label}`;
    if (key.type === "op") return `Operate ${key.label}`;
    return key.label;
  }

  function handleKey(key: Key) {
    if (key.type === "digit") {
      dispatch("digit", key.value);
    } else if (key.type === "op") {
      dispatch("op", key.value);
    } else if (key.action === "commit") {
      dispatch("commit");
    } else {
      dispatch("equals");
    }
  }
</script>

<div class="grid grid-cols-4 gap-2" role="grid" aria-label="Calculator keypad">
  {#each keypad as key (key.id)}
    <button
      type="button"
      class={`${classFor(key)} ${key.spanClass ?? ""}`}
      on:click={() => handleKey(key)}
      aria-label={ariaFor(key)}
    >
      {key.label}
    </button>
  {/each}
</div>
