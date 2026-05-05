import { useAxios } from "../useAxios"


export const getTodos = async()=>{
    const axiosInstance = useAxios();

    try {
       const response = await axiosInstance.get('/todos') 
       return response.data;
    }catch(error){
        console.error("error");
        return [];
    }
}