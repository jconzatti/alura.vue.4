<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import Temporizador from './Temporizador.vue'
import { useStore } from '@/store'
import { NOTIFICAR } from '@/store/tipoMutacao'
import { TipoNotificacao } from '@/interfaces/INotificacao'
export default defineComponent({
  name: 'FormularioTarefa',
  emits: ['eventoFinalizarTarefa'],
  components: { Temporizador },
  setup(props, { emit }) {
    const store = useStore()
    const descricaoDaTarefa = ref('' as string)
    const idDoProjeto = ref('' as string)
    const projetos = computed(() => store.state.projeto.projetos)

    const finalizarTarefa = (pTempoDaTarefaEmSegundos: number): void => {
      const lProjeto = projetos.value.find((lProjeto) => lProjeto.id === idDoProjeto.value)
      if (!lProjeto) {
        store.commit(NOTIFICAR, {
          titulo: 'Ops! Deu algo errado.',
          texto: 'Tarefa sem projeto definido.',
          tipo: TipoNotificacao.ERRO,
        })
        throw new Error('Tarefa sem projeto definido.')
      }
      emit('eventoFinalizarTarefa', {
        descricao: descricaoDaTarefa.value,
        duracaoEmSegundos: pTempoDaTarefaEmSegundos,
        projeto: lProjeto,
      })
      descricaoDaTarefa.value = ''
    }

    return { descricaoDaTarefa, idDoProjeto, projetos, finalizarTarefa }
  },
  // data() {
  //   return {
  //     descricaoDaTarefa: '' as string,
  //     idDoProjeto: '' as string,
  //   }
  // },
  // methods: {
  //   finalizarTarefa(pTempoDaTarefaEmSegundos: number): void {
  //     const lProjeto = this.projetos.find((lProjeto) => lProjeto.id === this.idDoProjeto)
  //     if (!lProjeto) {
  //       this.store.commit(NOTIFICAR, {
  //         titulo: 'Ops! Deu algo errado.',
  //         texto: 'Tarefa sem projeto definido.',
  //         tipo: TipoNotificacao.ERRO,
  //       })
  //       throw new Error('Tarefa sem projeto definido.')
  //     }
  //     this.$emit('eventoFinalizarTarefa', {
  //       descricao: this.descricaoDaTarefa,
  //       duracaoEmSegundos: pTempoDaTarefaEmSegundos,
  //       projeto: lProjeto,
  //     })
  //     this.descricaoDaTarefa = ''
  //   },
  // },
})
</script>

<template>
  <div class="box">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricaoDaTarefa"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idDoProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="lProjeto.id" v-for="lProjeto in projetos" :key="lProjeto.id">
              {{ lProjeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @evento-temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>
