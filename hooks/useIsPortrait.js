import { useWindowDimensions } from 'react-native';

export function useIsPortrait() {
	const { width, height } = useWindowDimensions();
	const isPortrait = width > height;

	return isPortrait;
}
