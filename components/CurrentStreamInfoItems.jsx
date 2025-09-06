import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import useThemeStore from '../stores/ThemeStore';

const CurrentStreamInfoItems = ({ data }) => {
	const isDark = useThemeStore((s) => s.isDark);
	const styles = useMemo(() => createStyles(isDark), [isDark]);

	return (
		<View style={styles.modalBody}>
			{Object.entries(data).map(([key, val], i) => (
				<View style={styles.modalItem} key={i}>
					<Text style={styles.modalItemTitle}>{key}</Text>
					<Text style={styles.modalItemValue}>{val}</Text>
				</View>
			))}
		</View>
	);
};

export default CurrentStreamInfoItems;

const createStyles = (isDark) =>
	StyleSheet.create({
		modalBody: {
			flexDirection: 'column',
			justifyContent: 'space-between',
			alignItems: 'flex-start',
			paddingHorizontal: 16,
			paddingVertical: 16,
		},

		modalItem: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'flex-start',
			width: '100%',
			paddingVertical: 12,
			borderTopWidth: 1,
			borderTopColor: isDark ? Colors['theme-900'] : Colors['theme-100'],
			gap: 24,
		},

		modalItemTitle: {
			fontSize: 20,
			fontFamily: Fonts.bold,
			color: Colors['brand-800'],
		},

		modalItemValue: {
			fontSize: 20,
			fontFamily: Fonts.regular,
			color: isDark ? Colors['theme-400'] : Colors['theme-600'],
			flex: 1,
			textAlign: 'right',
			overflow: 'hidden',
		},
	});
