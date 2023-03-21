import { IKirmaSeri } from '@/types';
import Decimal from 'decimal.js';

export const calcFracture = (
	data: IKirmaSeri[],
	amount: number
): IKirmaSeri[] => {
	const scaleAmount = new Decimal(amount);

	const totalAmount = data.reduce((prev, curr) => {
		const amount = new Decimal(curr.kg);

		return parseFloat(amount.plus(prev).valueOf());
	}, 0);

	if (scaleAmount.greaterThanOrEqualTo(totalAmount)) {
		return data.map((item) => {
			item.harcananKg = item.kg;
			item.kg = 0;

			return item;
		});
	} else {
		return data.map((item) => {
			const kg = new Decimal(item.kg);

			if (kg.greaterThanOrEqualTo(amount)) {
				item.harcananKg = amount;
				item.kg = parseFloat(kg.minus(amount).valueOf());

				amount = 0;

				return item;
			} else {
				amount = parseFloat(new Decimal(amount).minus(item.kg).valueOf());

				item.harcananKg = parseFloat(kg.valueOf());
				item.kg = 0;

				return item;
			}
		});
	}
};

export const commaToDot = (str: string) => {
	return str.replace(/,/g, '.');
};
