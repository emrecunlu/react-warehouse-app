import ApiService from '@/services/api';
import { IKirmaSeriBody, IKirmaBody, IKirmaSeri } from '@/types';
import { useMutation, useQuery } from 'react-query';

export const usePersonals = (series: IKirmaSeri[]) => {
	const harcananSeriler = series
		.filter(
			(item) => typeof item.harcananKg === 'number' && item.harcananKg > 0
		)
		.map((item) => ({
			adet: item.adet,
			gramaj: item.gramaj,
			kg: item.harcananKg,
			seriNo: item.seriNo,
		}));

};
