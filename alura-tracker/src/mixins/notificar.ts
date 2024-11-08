import type { TipoNotificacao } from '@/interfaces/INotificacao'
import { store } from '@/store'
import { NOTIFICAR } from '@/store/tipoMutacao'

export const notificacaoMixin = {
  methods: {
    notificar(pTipo: TipoNotificacao, pTitulo: string, pTexto: string): void {
      store.commit(NOTIFICAR, { titulo: pTitulo, texto: pTexto, tipo: pTipo })
    },
  },
}
