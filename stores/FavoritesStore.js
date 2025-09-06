import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import Toast from 'react-native-root-toast';
import useThemeStore from './ThemeStore';
import getToastConfig from '../constants/ToastConfig';

const useFavoritesStore = create((set) => ({
	favorites: [],
	getFavoritesFromStorage: async () => {
		try {
			const favorites = await AsyncStorage.getItem('favorites');
			const parsedFavorites = favorites ? JSON.parse(favorites) : [];
			set({ favorites: parsedFavorites });
		} catch (error) {
			console.error('Failed to load favorites from storage:', error);
		}
	},
	addFavorite: async (stream) => {
		const favorites = await AsyncStorage.getItem('favorites');
		const parsedFavorites = favorites ? JSON.parse(favorites) : [];
		parsedFavorites.push(stream);
		await AsyncStorage.setItem('favorites', JSON.stringify(parsedFavorites));
		set({ favorites: parsedFavorites });

		const isDark = useThemeStore.getState().isDark;
		Toast.show('Поток добавлен в избранное ❤️', getToastConfig(isDark));
	},
	removeFavorite: async (stream) => {
		const favorites = await AsyncStorage.getItem('favorites');
		const parsedFavorites = favorites ? JSON.parse(favorites) : [];
		const updatedFavorites = parsedFavorites.filter((favorite) => favorite.listen_url !== stream.listen_url);
		await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		set({ favorites: updatedFavorites });

		const isDark = useThemeStore.getState().isDark;
		Toast.show('Поток удален из избранного 💔', getToastConfig(isDark));
	},
	updateFavorites: async (updatedStreams) => {
		try {
			const favorites = await AsyncStorage.getItem('favorites');
			const parsedFavorites = favorites ? JSON.parse(favorites) : [];

			const updatedFavorites = parsedFavorites.map((favorite) => {
				const updatedStream = updatedStreams.find((stream) => stream.listen_url === favorite.listen_url);
				return updatedStream || favorite;
			});

			set({ favorites: updatedFavorites });
			await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		} catch (error) {
			console.error('Could not update favorites:', error);
		}
	},
}));

export default useFavoritesStore;
