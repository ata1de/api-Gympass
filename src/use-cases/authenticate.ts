import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredentials } from "./errors/invalid-credentials";


interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private userRepository: UsersRepository) {}

    async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
        // Buscar o usuário no banco pelo email
        // Compara se a senha do banco bate com a senha passada
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentials()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentials()
        
        }

        return { user }
    }
}