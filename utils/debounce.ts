/**
 * Returns a debounced version of the given function, i.e. allows to call the function only once in a given time interval.
 * @param {Function} fn the function to debounce
 * @param {number} delay the time interval in milliseconds
 * @returns a debounced version of the given function
 * @example
 * const debouncedFn = debounce(() => { console.log('Hello World!') } , 1000);
 * debouncedFn();
 * debouncedFn();
 * debouncedFn();
 * // only one 'Hello World!' will be logged to the console, 1000ms after the last call to debouncedFn
 */
export default function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...funcArgs: Parameters<T>) => void {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    return function (...args: Parameters<T>) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    };
}
