export interface Q { n: bigint; d: bigint } // n/d, d>0
const abs = (a: bigint) => (a < 0n ? -a : a);
const gcd = (a: bigint, b: bigint): bigint => (b === 0n ? abs(a) : gcd(b, a % b));


export const q = (n: bigint, d: bigint = 1n): Q => {
    if (d === 0n) throw new Error('division by zero');
    const s = d < 0n ? -1n : 1n;
    const g = gcd(n, d);
    return { n: (n / g) * s, d: (d / g) * s };
};
export const add = (a: Q, b: Q): Q => q(a.n * b.d + b.n * a.d, a.d * b.d);
export const sub = (a: Q, b: Q): Q => q(a.n * b.d - b.n * a.d, a.d * b.d);
export const mul = (a: Q, b: Q): Q => q(a.n * b.n, a.d * b.d);
export const div = (a: Q, b: Q): Q => q(a.n * b.d, a.d * b.n);
