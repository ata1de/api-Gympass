/**
 * @swagger
 * /check-ins/history:
 *   get:
 *     summary: Obtém o histórico de check-ins do usuário
 *     description: Retorna uma lista paginada de check-ins realizados pelo usuário autenticado.
 *     tags:
 *       - Check-ins
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         required: false
 *         description: Número da página para a paginação
 *     responses:
 *       200:
 *         description: Histórico de check-ins obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 checkIns:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1"
 *                       gymId:
 *                         type: string
 *                         example: "10"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-27T12:34:56Z"
 */
