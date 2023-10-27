type Procedure = (...args: any[]) => void;

// eztodo docs and tests
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
