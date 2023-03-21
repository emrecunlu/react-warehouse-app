import {
	IKirmaBody,
	IKirmaSeri,
	IKirmaSeriBody,
	IPersonal,
	IResponse,
} from '@/types';
import axios from 'axios';

const request = axios.create({
	baseURL: 'http://192.168.20.80:7112/api',
});

class ApiService {
	static getPersonals() {
		return request.get<IResponse<IPersonal[]>>('/personel');
	}

	static getKirmaSeri(data: IKirmaSeriBody[] | []) {
		return request.post<IResponse<IKirmaSeri>>('/kirma', data);
	}

	static kirmaUret(data: any) {
		return request.post<IResponse<any>>('/kirma/kirmaUret', data);
	}
}

export default ApiService;
