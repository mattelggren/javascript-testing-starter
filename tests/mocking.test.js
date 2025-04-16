import { vi, it, expect, describe } from 'vitest'

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
    it('should return confirmation of message sent', () => {
        const sendText = vi.fn();
        sendText.mockImplementation(message => 'Message sent: ' + message);
        
        expect(sendText('yo, wassup')).toBe('Message sent: yo, wassup');
        expect(sendText).toHaveBeenCalledOnce();
    });
});