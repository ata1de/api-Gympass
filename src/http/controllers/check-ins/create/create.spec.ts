import { app } from '@/app';
import { CreateAndAuthenticate } from '@/utils/test/create-and-authenticate';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe("Create Check-ins (e2e)", () => {
    beforeAll(async() => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it("should be able create checkIn ", async () => {
        const token = await CreateAndAuthenticate()

        const gym = await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: "Javascript Academy",
            description: "The best academy to learn javascript",
            phone: "123456",
            latitude: 90,
            longitude: 180
        })

        const checkInResponse = await request(app.server)
        .post(`/gyms/${gym.body.gym.id}/check-ins`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            latitude: 90,
            longitude: 180
        })

        expect(checkInResponse.status).toEqual(201)
    })
    
})