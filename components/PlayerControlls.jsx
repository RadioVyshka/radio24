import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import React, { useMemo } from 'react';

import DrawerModal from './DrawerModal';
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon, HeartIcon, ClockIcon } from 'lucide-react-native';

import usePlayerStore from '../stores/PlayerStore';
import useFavoritesStore from '../stores/FavoritesStore';

import { Colors } from '../constants/Colors';
import TimerForm from './TimerForm';
import useThemeStore from '../stores/ThemeStore';
import { useIsPortrait } from '../hooks/useIsPortrait';

const PlayerControls = () => {
	const isTablet = useIsPortrait();
	const isDark = useThemeStore((s) => s.isDark);
	const styles = useMemo(() => createStyles(isDark, isTablet), [isDark]);

	const { isPlaying, currentStream, togglePlayPause, isLoading, isChosen, skipStream } = usePlayerStore();
	const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

	const isFavorite = favorites.some((stream) => stream.listen_url === currentStream?.listen_url);

	return (
		<View style={styles.controls}>
			{isChosen ? (
				<DrawerModal
					name='Таймер отключения'
					icon={<ClockIcon strokeWidth={2.7} size={isTablet ? 36 : 30} color={Colors['brand-800']} />}
				>
					<TimerForm />
				</DrawerModal>
			) : (
				<ClockIcon strokeWidth={2.7} size={isTablet ? 36 : 30} color={Colors['brand-800']} />
			)}

			<TouchableOpacity onPress={isChosen ? () => skipStream('prev') : () => {}} activeOpacity={0.5}>
				<SkipBackIcon strokeWidth={2.1} size={isTablet ? 45 : 36} color={Colors['brand-800']} />
			</TouchableOpacity>

			<View style={{ borderRadius: 9999, overflow: 'hidden' }}>
				<TouchableNativeFeedback onPress={togglePlayPause}>
					<View style={styles.playButton}>
						{isLoading ? (
							<ActivityIndicator size={isTablet ? 50 : 42} color={Colors['theme-50']} />
						) : isPlaying ? (
							<PauseIcon fill={Colors['theme-50']} size={isTablet ? 48 : 36} color={Colors['theme-50']} />
						) : (
							<PlayIcon fill={Colors['theme-50']} size={isTablet ? 48 : 36} color={Colors['theme-50']} />
						)}
					</View>
				</TouchableNativeFeedback>
			</View>

			<TouchableOpacity onPress={isChosen ? () => skipStream('next') : () => {}} activeOpacity={0.5}>
				<SkipForwardIcon strokeWidth={2.1} size={isTablet ? 45 : 36} color={Colors['brand-800']} />
			</TouchableOpacity>

			<TouchableOpacity
				onPress={
					isChosen
						? isFavorite
							? () => removeFavorite(currentStream)
							: () => addFavorite(currentStream)
						: () => {}
				}
				activeOpacity={0.5}
			>
				{isFavorite ? (
					<HeartIcon
						fill={Colors['brand-800']}
						strokeWidth={2.7}
						size={isTablet ? 42 : 30}
						color={Colors['brand-800']}
					/>
				) : (
					<HeartIcon strokeWidth={2.7} size={isTablet ? 36 : 30} color={Colors['brand-800']} />
				)}
			</TouchableOpacity>
		</View>
	);
};

export default PlayerControls;

const createStyles = (isDark, isTablet) =>
	StyleSheet.create({
		controls: {
			borderTopColor: isDark ? Colors['theme-900'] : Colors['theme-100'],
			borderTopWidth: isTablet ? 0 : 1,
			borderStyle: 'solid',
			flexDirection: 'row',
			justifyContent: isTablet ? 'center' : 'space-around',
			alignItems: 'center',
			paddingHorizontal: 24,
			paddingTop: 24,
			paddingBottom: 32,
			gap: isTablet ? 48 : 8,
		},

		playButton: {
			width: isTablet ? 82 : 64,
			height: isTablet ? 82 : 64,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: Colors['brand-800'],
			borderRadius: 9999,
		},
	});
