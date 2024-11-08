<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Relogio',
  props: {
    tempoEmSegundos: { type: Number, default: 0 },
  },
  computed: {
    tempoFormatado(): string {
      return new Date(this.tempoEmSegundos * 1000).toISOString().substring(11, 19)
    },
  },
})
</script>

<template>
  <section>
    <strong>{{ tempoFormatado }}</strong>
  </section>
</template>
