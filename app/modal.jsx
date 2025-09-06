import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useMemo } from 'react';
import { Link, useNavigation } from 'expo-router';

import { ChevronLeft } from 'lucide-react-native';

import usePlayerStore from '../stores/PlayerStore';
import useTimerStore from '../stores/TimerStore';

import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { musicLinksData } from '../constants/Data';
import { ADMIN_URL } from '../constants/Environments';

import PlayerControls from '../components/PlayerControlls';
import useThemeStore from '../stores/ThemeStore';
import { useIsPortrait } from '../hooks/useIsPortrait';

const modal = () => {
	const isTablet = useIsPortrait();
	const isDark = useThemeStore((s) => s.isDark);
	const styles = useMemo(() => createStyles(isDark, isTablet), [isDark, isTablet]);

	const navigation = useNavigation();

	const { timeLeft, selectedTime } = useTimerStore();
	const { currentStream, isChosen, songCover } = usePlayerStore();
	const coverUrl = isChosen ? `${ADMIN_URL}/assets/${currentStream?.stream_cover}` : null;

	const modalImage = !coverUrl
		? require('../assets/radio24.png')
		: {
				uri: songCover || coverUrl,
		  };

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.backButton}>
						<TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
							<ChevronLeft size={40} color={Colors['brand-800']} />
						</TouchableOpacity>
					</View>

					{selectedTime && (
						<View style={styles.timer}>
							<Text style={styles.timerText}>
								{`${timeLeft > 3600 ? `${Math.floor(timeLeft / 3600)} ч.` : ''} ${Math.floor(
									(timeLeft % 3600) / 60
								)} мин. ${timeLeft % 60} сек. `}
							</Text>
						</View>
					)}

					<View style={{ width: 48, height: 48 }}></View>
				</View>

				<View style={styles.content}>
					<View style={styles.coverWrapper}>
						<View style={styles.cover}>
							<Image style={styles.coverImg} source={modalImage} />
						</View>
					</View>

					<View style={styles.contentWrapper}>
						<View style={styles.infoWrapper}>
							<Text style={styles.streamTitle}>
								{isChosen ? currentStream.server_name : 'Поток не выбран'}
							</Text>
							<Text style={styles.trackTitle}>
								{isChosen && currentStream.title !== null
									? `${currentStream?.artist} ${currentStream?.title ? '-' : ''} ${
											currentStream?.title
									  }`
									: 'Выбирайте и слушайте!'}
							</Text>
						</View>

						<View style={styles.musicLinksWrapper}>
							<View style={styles.musicLinks}>
								{isChosen &&
									currentStream.title &&
									musicLinksData.map((item) => (
										<Link
											asChild
											key={item.id}
											href={`${item.url}${currentStream?.artist} ${currentStream?.title}`}
										>
											<TouchableOpacity activeOpacity={0.5}>
												<View style={styles.musicButton}>{item.icon}</View>
											</TouchableOpacity>
										</Link>
									))}
							</View>
						</View>

						{isTablet && <PlayerControls />}
					</View>
				</View>

				{!isTablet && <PlayerControls />}
			</View>
		</ScrollView>
	);
};

export default modal;

const createStyles = (isDark, isTablet) =>
	StyleSheet.create({
		container: {
			backgroundColor: isDark ? Colors['theme-950'] : Colors['theme-50'],
			flex: 1,
			justifyContent: 'space-between',
			gap: 24,
		},

		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 8,
			paddingVertical: 8,
		},

		backButton: {
			overflow: 'hidden',
			borderRadius: 9999,
		},

		timer: {
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: Colors['brand-800'],
			borderRadius: 4,
			paddingHorizontal: 8,
			paddingVertical: 6,
		},

		timerText: {
			fontFamily: Fonts.regular,
			fontSize: 16,
			color: Colors['theme-50'],
		},

		content: {
			flex: 1,
			flexDirection: isTablet ? 'row' : 'column',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: isTablet ? '12%' : 24,
			gap: 24,
			width: '100%',
		},

		coverWrapper: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		},

		cover: {
			width: '100%',
			aspectRatio: 1,
			borderRadius: 12,
			overflow: 'hidden',
		},

		coverImg: {
			width: '100%',
			height: '100%',
			resizeMode: 'contain',
		},

		contentWrapper: {
			gap: 24,
			flex: isTablet ? 2 : 0,
		},

		infoWrapper: {
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 8,
		},

		streamTitle: {
			fontFamily: Fonts.bold,
			fontSize: isTablet ? 32 : 20,
			textAlign: 'center',
			color: isDark ? Colors['theme-50'] : Colors['theme-950'],
		},

		trackTitle: {
			fontFamily: Fonts.regular,
			fontSize: isTablet ? 24 : 16,
			textAlign: 'center',
			color: isDark ? Colors['theme-400'] : Colors['theme-600'],
			paddingHorizontal: 16,
		},

		musicLinksWrapper: {
			marginBlock: 16,
			justifyContent: 'center',
			alignItems: 'center',
		},

		musicLinks: {
			paddingHorizontal: 16,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 16,
			flex: 0,
		},

		musicButton: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			borderColor: Colors['brand-800'],
			borderWidth: 1,
			borderRadius: 4,
			paddingHorizontal: isTablet ? 12 : 6,
			paddingVertical: isTablet ? 12 : 6,
		},

		musicButtonText: {
			fontFamily: Fonts.regular,
			fontSize: 16,
			textAlign: 'center',
			color: Colors['brand-800'],
		},
	});
