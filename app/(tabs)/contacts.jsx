import { StyleSheet, Text, View, TouchableNativeFeedback, Image, Switch, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useMemo } from 'react';

import CurrentStream from '../../components/CurrentStream';
import { Link2Icon, MapPinIcon, MailIcon, ShieldCheckIcon, MoonIcon } from 'lucide-react-native';

import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import useThemeStore from '../../stores/ThemeStore';

const ContactsScreen = () => {
	const isDark = useThemeStore((s) => s.isDark);
	const setTheme = useThemeStore((s) => s.setTheme);

	const styles = useMemo(() => createStyles(isDark), [isDark]);

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.wrapper}>
					<Link asChild href='https://radio24.ru'>
						<TouchableNativeFeedback>
							<View style={styles.item}>
								<Link2Icon size={26} color={Colors['brand-800']} />
								<Text style={styles.itemText}>radio24.ru</Text>
							</View>
						</TouchableNativeFeedback>
					</Link>

					<View style={styles.item}>
						<MapPinIcon size={26} color={Colors['brand-800']} />
						<Text style={styles.itemText}>Москва, Пренесенская набережная, 2</Text>
					</View>

					<Link asChild href='mailto:info@wowmusic.ru'>
						<TouchableNativeFeedback>
							<View style={styles.item}>
								<MailIcon size={26} color={Colors['brand-800']} />
								<Text style={styles.itemText}>Отправить сообщение</Text>
							</View>
						</TouchableNativeFeedback>
					</Link>

					<Link asChild href='https://vyshka24.ru/backend/privacy.php'>
						<TouchableNativeFeedback>
							<View style={styles.item}>
								<ShieldCheckIcon size={26} color={Colors['brand-800']} />
								<Text style={styles.itemText}>Политика конфиденциальности</Text>
							</View>
						</TouchableNativeFeedback>
					</Link>

					<TouchableNativeFeedback onPress={() => setTheme(!isDark)}>
						<View style={styles.item}>
							<MoonIcon size={26} color={Colors['brand-800']} />
							<Text style={styles.itemText}>Тёмная тема</Text>
							<Switch
								trackColor={{ true: Colors['brand-900'] }}
								thumbColor={Colors['brand-700']}
								value={isDark}
								onChange={() => setTheme(!isDark)}
								ios_backgroundColor={Colors['brand-800']}
							/>
						</View>
					</TouchableNativeFeedback>

					<Image style={styles.logo} source={require('../../assets/radio24.png')} />
				</View>
			</ScrollView>

			<CurrentStream />
		</View>
	);
};

const createStyles = (isDark) =>
	StyleSheet.create({
		container: {
			flex: 1,
			paddingTop: 12,
			backgroundColor: isDark ? Colors['theme-950'] : Colors['theme-50'],
		},

		wrapper: {
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
		},

		item: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',
			gap: 24,
			width: '100%',
			paddingHorizontal: 24,
			paddingVertical: 18,
		},

		itemText: {
			fontFamily: Fonts.regular,
			fontSize: 18,
			color: isDark ? Colors['theme-50'] : Colors['theme-950'],
			flex: 1,
			textAlign: 'left',
		},

		logo: {
			flex: 1,
			width: '50%',
			height: 'auto',
			alignSelf: 'center',
			resizeMode: 'contain',
		},
	});

export default ContactsScreen;
