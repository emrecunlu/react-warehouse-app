import { IKirmaSeri } from '@/types';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

interface IProps {
	data: IKirmaSeri;
	amount: number;
}

const WorkOrder = ({ data, amount }: IProps) => {
	return (
		<Box flexGrow={1} sx={{ mb: 4 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">{`${data.isemriNo} // ${data.yapKod} // Toplam: ${amount} Kg`}</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default WorkOrder;
