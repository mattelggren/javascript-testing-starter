import { describe, test, it, expect } from "vitest";
import { max, fizzBuzz } from "../src/intro.js";

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