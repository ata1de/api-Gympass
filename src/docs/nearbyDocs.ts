/**
 * @swagger
 * /gyms/nearby:
 *   get:
 *     summary: Busca academias próximas
 *     description: Retorna uma lista de academias próximas com base nas coordenadas fornecidas.
 *     tags:
 *       - Academias
 *     parameters:
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *           example: -23.55052
 *         required: true
 *         description: Latitude da localização atual
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *           example: -46.633308
 *         required: true
 *         description: Longitude da localização atual
 *     responses:
 *       200:
 *         description: Lista de academias próximas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gyms:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1"
 *                       title:
 *                         type: string
 *                         example: "Academia XYZ"
 *                       latitude:
 *                         type: number
 *                         example: -23.55052
 *                       longitude:
 *                         type: number
 *                         example: -46.633308
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
