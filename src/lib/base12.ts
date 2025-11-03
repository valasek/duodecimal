export type DigitSet = 'XE' | 'Glyphe';
const sets = {
    XE: { ten: 'X', eleven: 'E' },
    Glyphe: { ten: '↊', eleven: '↋' }
} as const;


export function toDozenal(n: bigint, set: DigitSet = 'XE'): string {
    if (n === 0n) return '0';
    const { ten, eleven } = sets[set];
    const digits: string[] = [];
    const twelve = 12n;
    let x = n < 0n ? -n : n;
    while (x > 0n) {
        const d = x % twelve;
        digits.push(d <= 9n ? d.toString() : d === 10n ? ten : eleven);
        x /= twelve;
    }
    return (n < 0n ? '-' : '') + digits.reverse().join('');
}
