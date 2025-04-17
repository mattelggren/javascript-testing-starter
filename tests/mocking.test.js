import { vi, it, expect, describe } from 'vitest'
import { getPriceInCurrency, getShippingInfo, login, renderPage, submitOrder, signUp } from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import { trackPageView } from '../src/libs/analytics';
import { charge } from '../src/libs/payment';
import { sendEmail } from '../src/libs/email';
import security from '../src/libs/security';

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');
vi.mock('../src/libs/analytics');
vi.mock('../src/libs/payment');
vi.mock('../src/libs/email', async (importOriginal) => {
    const originalModule = await importOriginal();
    return {
        ...originalModule,
        sendEmail: vi.fn()
    }
});

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

describe('renderPage', () => {
    it('should return correct content', async () => {
        const result = await renderPage();

        expect(result).toMatch(/content/i);
    });
    it('should call analytics', async () => {
        await renderPage();

        expect(trackPageView).toHaveBeenCalledWith('/home');
    });
});

describe('submitOrder', () => {
    const creditCard = 1234567891011121;
    const order = {totalAmount: 10};
    it('should call the charge function with the right arguments', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'success' });
        
        await submitOrder(order, creditCard);

        expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
    });
    it('should return success for a successful payment result', () => {
        vi.mocked(charge).mockResolvedValue({ status: 'success' });

        submitOrder(order, creditCard).then(result => 
            expect(result).toEqual({success: true}));
    });
    it('should return error for a failed payment result', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'failed' });

        submitOrder(order, creditCard).then(result => 
            expect(result).toEqual({success: false, error: 'payment_error'}));
    });
});

describe('signUp', () => {
    /* NOT NECESSARY because we added auto mock clearing to vitest.config.js
    beforeEach(() => {
        vi.mocked(sendEmail).mockClear;
    }); */

    const email = 'name@domain.com';
    let args = [];
    it('should return false if email is not valid', async () => {
        signUp(null).then(result => expect(result).toBe(false));
    });
    it('should return true if email is valid', async () => {
        signUp(email).then(result => expect(result).toBe(true));
    });
    it('should send welcome email if email is valid', async () => {
        await signUp(email);
        args = vi.mocked(sendEmail).mock.calls[0];

        expect(sendEmail).toHaveBeenCalled();
        expect(args[0]).toBe(email);
        expect(args[1]).toMatch(/welcome/i);
    });
});

describe('login', () => {
    it('should email the one-time login code', async () => {
        const email = 'name@domain.com';
        const spy = vi.spyOn(security, 'generateCode');

        await login(email);

        const securityCode = spy.mock.results[0].value.toString();
        
        expect(sendEmail).toHaveBeenCalledWith(email, securityCode);
    });
});
