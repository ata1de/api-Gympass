import { app } from '@/app';
import { CreateAndAuthenticate } from '@/utils/test/create-and-authenticate';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe("Search gyms by query (e2e)", () => {
    beforeAll(async() => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it("should be able search gyms by query", async () => {
        const token = await CreateAndAuthenticate(true)

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

       const searchResponse = await request(app.server)
       .get('/gyms/search/Javascript/1')
       .set('Authorization', `Bearer ${token}`)
       .send()

       expect(searchResponse.statusCode).toEqual(201)
       expect(searchResponse.body.gyms).have.length(1)
       expect(searchResponse.body.gyms[0]).toEqual(
        expect.objectContaining({
            name: "Javascript Academy"
        })
       )

    })
})