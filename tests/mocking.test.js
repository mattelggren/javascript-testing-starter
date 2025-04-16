import { vi, it, expect, describe } from 'vitest'
import { getPriceInCurrency, getShippingInfo } from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');

describe('a test suite with sample mocks and mock matcher usage', () => {
    it('a test case for return value mocking', () => {
        const greet = vi.fn();
        greet.mockReturnValue('HELLO');

        expect(greet()).toMatch(/hello/i);
        expect(greet).toHaveBeenCalled();
    });
    it('a test case for promise mocking', () => {
        const greet = vi.fn();
        greet.mockResolvedValue('HELLO');

        greet().then(result => expect(result).toMatch(/hello/i));
        expect(greet).toHaveBeenCalledOnce();
    });
    it('a test case for implementation mocking', () => {
        const greet = vi.fn();
        greet.mockImplementation(name => 'HELLO ' + name);

        expect(greet('name')).toBe('HELLO name');
        expect(greet).toHaveBeenCalledWith('name');
    });
});

describe('mockSendText', () => {
    it('should return confirmation of a single message sent', () => {
        const sendText = vi.fn();
        sendText.mockImplementation(message => 'Message sent: ' + message);
        
        expect(sendText('yo, wassup')).toBe('Message sent: yo, wassup');
        expect(sendText).toHaveBeenCalledExactlyOnceWith('yo, wassup');
    });
});

describe('getPriceInCurrency', () => {
    it('should return price in target currency equivalent of USD', () => {
        vi.mocked(getExchangeRate).mockReturnValue(1.5);
        
        const price = getPriceInCurrency(10, 'AUD');

        expect(price).toBe(15);
    });
});

describe('getShippingInfo', () => {
    it('should return shipping info if quote can be fetched', () => {
        vi.mocked(getShippingQuote).mockReturnValue({ cost: 1, estimatedDays: 2 });
        
        const shippingInfo = getShippingInfo('Seattle');

        expect(shippingInfo).toMatch(/shipping cost: \$1 \(2 days\)/i);
    });
    it('should return an error if quote cannot be fetched', () => {
        vi.mocked(getShippingQuote).mockReturnValue(null);
        
        const shippingInfo = getShippingInfo('London');

        expect(shippingInfo).toMatch(/unavailable/i);
    });
});
