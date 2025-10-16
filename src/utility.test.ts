import { test, expect, describe } from 'vitest';
import { AddNumbers } from './utility';



describe('AddNumbers function', () => {
    test('correctly adds two positive numbers', () => {
        expect(AddNumbers(2, 3)).toBe(5);
    });

    test('correctly adds a positive and a negative number', () => {
        expect(AddNumbers(5, -2)).toBe(3);
    });
});

