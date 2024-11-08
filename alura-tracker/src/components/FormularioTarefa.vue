<script lang="ts">
import { computed, defineComponent } from 'vue'
import Temporizador from './Temporizador.vue'
import { useStore } from '@/store'
import { NOTIFICAR } from '@/store/tipoMutacao'
import { TipoNotificacao } from '@/interfaces/INotificacao'
export default defineComponent({
  name: 'FormularioTarefa',
  emits: ['eventoFinalizarTarefa'],
  data() {
    return {
      descricaoDaTarefa: '' as string,
      idDoProjeto: '' as string,
    }
  },
  components: {
    Temporizador,
  },
  methods: {
    finalizarTarefa(pTempoDaTarefaEmSegundos: number): void {
      const lProjeto = this.projetos.find((lProjeto) => lProjeto.id === this.idDoProjeto)
      if (!lProjeto) {
        this.store.commit(NOTIFICAR, {
          titulo: 'Ops! Deu algo errado.',
          texto: 'Tarefa sem projeto definido.',
          tipo: TipoNotificacao.ERRO,
        })
        throw new Error('Tarefa sem projeto definido.')
      }
      this.$emit('eventoFinalizarTarefa', {
        descricao: this.descricaoDaTarefa,
        duracaoEmSegundos: pTempoDaTarefaEmSegundos,
        projeto: lProjeto,
      })
      this.descricaoDaTarefa = ''
    },
  },
  setup() {
    const store = useStore()
    return {
      store,
      projetos: computed(() => store.state.projetos),
    }
  },
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
