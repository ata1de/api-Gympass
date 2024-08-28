/**
 * @swagger
 * /token/refresh:
 *   patch:
 *     summary: Atualiza o token JWT
 *     description: Gera um novo token JWT e refresh token usando o token JWT atual.
 *     tags:
 *       - Autenticação
 *     responses:
 *       200:
 *         description: Token atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Não autorizado, verificação do JWT falhou
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 */
