// Lesson: Writing your first tests
export function max(a, b) {
  /* Make this more concise
  if (a > b) return a;
  else if (b > a) return b;
  return a;
  */
 return a > b ? a : b;
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return n.toString();
}

export function calculateAverage(arr) {
  if (arr.length === 0) return NaN;
  const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return sum / arr.length;
}