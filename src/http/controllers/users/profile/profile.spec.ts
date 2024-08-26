import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe("Get profile details (e2e)", () => {
    beforeAll(async() => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it("should be able get profile details", async () => {
        const user = await request(app.server).post('/register').send({
            name: "John Doe",
            email: "jhon@email.com",
            password: "123456"
        })

        const authResponse = await request(app.server).post('/auth').send({
            email: user.body.email,
            password: user.body.password
        })

        const { token } = authResponse.body

       const profileResponse = await request(app.server)
       .get('/me')
       .set('Authorization', `Bearer ${token}`)
       .send()

       expect(profileResponse.statusCode).toEqual(200)
       expect(profileResponse.body).toEqual(
        expect.objectContaining({
            email: 'jhon@email.com'
        })
       )

    })
})