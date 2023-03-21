import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/pages/layouts/DashboardLayout';
import FracturePage from '@/pages/FracturePage';
import LoginPage from '@/pages/auth/LoginPage';

const App: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<DashboardLayout />}>
				<Route index element={<FracturePage />} />
			</Route>
			<Route path="/auth">
				<Route path="login" element={<LoginPage />} />
			</Route>
		</Routes>
	);
};

export default App;
