<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { useStore } from '@/store'
import { ADICIONAR_PROJETO, ATUALIZAR_PROJETO } from '@/store/tipoMutacao'
import { defineComponent } from 'vue'
import useNotificador from '@/hooks/notificador'

export default defineComponent({
  name: 'FormularioProjeto',
  data() {
    return {
      nomeDoProjeto: '' as string,
    }
  },
  props: {
    id: { type: String },
  },
  mounted() {
    if (this.id) {
      const lProjeto = this.store.state.projetos.find((p) => p.id === this.id)
      this.nomeDoProjeto = lProjeto?.nome || ''
    }
  },
  methods: {
    salvarProjeto() {
      if (this.id) {
        this.store.commit(ATUALIZAR_PROJETO, { id: this.id, nome: this.nomeDoProjeto })
      } else {
        this.store.commit(ADICIONAR_PROJETO, this.nomeDoProjeto)
      }
      this.nomeDoProjeto = ''
      this.notificar(TipoNotificacao.SUCESSO, 'Sucesso', 'O projeto já está disponível')
      this.$router.push('/projetos')
    },
  },
  setup() {
    const store = useStore()
    const { notificar } = useNotificador()
    return {
      store,
      notificar,
    }
  },
})
</script>

<template>
  <form @submit.prevent="salvarProjeto">
    <div class="field">
      <label for="nome-projeto" class="label">Nome do projeto</label>
      <input type="text" class="input" id="nome-projeto" v-model="nomeDoProjeto" />
    </div>
    <div class="field">
      <button class="button" type="submit">Salvar</button>
    </div>
  </form>
</template>
