import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe("Refresh Token (e2e)", () => {
    beforeAll(async() => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it("should be able refresh token", async () => {
        await request(app.server).post('/register').send({
            name: "John Doe",
            email: "jhon@email.com",
            password: "123456"
        })

        const authResponse = await request(app.server).post('/auth').send({
            email: "jhon@email.com",
            password: "123456"
        })

        const cookies = authResponse.get('Set-Cookie')

        const response = await request(app.server)
        .patch('/token/refresh')
        .set('Cookie', cookies!)
        .send()

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('token')
        expect(response.get('Set-Cookie')).toBeDefined()

    })
})