<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Relogio from './Relogio.vue'
import type ITarefa from '@/interfaces/ITarefa'
import Box from './Box.vue'
export default defineComponent({
  name: 'Tarefa',
  emits: ['eventoSelecionarTarefa'],
  components: { Relogio, Box },
  props: {
    tarefa: { type: Object as PropType<ITarefa>, required: true },
  },
  methods: {
    selecionarTarefa(): void {
      this.$emit('eventoSelecionarTarefa', this.tarefa)
    },
  },
})
</script>

<template>
  <Box>
    <div class="columns clicavel" @click="selecionarTarefa">
      <div class="column is-4">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
      <div class="column is-3">{{ tarefa.projeto?.nome || 'N/D' }}</div>
      <div class="column">
        <Relogio :tempo-em-segundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<style lang="css" scoped>
.clicavel {
  cursor: pointer;
}
</style>
