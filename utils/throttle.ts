type Procedure = (...args: any[]) => void;

/**
 * Throttle a function to be called at most once every `limit` milliseconds.
 * Calls the function immediately and at the end of the `limit` period if it was called more than once
 *
 * @param callback - The function to throttle
 * @param limit - The number of milliseconds to throttle invocations to
 * @returns A throttled version of the given function
 */
export default function throttle(this: ThisParameterType<Procedure>, callback: Procedure, limit: number): Procedure {
    let lastCall: number = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    return function (this: ThisParameterType<Procedure>, ...args: any[]) {
        const now: number = Date.now();

        if (!lastCall || (now - lastCall >= limit)) {
            lastCall = now;
            callback.apply(this, args);
        } else {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                lastCall = now;
                callback.apply(this, args);
            }, limit - (now - lastCall));
        }
    };
};
