import { Composite } from "../composer"

export enum AsyncStateEnum {
  /** Ocioso */
  IDLE = 'IDLE',
  /** Em execução / Pendente / Aguardando */
  PENDING = 'PENDING',
  /** Erro / Falha   */
  ERROR = 'ERROR',
  /** Pronto / Completo / Sucessso */
  READY = 'READY' 
}

export interface AsyncState {
  /**
   * Estado da ultima tarefa assíncrona
   */
  state: Ref<AsyncStateEnum>

  /**
   * Error da ultima tarefa assíncrona
   */
  error: Ref<any>


  /**
   * Executa uma tarefa assíncrona
   * @param task 
   */
  execute<T> (task: () => Promise<T>): Promise<T>

}


export function AsyncState(): Composite<AsyncState>{
  return () => ({
    state: ref(AsyncStateEnum.IDLE) as Ref<AsyncStateEnum>,
    error: ref(null) as Ref<any>,
    async execute(task) {
      if(this.state.value === AsyncStateEnum.PENDING) {
        throw new Error('Async state está em execução!')
      }
      try {
        this.error.value = null
        this.state.value = AsyncStateEnum.PENDING
        const result = await task()
        this.state.value = AsyncStateEnum.READY

        return result
      } catch(error) {
        this.error.value = error
        this.state.value = AsyncStateEnum.ERROR

        throw error
      }

    }
  })

}