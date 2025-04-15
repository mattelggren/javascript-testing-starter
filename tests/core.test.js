import { it, expect, describe } from 'vitest'
import { calculateDiscount, getCoupons, isPriceInRange, isValidUsername, validateUserInput } from "../src/core";

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
    it('should return true for price is on boundary min and max', () => {
        expect(isPriceInRange(1.99, 1.99, 1.99)).toBe(true);
    });
    it('should return false for price is less than min', () => {
        expect(isPriceInRange(1.98, 1.99, 1.99)).toBe(false);
    });
    it('should return false for price is greater than max', () => {
        expect(isPriceInRange(2.0, 1.99, 1.99)).toBe(false);
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