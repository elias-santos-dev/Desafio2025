import { AxiosError } from 'axios';
import { apiClientLogin } from './apiClient';
import { User } from '../contexts/AuthContext';

type responseAut = {
	error: boolean,
	reponse: User | string
}

export const authService = {
	async login(username: string, password: string): Promise<responseAut> {

		return await apiClientLogin.post('/signIn', { user: username, password: password }).then((response) => {
			return { error: false, reponse: response.data.user };

		}).catch((error: AxiosError) => {
			const response = error.response?.data as responseAut
			return response;
		});

	},
}