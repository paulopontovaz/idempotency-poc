export const debounce = (callback: () => void, waitTime = 3000) => {
    let timeout: Timer;

    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(callback, waitTime);
    };
};
