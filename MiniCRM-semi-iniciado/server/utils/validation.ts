import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido').max(160, 'E-mail muito longo'),
  senha: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(72, 'A senha deve ter no máximo 72 caracteres'),
})