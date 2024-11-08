import type IProjeto from './IProjeto'

export default interface ITarefa {
  descricao: string
  duracaoEmSegundos: number
  projeto: IProjeto
}
