import type { TipoNotificacao } from '@/interfaces/INotificacao'
import { store } from '@/store'
import { NOTIFICAR } from '@/store/tipoMutacao'

type Notificador = {
  notificar: (pTipo: TipoNotificacao, pTitulo: string, pTexto: string) => void
}

export default (): Notificador => {
  const notificar = (pTipo: TipoNotificacao, pTitulo: string, pTexto: string): void => {
    store.commit(NOTIFICAR, { titulo: pTitulo, texto: pTexto, tipo: pTipo })
  }

  return {
    notificar,
  }
}
