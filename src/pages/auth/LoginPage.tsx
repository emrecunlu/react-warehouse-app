import {
	Box,
	Container,
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
	Avatar,
	Divider,
	Autocomplete,
	TextField,
	Backdrop,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import { usePersonals } from '@/utils/serviceHooks';
import Loader from '@/components/shared/Loader';
import { useState } from 'react';
import { IPersonal } from '@/types';
import store from '@/store';
import { login } from '@/store/features/personal';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
	const [selected, setSelected] = useState<IPersonal | null>(null);
	const navigate = useNavigate();
	const { data, isLoading } = usePersonals();

	const clickHandle = () => {
		if (selected) {
			store.dispatch(login(selected));

			navigate('/');
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				bgcolor: (theme) => theme.palette.grey['100'],
			}}
		>
			<Container maxWidth="xl">
				<Card sx={{ maxWidth: 800, mx: 'auto' }}>
					{isLoading && <Loader />}
					<CardContent>
						<Box flexGrow={1}>
							<Avatar
								sx={{
									bgcolor: (theme) => theme.palette.primary.main,
									width: 48,
									height: 48,
									mb: 2,
								}}
							>
								<PersonIcon fontSize="medium" />
							</Avatar>
							<Typography variant="h6">Giriş Yap</Typography>
							<Divider sx={{ my: 2 }} />
							<Autocomplete
								disablePortal
								id="personal-autocomplate"
								options={data ?? []}
								value={selected}
								renderOption={(props, option) => (
									<Box {...props} height={75} component="li">
										<Typography>{`${option.staffCode} - ${option.firstName} ${option.lastName}`}</Typography>
									</Box>
								)}
								getOptionLabel={(option) =>
									`${option.staffCode} - ${option.firstName} ${option.lastName}`
								}
								onChange={(_, value) => setSelected(value)}
								renderInput={(params) => (
									<TextField {...params} label="Personel" />
								)}
							/>
						</Box>
					</CardContent>
					<CardActions>
						<Button
							onClick={clickHandle}
							disabled={!selected}
							sx={{ ml: 'auto' }}
							startIcon={<LoginIcon />}
							size="large"
							variant="contained"
						>
							Giriş Yap
						</Button>
					</CardActions>
				</Card>
			</Container>
		</Box>
	);
};

export default LoginPage;
