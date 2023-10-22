/**
 * Given a number of seconds, returns a string in the format of MM:SS
 * @param seconds - The number of seconds to convert
 * @returns {string} - A string in the format of MM:SS
 */
export function prettyPrintTimestamp(seconds: number) {
    const secondsInteger = Math.floor(seconds);
    const minutes = Math.floor(secondsInteger / 60);
    const remainingSeconds = secondsInteger % 60;

    const formattedSeconds = `${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    const formattedMins = `${minutes < 10 ? '0' : ''}${minutes}`;

    return `${formattedMins}:${formattedSeconds}`;
}
