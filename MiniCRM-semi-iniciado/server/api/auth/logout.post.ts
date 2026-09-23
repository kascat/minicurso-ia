import { limparCookieSessao } from '../../../server/utils/session'

export default defineEventHandler((event) => {
  limparCookieSessao(event)
  return { ok: true }
})