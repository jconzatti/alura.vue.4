<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { computed, defineComponent } from 'vue'
import FormularioTarefa from '../components/FormularioTarefa.vue'
import Tarefa from '../components/Tarefa.vue'
import Box from '../components/Box.vue'
import { useStore } from '@/store'
import {
  ALTERAR_TAREFA_DESCRICAO,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from '@/store/tipoAcao'
import type ITarefa from '@/interfaces/ITarefa'

export default defineComponent({
  name: 'Tarefas',
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    }
  },
  components: { FormularioTarefa, Tarefa, Box },
  computed: {
    fezAlgumaTarefa(): boolean {
      return this.tarefas.length > 0
    },
  },
  methods: {
    salvarTarefa(pTarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, pTarefa)
    },
    selecionarTarefa(pTarefa: ITarefa): void {
      this.tarefaSelecionada = pTarefa
    },
    cancelarTarefaSelecionada(): void {
      this.tarefaSelecionada = null
    },
    alterarDescricaoDaTarefaSelecionada(): void {
      if (this.tarefaSelecionada) {
        this.store
          .dispatch(ALTERAR_TAREFA_DESCRICAO, this.tarefaSelecionada)
          .then(this.cancelarTarefaSelecionada)
      }
    },
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)
    return {
      store,
      tarefas: computed(() => store.state.tarefas),
    }
  },
})
</script>

<template>
  <FormularioTarefa @evento-finalizar-tarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa
      v-for="(lTarefa, i) in tarefas"
      :key="i"
      :tarefa="lTarefa"
      @evento-selecionar-tarefa="selecionarTarefa"
    />
    <Box v-if="!fezAlgumaTarefa"> Você não está muito produtivo hoje :( </Box>
    <div v-if="tarefaSelecionada" class="modal" :class="{ 'is-active': tarefaSelecionada }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma Tarefa</p>
          <button class="delete" aria-label="close" @click="cancelarTarefaSelecionada"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricao-tarefa" class="label">Descrição</label>
            <input
              type="text"
              class="input"
              id="descricao-tarefa"
              v-model="tarefaSelecionada.descricao"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <button class="button is-success" @click="alterarDescricaoDaTarefaSelecionada">
              Salvar alterações
            </button>
            <button class="button" @click="cancelarTarefaSelecionada">Cancelar</button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.lista {
  padding: 1.25rem;
}
</style>
