/**
 * @swagger
 * /gyms/{gymId}/check-ins:
 *   post:
 *     summary: Realiza um check-in em uma academia
 *     description: Realiza um check-in na academia especificada. O usuário deve estar próximo da academia para realizar o check-in.
 *     tags:
 *       - Check-ins
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: gymId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da academia onde o check-in será realizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *                 example: -23.55052
 *               longitude:
 *                 type: number
 *                 example: -46.633308
 *     responses:
            201:
                description: Check-in realizado com sucesso
            400:
                description: Erro de validação ou problemas relacionados ao check-in
                content:
                application/json:
                    schema:
                    type: object
                    properties:
                        message:
                        type: string
                        example: "Resource not found" # Exemplo de mensagem de erro

 */
