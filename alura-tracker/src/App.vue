<script lang="ts">
import { defineComponent } from 'vue'
import BarraLateral from './components/BarraLateral.vue'
import { RouterView } from 'vue-router'
import Notificacao from './components/Notificacao.vue'

export default defineComponent({
  name: 'App',
  components: { BarraLateral, RouterView, Notificacao },
})
</script>

<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral />
    </div>
    <div class="column is-three-quarter">
      <Notificacao />
      <RouterView />
    </div>
  </main>
</template>
