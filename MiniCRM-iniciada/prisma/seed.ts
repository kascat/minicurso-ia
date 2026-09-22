import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../server/utils/password'

const prisma = new PrismaClient()

const DIA = 24 * 60 * 60 * 1000

const leads = [
  { nome: 'Ana Souza', email: 'ana.souza@exemplo.com', telefone: '(42) 99990-0001', status: 'novo', diasAtras: 0 },
  { nome: 'Bruno Lima', email: 'bruno.lima@exemplo.com', telefone: '(42) 99990-0002', status: 'novo', diasAtras: 2 },
  { nome: 'Carla Mendes', email: 'carla.mendes@exemplo.com', telefone: '(42) 99990-0003', status: 'contatado', diasAtras: 1 },
  { nome: 'Diego Rocha', email: 'diego.rocha@exemplo.com', telefone: '(42) 99990-0004', status: 'qualificado', diasAtras: 5 },
  { nome: 'Elisa Ferreira', email: 'elisa.ferreira@exemplo.com', telefone: '(42) 99990-0005', status: 'perdido', diasAtras: 9 },
  { nome: 'Felipe Nunes', email: 'felipe.nunes@exemplo.com', telefone: '(42) 99990-0006', status: 'novo', diasAtras: 12 },
  { nome: 'Gabriela Alves', email: 'gabriela.alves@exemplo.com', telefone: '(42) 99990-0007', status: 'contatado', diasAtras: 3 },
  { nome: 'Henrique Dias', email: 'henrique.dias@exemplo.com', telefone: '(42) 99990-0008', status: 'qualificado', diasAtras: 20 },
  { nome: 'Isabela Martins', email: 'isabela.martins@exemplo.com', telefone: '(42) 99990-0009', status: 'perdido', diasAtras: 15 },
  { nome: 'João Pedro Costa', email: 'joao.costa@exemplo.com', telefone: '(42) 99990-0010', status: 'novo', diasAtras: 6 },
  { nome: 'Karina Oliveira', email: 'karina.oliveira@exemplo.com', telefone: '(42) 99990-0011', status: 'contatado', diasAtras: 30 },
  { nome: 'Lucas Pereira', email: 'lucas.pereira@exemplo.com', telefone: '(42) 99990-0012', status: 'qualificado', diasAtras: 4 }
]

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@minicrm.com' },
    update: {},
    create: {
      nome: 'Administrador',
      email: 'admin@minicrm.com',
      senhaHash: hashPassword('admin123')
    }
  })

  const agora = Date.now()

  for (const lead of leads) {
    await prisma.lead.upsert({
      where: { email: lead.email },
      update: {},
      create: {
        nome: lead.nome,
        email: lead.email,
        telefone: lead.telefone,
        status: lead.status,
        criadoEm: new Date(agora - lead.diasAtras * DIA)
      }
    })
  }

  console.log('Seed concluído.')
}

main()
  .catch((erro) => {
    console.error(erro)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
