import type IProjeto from './IProjeto'

export default interface ITarefa {
  id: string
  descricao: string
  duracaoEmSegundos: number
  projeto: IProjeto
}
