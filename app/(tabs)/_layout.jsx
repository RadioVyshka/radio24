import { Tabs } from 'expo-router';

import { RadioIcon, HeartIcon, InfoIcon } from 'lucide-react-native';

import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import { useIsPortrait } from '../../hooks/useIsPortrait';
import useThemeStore from '../../stores/ThemeStore';

const TabsLayout = () => {
	const isDark = useThemeStore((s) => s.isDark);
	const isTablet = useIsPortrait();

	return (
		<Tabs
			initialRouteName='index'
			options={{
				swipeEnabled: true,
				lazy: true,
				animationEnabled: false,
			}}
			screenOptions={{
				tabBarPosition: isTablet ? 'left' : 'bottom',
				tabBarStyle: {
					backgroundColor: isTablet
						? isDark
							? Colors['theme-950']
							: Colors['theme-50']
						: Colors['brand-800'],
					paddingTop: isTablet ? 16 : 0,
					height: !isTablet && 54,
					borderTopWidth: 0,
				},

				tabBarActiveBackgroundColor: isTablet && Colors['brand-800'],
				tabBarActiveTintColor: Colors['theme-50'],
				tabBarInactiveTintColor: isTablet
					? isDark
						? Colors['brand-300']
						: Colors['brand-800']
					: Colors['brand-300'],

				tabBarLabelStyle: !isTablet && {
					fontFamily: Fonts.regular,
					marginTop: 0,
					fontSize: 12,
					fontWeight: '500',
					transition: '0.2s ease-in-out',
				},

				headerShown: !isTablet,
				headerStyle: {
					backgroundColor: Colors['brand-800'],
					borderBottomWidth: 0,
				},
				headerStatusBarHeight: 0,
				headerTitleAlign: 'center',
				headerStatusBarHeight: -8,
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					tabBarIcon: ({ color }) => <RadioIcon size={24} color={color} />,
					tabBarLabel: 'Потоки',
					headerTitle: 'РАДИО24 - Яркие моменты вместе! 🔥',
					headerTitleStyle: {
						fontSize: 16,
						fontFamily: Fonts.bold,
						color: Colors['theme-50'],
					},
				}}
			/>
			<Tabs.Screen
				name='favorites'
				options={{
					tabBarIcon: ({ color }) => <HeartIcon size={24} color={color} />,
					tabBarLabel: 'Избранное',
					headerTitle: 'Любимые потоки ❤️‍🔥',
					headerTitleStyle: {
						fontSize: 18,
						fontFamily: Fonts.bold,
						color: Colors['theme-50'],
					},
				}}
			/>
			<Tabs.Screen
				name='contacts'
				options={{
					tabBarIcon: ({ color }) => <InfoIcon size={24} color={color} />,
					tabBarLabel: 'Контакты',
					headerTitle: 'Контактная информация',
					headerTitleStyle: {
						fontSize: 18,
						fontFamily: Fonts.bold,
						color: Colors['theme-50'],
					},
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
