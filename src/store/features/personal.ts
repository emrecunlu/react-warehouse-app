import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { IPersonal } from '@/types';
import { RootState } from '@/store';

interface State {
	personal: IPersonal | null;
}

const initialState: State = {
	personal: null,
};

const personal = createSlice({
	name: 'personal',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IPersonal>) => {
			state.personal = action.payload;
		},
		logout: (state) => {
			state.personal = null;
		},
	},
});

export const { login, logout } = personal.actions;
export const usePersonal = () =>
	useSelector((state: RootState) => state.personal);
export default personal.reducer;
