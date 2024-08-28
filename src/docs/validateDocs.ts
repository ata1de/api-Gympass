/**
 * @swagger
 * /check-ins/{checkInId}/validate:
 *   patch:
 *     summary: Valida um check-in
 *     description: Valida um check-in realizado por um usuário. Apenas administradores podem validar check-ins.
 *     tags:
 *       - Check-ins
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: checkInId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do check-in a ser validado
 *     responses:
        204:
            description: Check-in validado com sucesso
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
