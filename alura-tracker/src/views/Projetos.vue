<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'Projetos',
  components: { RouterView },
})
</script>

<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
    <RouterView />
  </section>
</template>

<style lang="css" scoped>
.projetos {
  padding: 1.25rem;
}
</style>
