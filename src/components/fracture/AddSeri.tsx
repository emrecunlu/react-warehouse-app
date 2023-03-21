import ApiService from '@/services/api';
import { IKirmaSeri, IKirmaSeriBody, IResponse } from '@/types';
import { Stack, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useMutation } from 'react-query';
import Loader from '@/components/shared/Loader';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

interface IProps {
	data: IKirmaSeri[] | [];
	onSubmit: (data: IKirmaSeri | null) => void;
}

const AddSeri = ({ data, onSubmit }: IProps) => {
	const [value, setValue] = useState<string>('');

	const mutation = useMutation({
		mutationFn: (series: IKirmaSeriBody[] | []) =>
			ApiService.getKirmaSeri(series),
		onSuccess: (res) => {
			const { data: seri } = res.data;

			onSubmit(seri);
		},
		onError: (error: AxiosError<IResponse<null>>) => {
			const res = error.response;

			if (res?.data.message) {
				toast.error(res.data.message);
			} else {
				toast.error('Hata!');
			}
		},
	});

	const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!data.some((item) => item.seriNo === value)) {
			mutation.mutate([...data, { seriNo: value }]);
		} else {
			toast.error('Zaten böyle bir seri eklediniz!');
		}

		setValue('');
	};

	return (
		<form onSubmit={submitHandle}>
			<Stack direction="row" spacing={4}>
				{mutation.isLoading && <Loader />}
				<TextField
					label="Seri Numarası"
					value={value}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setValue(e.target.value)
					}
					variant="outlined"
					fullWidth
				/>
				<Button
					type="submit"
					size="large"
					disabled={value === ''}
					variant="contained"
					fullWidth
					sx={{
						maxWidth: 200,
					}}
				>
					Ekle
				</Button>
			</Stack>
		</form>
	);
};

export default AddSeri;
