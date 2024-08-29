# Api-Gympass 🦾

# SCREENSHOT SWAGGER
![Imagem do WhatsApp de 2024-08-27 à(s) 21 43 38_38197ef4](https://github.com/user-attachments/assets/0dc77d10-f864-40d6-9b02-50660447d0d6)


## ☕ More about 
Esta API foi desenvolvida para um sistema de gym pass e oferece funcionalidades robustas para gerenciamento de academias e check-ins. Entre as principais características estão a criação e validação de check-ins com verificações de distância, utilizando coordenadas de latitude e longitude. O sistema também implementa controle de acesso baseado em funções (RBAC), garantindo que apenas usuários autorizados possam realizar ações específicas, como a criação de academias.


## 🚀 Techs used 
* **[ Fastify ](https://www.fastify.io/)**
* **[ Zod ](https://zod.dev/)**
* **[ Vitest ](https://vitest.dev/)**
* **[ GitHub Actions ](https://github.com/features/actions)**
* **[ bcryptjs ](https://github.com/dcodeIO/bcrypt.js)**
* **[ Dayjs ](https://day.js.org/)**
* **[ dotenv ](https://github.com/motdotla/dotenv)**
* **[ JWT ](https://jwt.io/)**
* **[ Refresh Tokens ](https://tools.ietf.org/html/rfc6749#section-1.5)**
* **[ RBAC ](https://en.wikipedia.org/wiki/Role-based_access_control)**

## 📝 Desafios e Aprendizados

Este projeto proporcionou uma rica experiência de aprendizado, especialmente na implementação de testes unitários e E2E, onde foi necessário manipular o schema do banco de dados e criar novos ambientes a cada teste. A automação com GitHub Actions foi outra grande conquista, trazendo uma nova dimensão de eficiência e qualidade ao processo de desenvolvimento.

## RFs (Requisitos funcionais)

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [X] Deve ser possível o usuário obter o seu histórico de check-ins;
- [X] Deve ser possível o usuário buscar academias próximas (até 10km);
- [X] Deve ser possível o usuário buscar academias pelo nome;
- [X] Deve ser possível o usuário realizar check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [X] O check-in só pode ser validado até 20 minutos após ser criado;
- [X] O check-in só pode ser validado por administradores;
- [X] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [X] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [X] O usuário deve ser identificado por um JWT (JSON Web Token);
