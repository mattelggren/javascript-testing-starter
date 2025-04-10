import { describe, test, it, expect } from "vitest";
import { max } from "../src/intro.js";

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
    }),
    it('should return the second argument if it is greater', () => {
        expect(max(5, 10)).toBe(10);
    });
    it('should return the first argument if they are equal', () => {
        expect(max(10, 10)).toBe(10);
    })
})