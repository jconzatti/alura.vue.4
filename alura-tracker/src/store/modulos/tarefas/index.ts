import clienteHTTP from '@/http'
import type ITarefa from '@/interfaces/ITarefa'
import type { IEstado } from '@/store'
import { ALTERAR_TAREFA_DESCRICAO, CADASTRAR_TAREFA, OBTER_TAREFAS } from '@/store/tipoAcao'
import { ADICIONAR_TAREFA, ATUALIZAR_TAREFA_DESCRICAO, DEFINIR_TAREFAS } from '@/store/tipoMutacao'
import type { Module } from 'vuex'

export interface IEstadoTarefa {
  tarefas: ITarefa[]
}

export const tarefa: Module<IEstadoTarefa, IEstado> = {
  mutations: {
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
  },
  actions: {
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
}
