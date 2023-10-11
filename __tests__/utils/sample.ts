import sample from '@/utils/sample';

describe('sample', () => {
    it('should return undefined for an array of zero length', () => {
        expect(sample([])).toBeUndefined();
    });

    it('should return a random element from a given array', () => {
        const arr = [1, 2, 3, 4, 5];
        const counts = new Map<number, number>();
        const numSamples = 1000000;
        for (let i = 0; i < numSamples; i++) {
            const sampleValue = sample(arr) as number;
            if (!counts.has(sampleValue)) {
                counts.set(sampleValue, 0);
            }
            counts.set(sampleValue, counts.get(sampleValue)! + 1);
        }
        for (const value of arr) {
            // expect the number of times a value is sampled to be roughly equal to the number of times it appears in the array
            const count = counts.get(value)!;
            const expectedCount = numSamples / arr.length;
            const error = Math.abs(count - expectedCount) / expectedCount;
            expect(error).toBeLessThan(0.01); // allow for 1% error
        }
    });
});
