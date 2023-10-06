/**
 * Returns a random element from the given array. If the array is empty, returns undefined.
 *
 * @param {Array} array
 * @returns an element from the given array
 */
export function sample<T>(array: T[]): T | undefined {
    if (array.length === 0) {
        return undefined;
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
