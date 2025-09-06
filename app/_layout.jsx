import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { RootSiblingParent } from 'react-native-root-siblings';

import useThemeStore from '../stores/ThemeStore';
import { Fonts } from '../constants/Fonts';
import { Colors } from '../constants/Colors';
import { useIsPortrait } from '../hooks/useIsPortrait';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const getTheme = useThemeStore((s) => s.getTheme);
	const [loaded, error] = useFonts({
		[Fonts.bold]: require('../assets/fonts/HarmoniaSansProCyr-Bold.otf'),
		[Fonts.regular]: require('../assets/fonts/HarmoniaSansProCyr-Regular.otf'),
	});

	useEffect(() => {
		const hideSplashScreen = async () => {
			const themeLoaded = await getTheme();

			if (loaded || error || themeLoaded) {
				SplashScreen.hideAsync();
			}
		};

		hideSplashScreen();
	}, [loaded, error]);

	const isTablet = useIsPortrait();

	if (!loaded && !error) {
		return null;
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors['brand-800'] }}>
			<RootSiblingParent>
				<Stack>
					<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
					<Stack.Screen
						name='modal'
						options={{
							presentation: 'modal',
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='poster'
						options={{
							headerShown: false,
							presentation: 'modal',
						}}
					/>
					<Stack.Screen name='+not-found' options={{ headerShown: false }} />
				</Stack>
			</RootSiblingParent>
			<StatusBar style='light' />
		</SafeAreaView>
	);
}
