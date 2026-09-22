import { randomBytes, scryptSync } from 'node:crypto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function hashSenha(senha: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(senha, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@minicrm.com' },
    update: {},
    create: {
      nome: 'Administrador',
      email: 'admin@minicrm.com',
      senhaHash: hashSenha('admin123'),
    },
  })

  const leads = [
    { nome: 'Ana Souza', email: 'ana.souza@example.com', telefone: '(41) 98888-0001', status: 'novo', dias: 0 },
    { nome: 'Bruno Lima', email: 'bruno.lima@example.com', telefone: '(41) 98888-0002', status: 'novo', dias: 1 },
    { nome: 'Carla Mendes', email: 'carla.mendes@example.com', telefone: '(41) 98888-0003', status: 'contatado', dias: 2 },
    { nome: 'Diego Rocha', email: 'diego.rocha@example.com', telefone: '(41) 98888-0004', status: 'contatado', dias: 3 },
    { nome: 'Elisa Prado', email: 'elisa.prado@example.com', telefone: '(41) 98888-0005', status: 'qualificado', dias: 4 },
    { nome: 'Felipe Nunes', email: 'felipe.nunes@example.com', telefone: '(41) 98888-0006', status: 'qualificado', dias: 6 },
    { nome: 'Gabriela Reis', email: 'gabriela.reis@example.com', telefone: '(41) 98888-0007', status: 'novo', dias: 8 },
    { nome: 'Hugo Barros', email: 'hugo.barros@example.com', telefone: '(41) 98888-0008', status: 'perdido', dias: 10 },
    { nome: 'Iris Castro', email: 'iris.castro@example.com', telefone: '(41) 98888-0009', status: 'perdido', dias: 12 },
    { nome: 'João Pinto', email: 'joao.pinto@example.com', telefone: '(41) 98888-0010', status: 'contatado', dias: 15 },
    { nome: 'Karla Duarte', email: 'karla.duarte@example.com', telefone: '(41) 98888-0011', status: 'qualificado', dias: 20 },
    { nome: 'Lucas Farias', email: 'lucas.farias@example.com', telefone: '(41) 98888-0012', status: 'novo', dias: 25 },
  ]

  for (const lead of leads) {
    const criadoEm = new Date()
    criadoEm.setDate(criadoEm.getDate() - lead.dias)
    await prisma.lead.upsert({
      where: { email: lead.email },
      update: {},
      create: {
        nome: lead.nome,
        email: lead.email,
        telefone: lead.telefone,
        status: lead.status,
        criadoEm,
      },
    })
  }

  console.log('Seed concluído: usuário administrador e leads de exemplo criados.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
