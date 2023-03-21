import { usePersonal } from '@/store/features/personal';
import { Navigate, Outlet } from 'react-router-dom';
import store from '@/store';
import { logout } from '@/store/features/personal';
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const DashboardLayout: React.FC = () => {
	const { personal } = usePersonal();

	if (!personal) return <Navigate to="/auth/login" />;

	return (
		<Box flexGrow={1}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">
						{personal.firstName} {personal.lastName}
					</Typography>
					<IconButton
						color="inherit"
						sx={{ ml: 2 }}
						aria-label="logout"
						size="large"
						onClick={() => store.dispatch(logout())}
					>
						<LogoutIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box sx={{ p: 4 }} flexGrow={1}>
				<Outlet />
			</Box>
		</Box>
	);
};

export default DashboardLayout;
