import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { CreateAndAuthenticate } from '@/utils/test/create-and-authenticate';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe("History Check-ins (e2e)", () => {
    beforeAll(async() => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it("should be able get history check-ins", async () => {
        const token = await CreateAndAuthenticate()

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                name: "Javascript Academy",
                description: "The best academy to learn javascript",
                phone: "123456",
                latitude: 90,
                longitude: 180,
            }
        })

        await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gym.id,
                    user_id: user.id,
                },
                {
                    gym_id: gym.id,
                    user_id: user.id,
                }
            ]
        })
        
        const checkInsResponse = await request(app.server)
        .get('/check-ins/history')
        .query({
            page: 1
        })
        .set('Authorization', `Bearer ${token}`)
        .send()

        expect(checkInsResponse.statusCode).toEqual(200)
        expect(checkInsResponse.body.checkIns).have.length(2)
    })
})