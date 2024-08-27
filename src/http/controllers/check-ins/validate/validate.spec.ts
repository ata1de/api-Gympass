import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { CreateAndAuthenticate } from '@/utils/test/create-and-authenticate';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe("Validate Check-ins (e2e)", () => {
    beforeAll(async() => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it("should be able to validate check-ins ", async () => {
        const token = await CreateAndAuthenticate(true)

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

        let checkIn = await prisma.checkIn.create({
            data: 
                {
                    gym_id: gym.id,
                    user_id: user.id,
                },
        })

        const validateResponse = await request(app.server)
        .patch(`/check-ins/${checkIn.id}/validate`)
        .set('Authorization', `Bearer ${token}`)
        .send()

        expect(validateResponse.status).toEqual(204)

        checkIn = await prisma.checkIn.findUniqueOrThrow({
            where: {
                id: checkIn.id
            }
        })

        expect(checkIn.validated_at).not.toBeNull()
    })
    
})