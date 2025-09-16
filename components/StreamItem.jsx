import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import Toast from 'react-native-root-toast';
import React, { memo, useMemo } from 'react';

import StreamItemImage from './StreamItemImage';
import StreamItemInfo from './StreamItemInfo';

import usePlayerStore from '../stores/PlayerStore';
import useStreamsStore from '../stores/StreamsStore';
import { useIsPortrait } from '../hooks/useIsPortrait';

const StreamItem = memo(({ cover, name, description, id, index }) => {
	const isTablet = useIsPortrait();
	const styles = useMemo(() => createStyles(isTablet), [isTablet]);

	const { setIsChosen, setIsLoading, setCurrentStream, playStream, togglePlayPause, currentStream, isLoading } =
		usePlayerStore();
	const { streams } = useStreamsStore();

	const handleChooseStream = async () => {
		const currentStream = streams.find((stream) => stream.listen_url === id);
		if (!currentStream) {
			Toast.show('Поток не найден', {
				duration: Toast.durations.SHORT,
				position: Toast.positions.BOTTOM,
				shadow: true,
				animation: true,
				hideOnPress: true,
			});

			return;
		}
		if (isLoading) return;

		try {
			await setIsLoading(true);
			await setCurrentStream(currentStream);
			setIsChosen(true);
			await playStream(currentStream.stream_url);
			setIsLoading(false);
		} catch (error) {
			console.error('Ошибка при выборе потока:', error);
			setIsLoading(false);
		}
	};

	const isChosen = currentStream?.listen_url === id;

	return (
		<TouchableNativeFeedback onPress={isChosen && !isLoading ? togglePlayPause : handleChooseStream}>
			<View
				style={[
					styles.container,
					index === 0 && styles.firstItem,
					index === streams.length - 1 && styles.lastItem,
				]}
			>
				<StreamItemImage id={id} cover={cover} width={isTablet ? 150 : 54} height={isTablet ? 150 : 54} />
				<StreamItemInfo width='80%' name={name} description={!isTablet && description} />
			</View>
		</TouchableNativeFeedback>
	);
});

export default StreamItem;

const createStyles = (isTablet) =>
	StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: isTablet ? 'column' : 'row',
			justifyContent: isTablet ? 'flex-start' : 'flex-start',
			alignItems: isTablet ? 'center' : 'stretch',
			gap: 12,
			width: '100%',
			maxWidth: isTablet ? '33%' : '100%',
			paddingHorizontal: isTablet ? 16 : 12,
			paddingVertical: isTablet ? 16 : 6,
		},

		firstItem: {
			paddingTop: 12,
		},

		lastItem: {
			paddingBottom: 12,
		},
	});
