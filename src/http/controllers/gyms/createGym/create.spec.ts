import { app } from '@/app';
import { CreateAndAuthenticate } from '@/utils/test/create-and-authenticate';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe("Create gym (e2e)", () => {
    beforeAll(async() => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it("should be able create gym ", async () => {
        const token = await CreateAndAuthenticate(true)

        const gymResponse = await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: "Javascript Academy",
            description: "The best academy to learn javascript",
            phone: "123456",
            latitude: 90,
            longitude: 180
        })

        expect(gymResponse.status).toEqual(201)
        expect(gymResponse.body.gym).toEqual(
            expect.objectContaining({
                phone: "123456"
            })
           )
    })
    
})