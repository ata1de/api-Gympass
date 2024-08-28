/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Cria uma nova conta de usuário com as credenciais fornecidas.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       409:
 *         description: O usuário já existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already exists"
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *                 issues:
 *                   type: object
 *                   example: {
 *                     "name": ["Required"],
 *                     "email": ["Invalid email address"],
 *                     "password": ["Password must be at least 6 characters long"]
 *                   }
 */