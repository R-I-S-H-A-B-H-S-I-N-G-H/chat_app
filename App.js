import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Loginpage from './pages/Loginpage';
import Chat from './pages/Chat';
const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name='Signup' component={Signup} />
					<Stack.Screen name='Login' component={Loginpage} />
					<Stack.Screen name='Home' component={Home} />
					<Stack.Screen name='Chat' component={Chat} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
