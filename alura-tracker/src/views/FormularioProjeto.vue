<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { useStore } from '@/store'
import { defineComponent } from 'vue'
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipoAcao'

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
    notificarSucessoAoSalvarProjeto() {
      this.nomeDoProjeto = ''
      this.notificar(TipoNotificacao.SUCESSO, 'Sucesso', 'O projeto já está disponível')
      this.$router.push('/projetos')
    },
    salvarProjeto() {
      if (this.id) {
        this.store
          .dispatch(ALTERAR_PROJETO, { id: this.id, nome: this.nomeDoProjeto })
          .then(this.notificarSucessoAoSalvarProjeto)
      } else {
        this.store
          .dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(this.notificarSucessoAoSalvarProjeto)
      }
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
