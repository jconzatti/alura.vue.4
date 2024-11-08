<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue'
import Relogio from './Relogio.vue'
import Botao from './Botao.vue'
export default defineComponent({
  name: 'Temporizador',
  data() {
    return {
      tempoEmSegundos: 0 as number,
      idDoTemporizador: 0 as number,
      temporizadorIniciado: false as boolean,
    }
  },
  methods: {
    iniciarTemporizador() {
      this.temporizadorIniciado = true
      if (this.idDoTemporizador === 0) {
        this.idDoTemporizador = setInterval(() => {
          this.tempoEmSegundos += 1
        }, 1000)
      }
    },
    pararTemporizador() {
      this.$emit('eventoTemporizadorFinalizado', this.tempoEmSegundos)
      this.temporizadorIniciado = false
      clearInterval(this.idDoTemporizador)
      this.idDoTemporizador = 0
      this.tempoEmSegundos = 0
    },
  },
  emits: ['eventoTemporizadorFinalizado'],
  components: {
    Relogio,
    Botao,
  },
})
</script>

<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Relogio :tempo-em-segundos="tempoEmSegundos" />
    <Botao
      @click="iniciarTemporizador"
      :disabled="temporizadorIniciado"
      rotulo="play"
      icone="fa fa-play"
    />
    <Botao
      @click="pararTemporizador"
      :disabled="!temporizadorIniciado"
      rotulo="stop"
      icone="fa fa-stop"
    />
  </div>
</template>
