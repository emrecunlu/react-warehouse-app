import {
	Box,
	CircularProgress,
	BoxProps,
	CircularProgressProps,
	Backdrop,
} from '@mui/material';

interface IProps {
	boxProps?: BoxProps;
	progressProps?: CircularProgressProps;
}

export default function Loader({ boxProps, progressProps }: IProps) {
	return (
		<Backdrop
			open={true}
			sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
		>
			<Box
				{...boxProps}
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<CircularProgress {...progressProps} color="inherit" />
			</Box>
		</Backdrop>
	);
}
