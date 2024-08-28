/**
 * @swagger
 * /gyms/search/{query}/{page}:
 *   get:
 *     summary: Busca academias por nome
 *     description: Retorna uma lista de academias com base em uma consulta de nome e paginação.
 *     tags:
 *       - Academias
 *     parameters:
 *       - in: path
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome ou parte do nome da academia a ser pesquisada
 *       - in: path
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         required: true
 *         description: Número da página para a paginação
 *     responses:
 *       200:
 *         description: Lista de academias retornada com sucesso
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
 *                       description:
 *                         type: string
 *                         example: "Academia completa com todos os equipamentos."
 *                       phone:
 *                         type: string
 *                         example: "+55 11 99999-9999"
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
