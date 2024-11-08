import type IProjeto from '@/interfaces/IProjeto'
import type { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { ADICIONAR_PROJETO, ATUALIZAR_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from './tipoMutacao'
import { type INotificacao } from '@/interfaces/INotificacao'

export interface IAppEstado {
  projetos: IProjeto[]
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<IAppEstado>> = Symbol()

export const store = createStore<IAppEstado>({
  state: {
    projetos: [],
    notificacoes: [],
  },
  mutations: {
    [ADICIONAR_PROJETO](state, pNomeDoProjeto: string) {
      const lProjeto: IProjeto = {
        id: new Date().toISOString(),
        nome: pNomeDoProjeto,
      }
      state.projetos.push(lProjeto)
    },
    [ATUALIZAR_PROJETO](state, pProjeto: IProjeto) {
      const i = state.projetos.findIndex((lProjeto) => lProjeto.id === pProjeto.id)
      state.projetos[i] = pProjeto
    },
    [EXCLUIR_PROJETO](state, pIDDoProjeto: string) {
      state.projetos = state.projetos.filter((lProjeto) => lProjeto.id !== pIDDoProjeto)
    },
    [NOTIFICAR](state, pNotificacao: INotificacao) {
      pNotificacao.id = new Date().getTime()
      state.notificacoes.push(pNotificacao)
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (lNotificacao) => lNotificacao.id !== pNotificacao.id,
        )
      }, 3000)
    },
  },
})

export function useStore(): Store<IAppEstado> {
  return vuexUseStore(key)
}
