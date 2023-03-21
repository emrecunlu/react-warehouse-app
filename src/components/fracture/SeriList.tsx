import { calcFracture, commaToDot } from '@/helpers';
import { IKirmaSeri } from '@/types';
import {
	Box,
	TableContainer,
	TableBody,
	Table,
	TableHead,
	TableRow,
	TableCell,
	Stack,
	TextField,
	Button,
	IconButton,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';

interface IProps {
	data: IKirmaSeri[] | [];
	onSubmit: (scaleAmount: number) => void;
	onDelete: (seri: IKirmaSeri) => void;
}

const SeriList = ({ data, onSubmit, onDelete }: IProps) => {
	const [value, setValue] = useState<string>('');

	const submitHandle = () => {
		onSubmit(parseFloat(value));

		setValue('');
	};

	return (
		<Box sx={{ mt: 4 }}>
			<TableContainer>
				<Table
					sx={{
						'&.MuiTable-root': {
							'.MuiTableHead-root .MuiTableCell-root': {
								fontSize: 18,
								p: 3,
							},
							'.MuiTableBody-root .MuiTableCell-root': {
								fontSize: (theme) => theme.typography.h6,
								p: 3,
							},
							'.MuiTableBody-root .MuiTableRow-root:hover': {
								bgcolor: (theme) => theme.palette.action.hover,
							},
						},
					}}
				>
					<TableHead>
						<TableRow>
							<TableCell>Üretilecek Kırma</TableCell>
							<TableCell>Created Sk</TableCell>
							<TableCell>Stok Kodu</TableCell>
							<TableCell>Adet</TableCell>
							<TableCell>Gramaj</TableCell>
							<TableCell>Miktar</TableCell>
							<TableCell>İşlem</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((item, index) => (
							<TableRow key={index}>
								<TableCell>{item.uretilecekKirma}</TableCell>
								<TableCell>{item.createdSk}</TableCell>
								<TableCell>{item.stokKodu}</TableCell>
								<TableCell>{item.adet}</TableCell>
								<TableCell>{item.gramaj}</TableCell>
								<TableCell>{item.kg}</TableCell>
								<TableCell>
									<IconButton onClick={() => onDelete(item)} color="inherit">
										<ClearIcon fontSize="large" />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Stack direction="row" justifyContent="end" sx={{ mt: 4 }} spacing={4}>
				<TextField
					label="Miktar"
					variant="outlined"
					fullWidth
					value={value}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setValue(commaToDot(e.target.value))
					}
					sx={{ maxWidth: 300 }}
				/>
				<Button
					disabled={value === ''}
					onClick={submitHandle}
					variant="contained"
					size="large"
					fullWidth
					sx={{ maxWidth: 200 }}
				>
					Üret
				</Button>
			</Stack>
		</Box>
	);
};

export default SeriList;
