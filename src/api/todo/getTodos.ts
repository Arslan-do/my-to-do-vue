import { useAxios } from '@/api/useAxios'
import type { ApiTodo } from '@/types/todo'

export async function getTodos(): Promise<ApiTodo[]> {
  const axiosInstance = useAxios()

  try {
    const response = await axiosInstance.get<ApiTodo[]>('/todos')
    return response.data
  } catch (error) {
    console.error('getTodos error', error)
    return []
  }
}