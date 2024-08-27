import { app } from '@/app';
import { CreateAndAuthenticate } from '@/utils/test/create-and-authenticate';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe("Get nearby gyms (e2e)", () => {
    beforeAll(async() => {
        await app.ready()

        const token = await CreateAndAuthenticate()

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: "Javascript Academy",
            description: "The best academy to learn javascript",
            phone: "123456",
            latitude: 90,
            longitude: 180
        })

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: "Typescript Academy",
            description: "The best academy to learn typescript",
            phone: "123456",
            latitude: 30,
            longitude: 110
        })

        
    })

    afterAll(async() => {
        await app.close()
    })

    it("should be able get nearby gyms", async () => {
        const token = await CreateAndAuthenticate()

        const nearbyResponse = await request(app.server)
        .get('/gyms/nearby')
        .query({
            latitude: 90,
            longitude: 180
        })
        .set('Authorization', `Bearer ${token}`)
        .send()

        expect(nearbyResponse.statusCode).toEqual(201)
        expect(nearbyResponse.body.gyms).have.length(1)
        expect(nearbyResponse.body.gyms[0]).toEqual(
         expect.objectContaining({
             name: "Javascript Academy"
         })
        )

    })
})