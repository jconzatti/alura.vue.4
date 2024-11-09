<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { useStore } from '@/store'
import { defineComponent, ref } from 'vue'
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipoAcao'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'FormularioProjeto',
  props: {
    id: { type: String },
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const { notificar } = useNotificador()

    const nomeDoProjeto = ref('' as string)

    if (props.id) {
      const lProjeto = store.state.projeto.projetos.find((p) => p.id === props.id)
      nomeDoProjeto.value = lProjeto?.nome || ''
    }

    const notificarSucessoAoSalvarProjeto = () => {
      nomeDoProjeto.value = ''
      notificar(TipoNotificacao.SUCESSO, 'Sucesso', 'O projeto já está disponível')
      router.push('/projetos')
    }

    const salvarProjeto = () => {
      if (props.id) {
        store
          .dispatch(ALTERAR_PROJETO, { id: props.id, nome: nomeDoProjeto.value })
          .then(notificarSucessoAoSalvarProjeto)
      } else {
        store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value).then(notificarSucessoAoSalvarProjeto)
      }
    }

    return { store, notificar, nomeDoProjeto, salvarProjeto }
  },
  // data() {
  //   return {
  //     nomeDoProjeto: '' as string,
  //   }
  // },
  // mounted() {
  //   if (this.id) {
  //     const lProjeto = this.store.state.projeto.projetos.find((p) => p.id === this.id)
  //     this.nomeDoProjeto = lProjeto?.nome || ''
  //   }
  // },
  // methods: {
  //   notificarSucessoAoSalvarProjeto() {
  //     this.nomeDoProjeto = ''
  //     this.notificar(TipoNotificacao.SUCESSO, 'Sucesso', 'O projeto já está disponível')
  //     this.$router.push('/projetos')
  //   },
  //   salvarProjeto() {
  //     if (this.id) {
  //       this.store
  //         .dispatch(ALTERAR_PROJETO, { id: this.id, nome: this.nomeDoProjeto })
  //         .then(this.notificarSucessoAoSalvarProjeto)
  //     } else {
  //       this.store
  //         .dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
  //         .then(this.notificarSucessoAoSalvarProjeto)
  //     }
  //   },
  // },
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
