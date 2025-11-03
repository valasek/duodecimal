import { describe, it, expect } from 'vitest';
import { toDozenal } from '../lib/base12';


describe('toDozenal', () => {
    it('converts zero', () => {
        expect(toDozenal(0n)).toBe('0');
    });
    it('converts some integers', () => {
        expect(toDozenal(12n)).toBe('10');
        expect(toDozenal(11n)).toBe('E');
        expect(toDozenal(23n)).toBe('1E');
    });
});
