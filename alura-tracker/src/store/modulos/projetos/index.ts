import clienteHTTP from '@/http'
import type IProjeto from '@/interfaces/IProjeto'
import type { IEstado } from '@/store'
import {
  ALTERAR_PROJETO,
  CADASTRAR_PROJETO,
  OBTER_PROJETOS,
  REMOVER_PROJETO,
} from '@/store/tipoAcao'
import {
  ADICIONAR_PROJETO,
  ATUALIZAR_PROJETO,
  DEFINIR_PROJETOS,
  EXCLUIR_PROJETO,
} from '@/store/tipoMutacao'
import type { Module } from 'vuex'

export interface IEstadoProjeto {
  projetos: IProjeto[]
}

export const moduloProjeto: Module<IEstadoProjeto, IEstado> = {
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
}
