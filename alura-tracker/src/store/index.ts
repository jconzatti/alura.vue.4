import type { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { NOTIFICAR } from './tipoMutacao'
import { type INotificacao } from '@/interfaces/INotificacao'
import { projeto, type IEstadoProjeto } from './modulos/projetos'
import { tarefa, type IEstadoTarefa } from './modulos/tarefas'

export interface IEstado {
  notificacoes: INotificacao[]
  projeto: IEstadoProjeto
  tarefa: IEstadoTarefa
}

export const key: InjectionKey<Store<IEstado>> = Symbol()

export const store = createStore<IEstado>({
  state: {
    notificacoes: [],
    projeto: {
      projetos: [],
    },
    tarefa: {
      tarefas: [],
    },
  },
  mutations: {
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
  modules: {
    projeto,
    tarefa,
  },
})

export function useStore(): Store<IEstado> {
  return vuexUseStore(key)
}
