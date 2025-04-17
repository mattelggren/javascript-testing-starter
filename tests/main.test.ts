import { it, expect, describe } from 'vitest'
import { calculateDiscount } from '../src/main';

describe('calculateDiscount', () => {
  it('should return discounted price if given valid input', () => {
    expect(calculateDiscount(10.5, 'SAVE10')).toBe(9.45);
    expect(calculateDiscount(10.5, 'SAVE20')).toBe(8.4);
  });
  it('should handle negative price input', () => {
    expect(calculateDiscount(-10.5, 'SAVE10')).toMatch(/invalid/i);
  });
  it('should handle invalid discount code', () => {
    expect(calculateDiscount(10.5, 'SAVE100')).toBe(10.5);
  });
});
