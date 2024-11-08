<script lang="ts">
import type IProjeto from '@/interfaces/IProjeto'
import { useStore } from '@/store'
import { OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/tipoAcao'
import { computed, defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'ListaProjetos',
  components: { RouterLink },
  methods: {
    excluirProjeto(pProjeto: IProjeto) {
      if (confirm(`Tem certeza que deseja excluir o projeto ${pProjeto.nome}?`)) {
        this.store.dispatch(REMOVER_PROJETO, pProjeto.id)
      }
    },
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_PROJETOS)
    return {
      store,
      projetos: computed(() => store.state.projetos),
    }
  },
})
</script>

<template>
  <RouterLink to="/projetos/novo" class="button">
    <span class="icon is-small">
      <i class="fas fa-plus"></i>
    </span>
    <span>Novo Projeto</span>
  </RouterLink>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="lProjeto in projetos" :key="lProjeto.id">
        <td>{{ lProjeto.id }}</td>
        <td>{{ lProjeto.nome }}</td>
        <td>
          <RouterLink :to="`/projetos/${lProjeto.id}`" class="button">
            <span class="icon is-small">
              <i class="fas fa-pencil-alt"></i>
            </span>
          </RouterLink>
          <button class="button ml-2 is-danger" @click="excluirProjeto(lProjeto)">
            <span class="icon is-small">
              <i class="fas fa-trash"></i>
            </span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="css" scoped>
table {
  margin-top: 2rem;
}
</style>
