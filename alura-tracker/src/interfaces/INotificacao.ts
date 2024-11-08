export enum TipoNotificacao {
  SUCESSO,
  ATENCAO,
  ERRO,
}

export interface INotificacao {
  titulo: string
  texto: string
  tipo: TipoNotificacao
  id: number
}
