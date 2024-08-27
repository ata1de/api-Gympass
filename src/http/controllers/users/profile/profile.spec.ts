import { app } from '@/app';
import { CreateAndAuthenticate } from '@/utils/test/create-and-authenticate';
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
        const token = await CreateAndAuthenticate()

       const profileResponse = await request(app.server)
       .get('/me')
       .set('Authorization', `Bearer ${token}`)
       .send()

       expect(profileResponse.statusCode).toEqual(200)
       expect(profileResponse.body.user).toEqual(
        expect.objectContaining({
            email: 'jhon@email.com'
        })
       )

    })
})