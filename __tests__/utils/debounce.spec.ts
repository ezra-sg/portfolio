import debounce from '@/utils/debounce';

describe('debounce', () => {
    it('should correctly debounce a given function', () => {
        const fn = jest.fn();
        const debouncedFn = debounce(fn, 1000);

        debouncedFn();
        debouncedFn();
        debouncedFn();

        expect(fn).not.toBeCalled();

        jest.advanceTimersByTime(1000);

        expect(fn).toBeCalledTimes(1);
    });
});
