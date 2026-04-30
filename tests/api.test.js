const request = require('supertest');
const app = require('../server');

// Mock the Gemini API controller to avoid real API calls during testing
jest.mock('../controllers/aiController', () => ({
    generateAiResponse: jest.fn().mockResolvedValue('<p>Mocked AI Response about elections.</p>')
}));

describe('Election Assistant API Tests', () => {
    
    describe('Security & Static Files', () => {
        it('should return security headers (Helmet)', async () => {
            const res = await request(app).get('/');
            expect(res.headers['content-security-policy']).toBeDefined();
            expect(res.headers['x-frame-options']).toBe('SAMEORIGIN');
            expect(res.statusCode).toBe(200);
        });

        it('should serve index.html on root', async () => {
            const res = await request(app).get('/');
            expect(res.text).toContain('Election Assistant AI');
        });
    });

    describe('POST /api/chat', () => {
        it('should return 400 if message is empty', async () => {
            const res = await request(app).post('/api/chat').send({});
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Message is required');
        });

        it('should return AI response for a valid message', async () => {
            const res = await request(app)
                .post('/api/chat')
                .send({ message: 'How do I vote?' });
            
            expect(res.statusCode).toBe(200);
            expect(res.body.response).toBe('<p>Mocked AI Response about elections.</p>');
        });
    });

});
