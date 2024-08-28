/**
 * @swagger
 * /check-ins/metric:
 *   get:
 *     summary: Obtém métricas de check-ins do usuário
 *     description: Retorna o total de check-ins realizados pelo usuário autenticado.
 *     tags:
 *       - Check-ins
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Métricas de check-ins obtidas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 42
 */
