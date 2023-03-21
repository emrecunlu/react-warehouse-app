import AddSeri from '@/components/fracture/AddSeri';
import SeriList from '@/components/fracture/SeriList';
import { IKirmaSeri } from '@/types';
import { Box, ListItem } from '@mui/material';
import { useMemo, useState } from 'react';
import Decimal from 'decimal.js';
import { calcFracture } from '@/helpers';
import { useMutation } from 'react-query';
import ApiService from '@/services/api';
import Loader from '@/components/shared/Loader';
import { toast } from 'react-hot-toast';
import WorkOrder from '@/components/fracture/WorkOrder';
import { print } from '@/utils/socket';

const FracturePage = () => {
	const [series, setSeries] = useState<IKirmaSeri[]>([]);
	const [dialog, setDialog] = useState<boolean>(false);

	const workOrder = useMemo(() => {
		if (series.length === 0) return null;

		return series[0];
	}, [series]);

	const totalAmount = useMemo(() => {
		const totalAmount = series.reduce((prev, curr) => {
			const amount = new Decimal(curr.kg);

			return parseFloat(amount.plus(prev).valueOf());
		}, 0);

		return totalAmount;
	}, [series]);

	const mutation = useMutation((data: any) => ApiService.kirmaUret(data), {
		onSuccess: (res) => {
			setSeries((series) => series.filter((item) => item.kg > 0));

			const { data } = res.data;

			print(JSON.stringify({ ...data, islem: 1 }));
		},
	});

	const submitHandle = (val: number) => {
		if (workOrder !== null) {
			if (new Decimal(val).lessThanOrEqualTo(totalAmount)) {
				setSeries(calcFracture(series, val));

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

				mutation.mutate({
					stokKodu: workOrder.createdSk,
					stokAdi: workOrder.uretilecekKirma,
					kg: val,
					teraziMiktar: val,
					harcananSeriler,
				});
			} else {
				toast.error('Miktar hatası!');
			}
		}
	};

	const deleteHandle = (seri: IKirmaSeri) => {
		const find = series.indexOf(seri);

		setSeries((series) => series.filter((_, index) => index !== find));
	};

	return (
		<Box>
			{mutation.isLoading && <Loader />}
			{workOrder && <WorkOrder data={workOrder} amount={totalAmount} />}
			<AddSeri
				data={series}
				onSubmit={(val) => val && setSeries((series) => [...series, val])}
			/>
			{series.length > 0 && (
				<SeriList
					onDelete={deleteHandle}
					onSubmit={submitHandle}
					data={series}
				/>
			)}
		</Box>
	);
};
export default FracturePage;
