import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe("Authenticate (e2e)", () => {
    beforeAll(async() => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it("should be able authenticate a user exists", async () => {
        await request(app.server).post('/register').send({
            name: "John Doe",
            email: "jhon@email.com",
            password: "123456"
        })

        const response = await request(app.server).post('/auth').send({
            email: "jhon@email.com",
            password: "123456"
        })

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('token')

    })
})