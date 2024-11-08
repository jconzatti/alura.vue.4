<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Box',
})
</script>

<template>
  <div class="box has-text-weight-bold">
    <slot></slot>
  </div>
</template>
