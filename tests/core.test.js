import { it, expect, describe } from 'vitest'
import { calculateDiscount, getCoupons } from "../src/core";

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
