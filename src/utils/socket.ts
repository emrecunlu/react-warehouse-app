import { toast } from 'react-hot-toast';

export const print = (data: any) => {
	const socket = new WebSocket(import.meta.env.VITE_SOCKET_ADDRESS + '/print');

	socket.addEventListener('open', (_) => {
		toast.success('Fiş basılıyor...');

		socket.send(data);
	});
};
