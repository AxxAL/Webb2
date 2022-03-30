// function generates random value in range
export function generateNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}