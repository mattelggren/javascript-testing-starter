import { it, expect, describe, beforeAll, beforeEach, afterAll, afterEach } from 'vitest'
import { calculateDiscount, canDrive, getCoupons, fetchData, fetchDataFailedPromise, 
    isPriceInRange, isValidUsername, Stack, validateUserInput } from "../src/core";

describe('getCoupons', () => {
    it('should return an array', () => {
        expect(Array.isArray(getCoupons())).toBe(true);
    });
    it('should return a non-empty array', () => {
        expect(getCoupons().length).toBeGreaterThan(0);
    });
    it('should return valid discount codes', () => {
        getCoupons().forEach(coupon => {
            expect(coupon).toHaveProperty('code');
            expect(typeof coupon.code).toBe('string');
            expect(coupon.code).toBeTruthy(); // checks for empty string
        });
    });
    it('should return valid discount percentages', () => {
        getCoupons().forEach(coupon => {
            expect(coupon).toHaveProperty('discount');
            expect(typeof coupon.discount).toBe('number');
            expect(coupon.discount >= 0 && coupon.discount <= 1).toBe(true);
        });
    });
});

describe('calculateDiscount', () => {
    it('should return discounted price if given valid input', () => {
        expect(calculateDiscount(10.50, 'SAVE10')).toBe(9.45);
        expect(calculateDiscount(10.50, 'SAVE20')).toBe(8.40);
    });
    it('should handle non-numeric price input', () => {
        expect(calculateDiscount('ten fiddy', 'SAVE10')).toMatch(/invalid/i);
        expect(calculateDiscount(-10.50, 'SAVE10')).toMatch(/invalid/i);
    });
    it('should handle negative price input', () => {
        expect(calculateDiscount(-10.50, 'SAVE10')).toMatch(/invalid/i);
    });
    it('should handle non-string discount code input', () => {
        expect(calculateDiscount(10.50, 10.50)).toMatch(/invalid/i);
    });
    it('should handle invalid discount code', () => {
        expect(calculateDiscount(10.50, 'SAVE100')).toBe(10.50);
    });
});

describe('validateUserInput', () => {
    it('should return validation success if given valid input', () => {
        expect(validateUserInput('unm', 18)).toMatch(/success/i);
    });
    it('should handle non-string user name input', () => {
        expect(validateUserInput(0, 18)).toMatch(/invalid/i);
    });
    it('should handle user name input less than 3 characters', () => {
        expect(validateUserInput('un', 18)).toMatch(/invalid/i);
    });
    it('should handle user name input greater than 20 characters', () => {
        expect(validateUserInput('a'.repeat(21), 18)).toMatch(/invalid/i);
    });
    it('should handle non-numeric age input', () => {
        expect(validateUserInput('unm', 'unm')).toMatch(/invalid/i);
    });
    it('should handle age input less than 18', () => {
        expect(validateUserInput('unm', 17)).toMatch(/invalid/i);
    });
    it('should handle age input greater than 999', () => {
        expect(validateUserInput('unm', 1000)).toMatch(/invalid/i);
    });
    it('should handle combined invalid username and age input', () => {
        expect(validateUserInput('un', 17)).toMatch(/invalid user/i);
        expect(validateUserInput('un', 17)).toMatch(/invalid age/i);
    });
});

describe('isPriceInRange', () => {
    const minPrice = 0.01;
    const maxPrice = 1.0; // it's a dollar store!
    it.each([
        {scenario: 'price = min', price: minPrice, result: true},
        {scenario: 'price > min', price: minPrice + 0.01, result: true},
        {scenario: 'price < min', price: minPrice - 0.01, result: false},
        {scenario: 'price = max', price: maxPrice, result: true},
        {scenario: 'price < max', price: maxPrice - 0.01, result: true},
        {scenario: 'price > max', price: maxPrice + 0.01, result: false},
    ])('should return $result when $scenario', ({ price, result }) => {
        expect(isPriceInRange(price, minPrice, maxPrice)).toBe(result);
    });
});

describe('isValidUsername', () => {
    const minLength = 5;
    const maxLength = 15;
    it('should return true for username is on the min or max boundary', () => {
        expect(isValidUsername('n'.repeat(minLength))).toBe(true);
        expect(isValidUsername('n'.repeat(maxLength))).toBe(true);
    });
    it('should return false for username is outside the min or max boundary', () => {
        expect(isValidUsername('n'.repeat(minLength - 1))).toBe(false);
        expect(isValidUsername('n'.repeat(maxLength + 1))).toBe(false);
    });
    it('should handle non-string username inputs', () => {
        expect(isValidUsername(null)).toMatch(/invalid/i);
    });
});

describe('canDrive', () => {
    const minUS = 16;
    const minUK = 17;

    it('should handle invalid countryCode input', () => {
        expect(canDrive(minUS, null)).toMatch(/invalid/i);
    });
    it.each([
        { age: minUS, countryCode: 'US', result: true },
        { age: minUS + 1, countryCode: 'US', result: true },
        { age: minUS - 1, countryCode: 'US', result: false },
        { age: minUK, countryCode: 'UK', result: true },
        { age: minUK + 1, countryCode: 'UK', result: true },
        { age: minUK - 1, countryCode: 'UK', result: false },
    ])('should return $result for $age, $countryCode', ({ age, countryCode, result }) => {
        expect(canDrive(age, countryCode)).toBe(result);
    });
});

describe('fetchData', () => {
    it('should return a promise that will resolve to an array of numbers', async () => {
        const result = await fetchData();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });
});

describe('fetchDataFailedPromise', () => {
    it('should handle a failed promise', async () => {
        try {
            const result = await fetchDataFailedPromise();
        } catch (error) {
            expect(error).toHaveProperty('reason');
            expect(error.reason).toMatch(/fail/i);
        }
    });
});

describe('Stack', () => {
    let stack;
    beforeAll(() => {
        console.log('called beforeAll');
    });
    beforeEach(() => {
        console.log('called beforeEach');
        stack = new Stack();
    });
    afterEach(() => {
        console.log('called afterEach');
    });
    afterAll(() => {
        console.log('called afterAll');
    });

    it('should initialize as a Stack instance', () => {
        expect(stack instanceof Stack).toBe(true);
    });
    it('should accept pushes onto the stack', () => {
        stack.push(1);
        expect(stack.size()).toBe(1);
    });
    it('should accept pops off of the stack', () => {
        stack.push(1);
        expect(stack.pop()).toBe(1);
        expect(stack.size()).toBe(0);
    });
    it('should return an error for pop if the stack is empty', () => {
        expect(() => stack.pop()).toThrowError(/empty/i);
    })
    it('should support peek at top of stack without removing it', () => {
        stack.push(1);
        stack.push(2);
        expect(stack.peek()).toBe(2);
        expect(stack.size()).toBe(2);
    });
    it('should return an error for peek if the stack is empty', () => {
        expect(() => stack.peek()).toThrowError(/empty/i);
    });
    it('should return true for isEmpty if the stack is empty', () => {
        expect(stack.isEmpty()).toBe(true);
    });
    it('should return false for isEmpty if the stack is not empty', () => {
        stack.push(1);
        expect(stack.isEmpty()).toBe(false);
    });
    it('should return size of stack', () => {
        stack.push(1);
        stack.push(2);
        expect(stack.size()).toBe(2);
    });
    it('should support clearing all items from the stack', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);
        expect(stack.size()).toBe(3);
        stack.clear();
        expect(stack.size()).toBe(0);
    });
});
