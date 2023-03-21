import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrowserRouter } from 'react-router-dom';
import { Backdrop, CssBaseline } from '@mui/material';
import { QueryClientProvider, QueryClient } from 'react-query';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from 'react-redux';
import store from '@/store';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<>
		<CssBaseline />
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<App />
				</Provider>
			</QueryClientProvider>
		</BrowserRouter>
		<Toaster />
	</>
);
