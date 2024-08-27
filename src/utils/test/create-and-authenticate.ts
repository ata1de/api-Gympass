import { app } from '@/app';
import request from 'supertest';

export async function CreateAndAuthenticate() {
    await request(app.server).post('/register').send({
        name: "John Doe",
        email: "jhon@email.com",
        password: "123456"
    })

    const authResponse = await request(app.server).post('/auth').send({
        email: "jhon@email.com",
        password: "123456"
    })

    const { token } = authResponse.body

    return token
}