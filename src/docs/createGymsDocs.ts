/**
 * @swagger
 * /gyms:
 *   post:
 *     summary: Cria uma nova academia
 *     description: Cria uma nova academia. Somente usuários com o papel de administrador podem acessar essa rota.
 *     tags:
 *       - Academias
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Academia XYZ"
 *               description:
 *                 type: string
 *                 example: "Academia completa com todos os equipamentos."
 *               phone:
 *                 type: string
 *                 example: "+55 11 99999-9999"
 *               latitude:
 *                 type: number
 *                 example: -23.55052
 *               longitude:
 *                 type: number
 *                 example: -46.633308
 *     responses:
 *       201:
 *         description: Academia criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gym:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     title:
 *                       type: string
 *                       example: "Academia XYZ"
 *                     description:
 *                       type: string
 *                       example: "Academia completa com todos os equipamentos."
 *                     phone:
 *                       type: string
 *                       example: "+55 11 99999-9999"
 *                     latitude:
 *                       type: number
 *                       example: -23.55052
 *                     longitude:
 *                       type: number
 *                       example: -46.633308
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden"
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
 */
