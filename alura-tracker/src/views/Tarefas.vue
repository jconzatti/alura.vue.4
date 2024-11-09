<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'
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
import Modal from '../components/Modal.vue'

export default defineComponent({
  name: 'Tarefas',
  components: { FormularioTarefa, Tarefa, Box, Modal },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    const tarefas = computed(() => store.state.tarefa.tarefas)
    const filtroDeDescricaoDaTarefa = ref('' as string)
    // const tarefas = computed(() =>
    //   store.state.tarefa.tarefas.filter(
    //     (lTarefa) => !filtroDeTarefa.value || lTarefa.descricao.includes(filtroDeTarefa.value),
    //   ),
    // )
    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtroDeDescricaoDaTarefa.value)
    })

    const fezAlgumaTarefa = computed((): boolean => {
      if (tarefas.value) {
        return tarefas.value.length > 0
      }
      return false
    })

    const tarefaSelecionada = ref(null as ITarefa | null)

    const salvarTarefa = (pTarefa: ITarefa): void => {
      store.dispatch(CADASTRAR_TAREFA, pTarefa)
    }
    const selecionarTarefa = (pTarefa: ITarefa): void => {
      tarefaSelecionada.value = pTarefa
    }
    const cancelarTarefaSelecionada = (): void => {
      tarefaSelecionada.value = null
    }
    const alterarDescricaoDaTarefaSelecionada = (): void => {
      if (tarefaSelecionada.value) {
        store
          .dispatch(ALTERAR_TAREFA_DESCRICAO, tarefaSelecionada.value)
          .then(cancelarTarefaSelecionada)
      }
    }

    return {
      tarefas,
      filtroDeDescricaoDaTarefa,
      tarefaSelecionada,
      fezAlgumaTarefa,
      salvarTarefa,
      selecionarTarefa,
      cancelarTarefaSelecionada,
      alterarDescricaoDaTarefaSelecionada,
    }
  },
  // data() {
  //   return {
  //     tarefaSelecionada: null as ITarefa | null,
  //   }
  // },
  // computed: {
  //   fezAlgumaTarefa(): boolean {
  //     if (this.tarefas) {
  //       return this.tarefas.length > 0
  //     }
  //     return false
  //   },
  // },
  // methods: {
  //   salvarTarefa(pTarefa: ITarefa): void {
  //     this.store.dispatch(CADASTRAR_TAREFA, pTarefa)
  //   },
  //   selecionarTarefa(pTarefa: ITarefa): void {
  //     this.tarefaSelecionada = pTarefa
  //   },
  //   cancelarTarefaSelecionada(): void {
  //     this.tarefaSelecionada = null
  //   },
  //   alterarDescricaoDaTarefaSelecionada(): void {
  //     if (this.tarefaSelecionada) {
  //       this.store
  //         .dispatch(ALTERAR_TAREFA_DESCRICAO, this.tarefaSelecionada)
  //         .then(this.cancelarTarefaSelecionada)
  //     }
  //   },
  // },
})
</script>

<template>
  <FormularioTarefa @evento-finalizar-tarefa="salvarTarefa" />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Digite pera filtrar"
          v-model="filtroDeDescricaoDaTarefa"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Tarefa
      v-for="(lTarefa, i) in tarefas"
      :key="i"
      :tarefa="lTarefa"
      @evento-selecionar-tarefa="selecionarTarefa"
    />
    <Box v-if="!fezAlgumaTarefa"> Você não está muito produtivo hoje :( </Box>
    <Modal v-if="tarefaSelecionada" :visivel="tarefaSelecionada != null">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editando uma Tarefa</p>
        <button class="delete" aria-label="close" @click="cancelarTarefaSelecionada"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
          <label for="descricao-tarefa" class="label">Descrição</label>
          <input
            type="text"
            class="input"
            id="descricao-tarefa"
            v-model="tarefaSelecionada.descricao"
          />
        </div>
      </template>
      <template v-slot:rodape>
        <div class="buttons">
          <button class="button is-success" @click="alterarDescricaoDaTarefaSelecionada">
            Salvar alterações
          </button>
          <button class="button" @click="cancelarTarefaSelecionada">Cancelar</button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<style lang="css">
.lista {
  padding: 1.25rem;
}
</style>
