import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Signup(params) {
	const navigation = useNavigation();

	let [username, setusername] = useState('');

	async function createUsername() {
		if (username.length == 0) return;
		fetch(`https://chatapi-rs.herokuapp.com/signup?username=${username}`)
			.then((e) => {
				console.log(e.status);
				if (e.status == 200) {
					navigation.navigate('Home', { username: username });
				}
				return e.json();
			})
			.then((e) => {
				console.log(e);
			});
	}

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Sign Up</Text>
			<View style={{ width: '90%' }}>
				<TextInput
					value={username}
					onChangeText={(e) => setusername(e)}
					placeholder='Enter the username'
					selectionColor={'#ADD8E6'}
					style={styles.input}
				/>
				<TouchableOpacity style={styles.button} onPress={async () => await createUsername(username)}>
					<Text
						style={{
							color: 'white',
							textAlign: 'center',
							fontWeight: 'bold',
							fontSize: 15,
						}}
					>
						Create New User
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('Login')}>
					<Text
						style={{
							textAlign: 'center',
							textDecorationLine: 'underline',
						}}
					>
						Already have an username
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40,
		paddingBottom: '60%',
		backgroundColor: '#E6E6E6',
	},
	heading: {
		// backgroundColor: 'orange',
		fontSize: 40,
		fontWeight: 'bold',
		textAlign: 'center',
		padding: 10,
	},
	input: {
		backgroundColor: '#f5f5f5',
		padding: 10,
		borderRadius: 6,
		textAlign: 'center',
	},
	button: {
		backgroundColor: '#4F7942',
		padding: 20,
		margin: 10,
		marginHorizontal: '10%',
		borderRadius: 6,
	},
});
