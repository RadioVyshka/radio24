import Toast from 'react-native-root-toast';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

const getToastConfig = (isDark) => ({
	duration: Toast.durations.SHORT,
	position: Toast.positions.BOTTOM,
	shadow: true,
	animation: true,
	hideOnPress: true,
	backgroundColor: isDark ? Colors['theme-50'] : Colors['theme-950'],
	textStyle: {
		fontFamily: Fonts.regular,
		color: isDark ? Colors['theme-950'] : Colors['theme-50'],
	},
});

export default getToastConfig;
