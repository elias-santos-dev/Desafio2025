import { AxiosError } from 'axios';
import { apiClientCars } from './apiClient';

export type baseModel = {
    "codigo": string,
    "nome":string
  }
export type responseModels = { 
    anos:baseModel[],
    modelos:baseModel[],

}

export const modelService = {
    async getModels(id:string):Promise<responseModels> {
        return await apiClientCars.get(`v1/carros/marcas/${id}/modelos`).then((response) => {
            return response.data
        }).catch((error: AxiosError) => {
            return [];
        });

    },
}