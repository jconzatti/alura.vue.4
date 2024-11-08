<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue'
import FormularioTarefa from '../components/FormularioTarefa.vue'
import Tarefa from '../components/Tarefa.vue'
import type ITarefa from '../interfaces/ITarefa'
import Box from '../components/Box.vue'

export default defineComponent({
  name: 'Tarefas',
  components: { FormularioTarefa, Tarefa, Box },
  data() {
    return {
      tarefas: [] as ITarefa[],
    }
  },
  computed: {
    fezAlgumaTarefa(): boolean {
      return this.tarefas.length > 0
    },
  },
  methods: {
    salvarTarefa(pTarefa: ITarefa): void {
      this.tarefas.push(pTarefa)
    },
  },
})
</script>

<template>
  <FormularioTarefa @evento-finalizar-tarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa v-for="(lTarefa, i) in tarefas" :key="i" :tarefa="lTarefa" />
    <Box v-if="!fezAlgumaTarefa"> Você não está muito produtivo hoje :( </Box>
  </div>
</template>

<style lang="css">
.lista {
  padding: 1.25rem;
}
</style>
