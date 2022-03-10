// Returns random number in provided range.
export function generateNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}