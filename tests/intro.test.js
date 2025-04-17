import { describe, test, it, expect } from 'vitest';
import { max, fizzBuzz, calculateAverage, factorial } from '../src/intro';

describe('max', () => {
  it('should return the first argument if it is greater', () => {
    // Using AAA pattern
    // Arrange
    //const a = 10;
    //const b = 5;
    // Act
    //const result = max(a, b);
    // Assert
    //expect(result).toBe(10);
    // OR, more concisely
    expect(max(10, 5)).toBe(10);
  });
  it('should return the second argument if it is greater', () => {
    expect(max(5, 10)).toBe(10);
  });
  it('should return the first argument if they are equal', () => {
    expect(max(10, 10)).toBe(10);
  });
});

describe('fizzBuzz', () => {
  it('should return FizzBuzz if arg is divisible by 3 and 5', () => {
    expect(fizzBuzz(30)).toBe('FizzBuzz');
  });
  it('should return Fizz if arg is divisible by 3 but not 5', () => {
    expect(fizzBuzz(9)).toBe('Fizz');
  });
  it('should return Buzz if arg is divisible by 5 but not 3', () => {
    expect(fizzBuzz(10)).toBe('Buzz');
  });
  it('should return the input as a string if arg is not divisible by 3 or 5', () => {
    expect(fizzBuzz('NAN')).toBe('NAN');
  });
});

describe('calculateAverage', () => {
  it('should return NaN if given an empty array', () => {
    expect(calculateAverage([])).toBe(NaN);
  });
  it('should return average of an array with a single element', () => {
    expect(calculateAverage([2])).toBe(2);
  });
  it('should return average of an array with more than one element', () => {
    expect(calculateAverage([1, 2, 3, 4])).toBe(2.5);
  });
});

describe('factorial', () => {
  it('should return an error message for non-integer types', () => {
    expect(factorial(NaN)).toMatch(/error/i);
  });
  it('should return an error message for negative integers', () => {
    expect(factorial(-1)).toMatch(/error/i);
  });
  it('should return 1 as the factorial for 0', () => {
    expect(factorial(0)).toBe(1);
  });
  it('should return an accurate factorial for a small number', () => {
    expect(factorial(5)).toBe(120);
  });
  it('should return an accurate factorial for a medium number', () => {
    expect(factorial(56)).toBeCloseTo(7.109985878048635e74);
  });
  it('should return an accurate factorial for a large number', () => {
    expect(factorial(256)).toBe(Infinity);
  });
});
