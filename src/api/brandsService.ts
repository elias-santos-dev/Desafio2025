import { AxiosError } from 'axios';
import { apiClientCars } from './apiClient';


export type responseBrands =
    {
        "codigo": string,
        "nome": string
    }

export const brandsService = {
    async getBrands(): Promise<responseBrands[]> {
        return await apiClientCars.get('v1/carros/marcas').then((response) => {
            return response.data
        }).catch((error: AxiosError) => {
            return [];
        });

    },
}