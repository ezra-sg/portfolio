// eztodo docs and tests
export function prettyPrintTimestamp(seconds: number) {
    const secondsInteger = Math.floor(seconds);
    const minutes = Math.floor(secondsInteger / 60);
    const remainingSeconds = secondsInteger % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
