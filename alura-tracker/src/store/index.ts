import type IProjeto from '@/interfaces/IProjeto'
import type { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import {
  ADICIONAR_PROJETO,
  ATUALIZAR_PROJETO,
  DEFINIR_PROJETOS,
  EXCLUIR_PROJETO,
  NOTIFICAR,
} from './tipoMutacao'
import { type INotificacao } from '@/interfaces/INotificacao'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from './tipoAcao'
import clienteHTTP from '@/http'

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
    [DEFINIR_PROJETOS](state, pProjetos: IProjeto[]) {
      state.projetos = pProjetos
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
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      clienteHTTP.get('projetos').then((resposta) => commit(DEFINIR_PROJETOS, resposta.data))
    },
    [CADASTRAR_PROJETO](contexto, pNomeDoProjeto: string) {
      return clienteHTTP.post('projetos', { nome: pNomeDoProjeto })
    },
    [ALTERAR_PROJETO](contexto, pProjeto: IProjeto) {
      return clienteHTTP.put(`projetos/${pProjeto.id}`, pProjeto)
    },
    [REMOVER_PROJETO]({ commit }, pIDDoProjeto: string) {
      return clienteHTTP
        .delete(`projetos/${pIDDoProjeto}`)
        .then(() => commit(EXCLUIR_PROJETO, pIDDoProjeto))
    },
  },
})

export function useStore(): Store<IAppEstado> {
  return vuexUseStore(key)
}
