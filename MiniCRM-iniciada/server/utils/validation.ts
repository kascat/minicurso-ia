import { z } from 'zod'

export const STATUS_LEAD = ['novo', 'contatado', 'qualificado', 'perdido'] as const

export type StatusLead = (typeof STATUS_LEAD)[number]

export const leadSchema = z.object({
  nome: z
    .string({ required_error: 'Informe o nome.' })
    .trim()
    .min(3, 'O nome deve ter ao menos 3 caracteres.')
    .max(120, 'O nome deve ter no máximo 120 caracteres.'),
  email: z
    .string({ required_error: 'Informe o e-mail.' })
    .trim()
    .email('Informe um e-mail válido.')
    .max(160, 'O e-mail deve ter no máximo 160 caracteres.'),
  telefone: z
    .string({ required_error: 'Informe o telefone.' })
    .trim()
    .min(8, 'O telefone deve ter ao menos 8 caracteres.')
    .max(20, 'O telefone deve ter no máximo 20 caracteres.'),
  status: z.enum(STATUS_LEAD).optional().default('novo')
})

export type LeadInput = z.infer<typeof leadSchema>

export const loginSchema = z.object({
  email: z.string({ required_error: 'Informe o e-mail.' }).trim().email('Informe um e-mail válido.'),
  senha: z.string({ required_error: 'Informe a senha.' }).min(6, 'A senha deve ter ao menos 6 caracteres.')
})

export type LoginInput = z.infer<typeof loginSchema>
