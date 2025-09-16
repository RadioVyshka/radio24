import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'expo-router';

import useStreamsStore from '../../stores/StreamsStore';
import usePlayerStore from '../../stores/PlayerStore';
import useFavoritesStore from '../../stores/FavoritesStore';
import usePostersStore from '../../stores/PostersStore';

import socket from '../../utils/socket';
import { startBackgroundFetch } from '../../utils/taskManager';
import { requestNotificationsPermission } from '../../utils/notifications';

import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import { API_URL } from '../../constants/Environments';

import StreamItem from '../../components/StreamItem';
import CurrentStream from '../../components/CurrentStream';
import useThemeStore from '../../stores/ThemeStore';
import { useIsPortrait } from '../../hooks/useIsPortrait';

const HomeScreen = () => {
	const isTablet = useIsPortrait();
	const isDark = useThemeStore((s) => s.isDark);
	const styles = useMemo(() => createStyles(isDark), [isDark]);

	const router = useRouter();
	const { streams, setStreams } = useStreamsStore();
	const { currentStream, setCurrentStream, setSongCover } = usePlayerStore();
	const { getFavoritesFromStorage, updateFavorites, favorites } = useFavoritesStore();
	const { initializeStore, fetchPosters, lastPoster } = usePostersStore();

	const fetchSongCover = async () => {
		if (currentStream) {
			const response = await fetch(
				`${API_URL}/api/track-cover?artist=${currentStream.artist}&title=${currentStream.title}`
			);
			const data = await response.json();
			setSongCover(data.coverUrl);
		} else {
			setSongCover(null);
		}
	};

	useEffect(() => {
		const setup = async () => {
			await usePlayerStore.getState().setupPlayer();
		};
		setup();
	}, []);

	useEffect(() => {
		const checkPermissions = async () => {
			const granted = await requestNotificationsPermission();
			if (!granted) {
				alert('Приложение не сможет отправлять вам полезные уведомления.');
			} else {
				await startBackgroundFetch();
			}
		};

		checkPermissions();
	}, []);

	useEffect(() => {
		if (!socket.connected) {
			socket.connect();
		}

		socket.on('radio-streams', async (data) => {
			if (data) {
				setStreams(data);
				if (!favorites.length) {
					await getFavoritesFromStorage();
				}
				updateFavorites(data);

				const updatedStream = data.find((stream) => stream?.listen_url === currentStream?.listen_url);
				if (updatedStream) {
					setCurrentStream(updatedStream);
				}
			}
		});

		return () => {
			socket.off('radio-streams');
		};
	}, [currentStream]);

	useEffect(() => {
		if (currentStream) {
			fetchSongCover();
		}
	}, [currentStream]);

	useEffect(() => {
		const init = async () => {
			await initializeStore();
			await fetchPosters();
			if (lastPoster) {
				router.push('/poster');
			}
		};
		init();
	}, [lastPoster]);

	const numColumns = isTablet ? 3 : 1;

	return (
		<View style={styles.container}>
			{streams ? (
				<FlatList
					key={`flatList-${numColumns}`}
					style={styles.flatList}
					data={streams}
					numColumns={numColumns}
					renderItem={({ item, index }) => (
						<StreamItem
							id={item.listen_url}
							cover={item.stream_cover}
							name={item.server_name}
							description={`${item.artist} ${item.title ? '-' : ''} ${item.title}`}
							index={index}
						/>
					)}
					keyExtractor={(item) => item.listen_url}
				/>
			) : (
				<View style={styles.attention}>
					<ActivityIndicator size={64} color={Colors['brand-800']} />
				</View>
			)}
			<CurrentStream />
		</View>
	);
};

const createStyles = (isDark) =>
	StyleSheet.create({
		container: {
			position: 'relative',
			flex: 1,
			backgroundColor: isDark ? Colors['theme-950'] : Colors['theme-50'],
		},

		flatList: {
			display: 'flex',
			flexDirection: 'column',
		},

		attention: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flex: 1,
		},
	});

export default HomeScreen;
