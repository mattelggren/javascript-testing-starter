import { it, expect, describe } from 'vitest'
import { getCoupons } from "../src/core";

describe('getCoupons', () => {
    it('should return an array', () => {
        expect(Array.isArray(getCoupons())).toBe(true);
    })
    it('should return a non-empty array', () => {
        expect(getCoupons().length).toBeGreaterThan(0);
    });
    it('should return valid discount codes', () => {
        getCoupons().forEach(coupon => {
            expect(coupon).toHaveProperty('code');
            expect(typeof coupon.code).toBe('string');
            expect(coupon.code.length).toBeGreaterThan(0);
        });
    });
    it('should return valid discount percentages', () => {
        getCoupons().forEach(coupon => {
            expect(coupon).toHaveProperty('discount');
            expect(typeof coupon.discount).toBe('number');
            expect(coupon.discount >= 0 && coupon.discount <= 1).toBe(true);
        });
    })
});
