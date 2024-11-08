import type IProjeto from '@/interfaces/IProjeto'
import type { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import {
  ADICIONAR_PROJETO,
  ADICIONAR_TAREFA,
  ATUALIZAR_PROJETO,
  ATUALIZAR_TAREFA_DESCRICAO,
  DEFINIR_PROJETOS,
  DEFINIR_TAREFAS,
  EXCLUIR_PROJETO,
  NOTIFICAR,
} from './tipoMutacao'
import { type INotificacao } from '@/interfaces/INotificacao'
import {
  ALTERAR_PROJETO,
  ALTERAR_TAREFA_DESCRICAO,
  CADASTRAR_PROJETO,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  REMOVER_PROJETO,
} from './tipoAcao'
import clienteHTTP from '@/http'
import type ITarefa from '@/interfaces/ITarefa'

export interface IAppEstado {
  projetos: IProjeto[]
  tarefas: ITarefa[]
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<IAppEstado>> = Symbol()

export const store = createStore<IAppEstado>({
  state: {
    projetos: [],
    tarefas: [],
    notificacoes: [],
  },
  mutations: {
    [DEFINIR_PROJETOS](state, pProjetos: IProjeto[]) {
      state.projetos = pProjetos
    },
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
    [DEFINIR_TAREFAS](state, pTarefas: ITarefa[]) {
      state.tarefas = pTarefas
    },
    [ADICIONAR_TAREFA](state, pTarefa: ITarefa) {
      state.tarefas.push(pTarefa)
    },
    [ATUALIZAR_TAREFA_DESCRICAO](state, pTarefa: ITarefa) {
      const i = state.tarefas.findIndex((lTarefa) => lTarefa.id === pTarefa.id)
      state.tarefas[i].descricao = pTarefa.descricao
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
    [OBTER_TAREFAS]({ commit }) {
      clienteHTTP.get('tarefas').then((resposta) => commit(DEFINIR_TAREFAS, resposta.data))
    },
    [CADASTRAR_TAREFA]({ commit }, pTarefa: ITarefa) {
      return clienteHTTP
        .post('tarefas', pTarefa)
        .then((resposta) => commit(ADICIONAR_TAREFA, resposta.data))
    },
    [ALTERAR_TAREFA_DESCRICAO]({ commit }, pTarefa: ITarefa) {
      return clienteHTTP
        .patch(`tarefas/${pTarefa.id}`, { descricao: pTarefa.descricao })
        .then((resposta) => commit(ALTERAR_TAREFA_DESCRICAO, resposta.data))
    },
  },
})

export function useStore(): Store<IAppEstado> {
  return vuexUseStore(key)
}
