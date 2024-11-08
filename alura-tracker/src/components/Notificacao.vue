<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { useStore } from '@/store'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'Notificacao',
  data() {
    return {
      contexto: {
        [TipoNotificacao.SUCESSO]: 'is-success',
        [TipoNotificacao.ATENCAO]: 'is-warning',
        [TipoNotificacao.ERRO]: 'is-danger',
      },
    }
  },
  setup() {
    const store = useStore()
    return {
      notificacoes: computed(() => store.state.notificacoes),
    }
  },
})
</script>

<template>
  <div class="notificacao">
    <article
      v-for="lNotificacao in notificacoes"
      :key="lNotificacao.id"
      class="message"
      :class="contexto[lNotificacao.tipo]"
    >
      <div class="message-header">{{ lNotificacao.titulo }}</div>
      <div class="message-body">{{ lNotificacao.texto }}</div>
    </article>
  </div>
</template>

<style lang="css" scoped>
.notificacao {
  position: absolute;
  right: 0;
  width: 20rem;
  padding: 0.5rem;
  z-index: 100;
}
</style>
