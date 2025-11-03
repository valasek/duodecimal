<script lang="ts">
  import type { Q } from "../lib/rational";
  import { toDozenal } from "../lib/base12";

  export let current: Q;
  export let pending: Q | null;
  export let op: "+" | "-" | "×" | "÷" | null;
  export let input: string;
  export let set: "XE" | "Glyphe" = "XE";

  const fmt = (n: bigint) => toDozenal(n, set);
</script>

<div
  class="space-y-1 rounded-3xl bg-slate-100/80 p-4 text-right text-slate-900 shadow-inner shadow-slate-900/5 transition dark:bg-slate-900/70 dark:text-slate-100"
  role="status"
  aria-live="polite"
>
  <div class="text-xs font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
    {pending ? `${fmt(pending.n)} ${op ?? ""}` : " "}
  </div>
  <div class="tabular-nums font-mono text-4xl leading-tight">
    {input || fmt(current.n)}
  </div>
</div>
