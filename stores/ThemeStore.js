import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

const useThemeStore = create((set, get) => ({
	isDark: false,

	getTheme: async () => {
		try {
			const storageTheme = await AsyncStorage.getItem('theme');
			if (storageTheme) {
				set({ isDark: storageTheme === 'dark' });
			} else {
				const systemTheme = Appearance.getColorScheme();
				await AsyncStorage.setItem('theme', systemTheme);
				set({ isDark: systemTheme === 'dark' });
			}
		} catch (e) {
			console.error('Ошибка в хранилище тем:', e);
		}
		return true; // флаг для скрытия splash-screen, как только тема загрузилась
	},

	setTheme: (isDark) => {
		set({ isDark });
		AsyncStorage.setItem('theme', isDark ? 'dark' : 'light');
	},
}));

export default useThemeStore;
