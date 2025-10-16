import {test, expect, describe} from 'vitest';
import {getSelectedDateString} from './DateUtilties';

describe('getSelectedDateString', () => {   
    test('returns formatted date string for a valid date', () => {
        const date = new Date('2025-10-12'); // October 12, 2025
        const result = getSelectedDateString(date);
        expect(result).toBe('Saturday, October 11');
    });

    test('returns undefined for null date', () => {
        const result = getSelectedDateString(null);
        expect(result).toBeUndefined();
    });

});