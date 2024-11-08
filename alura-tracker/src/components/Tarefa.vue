<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Relogio from './Relogio.vue'
import type ITarefa from '@/interfaces/ITarefa'
import Box from './Box.vue'
export default defineComponent({
  name: 'Tarefa',
  components: { Relogio, Box },
  props: {
    tarefa: { type: Object as PropType<ITarefa>, required: true },
  },
})
</script>

<template>
  <Box>
    <div class="columns">
      <div class="column is-4">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
      <div class="column is-3">{{ tarefa.projeto?.nome || 'N/D' }}</div>
      <div class="column">
        <Relogio :tempo-em-segundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>
