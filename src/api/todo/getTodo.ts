import { useAxios } from '@/api/useAxios'
import type { ApiTodo } from '@/types/todo'

export async function getTodo(id: string | number): Promise<ApiTodo | null> {
  const axiosInstance = useAxios()

  try {
    const response = await axiosInstance.get<ApiTodo>(`/todos/${id}`)
    return response.data
  } catch (error) {
    console.error('getTodo error', error)
    return null
  }
}