
export interface Task {
    id: number
    text: string
    completed: boolean
  }
  
  export interface ApiTodo {
    id: number
    title?: string
    text?: string
    completed?: boolean
    userId?: number
  }
  
  export function mapApiTodoToTask(todo: ApiTodo): Task {
    return {
      id: todo.id,
      text: todo.title ?? todo.text ?? '',
      completed: Boolean(todo.completed),
    }
  }