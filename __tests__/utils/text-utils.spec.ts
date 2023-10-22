import { prettyPrintTimestamp } from '@/utils/text-utils';

describe('prettyPrintTimestamp', () => {
    it('should nicely print timestamps', () => {
        expect(prettyPrintTimestamp(0)).toBe('00:00');
        expect(prettyPrintTimestamp(10)).toBe('00:10');
        expect(prettyPrintTimestamp(60)).toBe('01:00');
        expect(prettyPrintTimestamp(90)).toBe('01:30');
        expect(prettyPrintTimestamp(600)).toBe('10:00');
    });
});
