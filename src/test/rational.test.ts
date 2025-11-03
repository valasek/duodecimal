import { describe, it, expect } from 'vitest';
import { q, add, sub, mul, div } from '../lib/rational';


describe('rational ops', () => {
    it('adds', () => {
        expect(add(q(1n), q(1n))).toEqual(q(2n));
    });
    it('multiplies', () => {
        expect(mul(q(2n), q(3n))).toEqual(q(6n));
    });
    it('divides', () => {
        expect(div(q(6n), q(3n))).toEqual(q(2n));
    });
    it('subtracts', () => {
        expect(sub(q(5n), q(2n))).toEqual(q(3n));
    });
});
