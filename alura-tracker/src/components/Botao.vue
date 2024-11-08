<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Botao',
  props: {
    rotulo: { type: String, required: true },
    icone: { type: String, default: '' },
  },
})
</script>

<template>
  <button class="button">
    <span class="icon">
      <i :class="icone"></i>
    </span>
    <span>{{ rotulo }}</span>
  </button>
</template>
