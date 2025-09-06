import { StyleSheet, Text, View } from 'react-native';
import React, { memo, useMemo } from 'react';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import useThemeStore from '../stores/ThemeStore';
import { useIsPortrait } from '../hooks/useIsPortrait';

const StreamItemInfo = memo(({ name, description, width = '100%', isCurrentStream }) => {
	const isTablet = useIsPortrait();
	const isDark = useThemeStore((s) => s.isDark);
	const styles = useMemo(() => createStyles(isDark, isTablet, isCurrentStream), [isDark, isTablet, isCurrentStream]);

	return (
		<View style={styles.infoContainer}>
			<Text style={[styles.streamTitle, { width: width }]} numberOfLines={isTablet ? 2 : 1}>
				{name}
			</Text>
			{description && (
				<View style={{ width: width }}>
					<Text style={styles.streamDescription} numberOfLines={1}>
						{description}
					</Text>
				</View>
			)}
		</View>
	);
});

export default StreamItemInfo;

const createStyles = (isDark, isTablet, isCurrentStream) =>
	StyleSheet.create({
		infoContainer: {
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: isTablet ? 'center' : 'flex-start',
			gap: 4,
			overflow: 'hidden',
			width: '100%',
		},

		streamTitle: {
			fontSize: 18,
			fontFamily: Fonts.bold,
			color: isDark ? Colors['theme-50'] : Colors['theme-950'],
			textAlign: isCurrentStream ? 'start' : isTablet ? 'center' : 'start',
		},

		streamDescription: {
			fontSize: 14,
			fontFamily: Fonts.regular,
			color: isDark ? Colors['theme-400'] : Colors['theme-600'],
			overflow: 'hidden',
		},
	});
