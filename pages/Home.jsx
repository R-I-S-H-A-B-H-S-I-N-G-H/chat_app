import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home({ route }) {
	const username = route.params.username;
	let [chatdata, setchardata] = useState([]);

	const navigation = useNavigation();
	async function getList() {
		const raw = await fetch(`https://chatapi-rs.herokuapp.com/list`);
		var res = await raw.json();
		res = res.filter((ele) => {
			if (ele.username != username) return ele;
		});
		setchardata(res);
	}
	useEffect(() => {
		getList();
	}, []);

	return (
		<View style={styles.container}>
			<View
				style={{
					backgroundColor: 'white',
					paddingTop: 50,
				}}
			>
				<Text
					style={{
						textAlign: 'center',
						fontWeight: 'bold',
						fontSize: 45,
					}}
				>
					Chats
				</Text>
			</View>
			<ScrollView>
				{chatdata.map((ele) => {
					return (
						<TouchableOpacity
							onPress={() => navigation.navigate('Chat', { receiver: ele.username, sender: username })}
							key={ele._id}
							style={styles.listitem}
						>
							<Text>{ele.username}</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: '60%',
		backgroundColor: '#E6E6E6',
	},
	listitem: {
		backgroundColor: 'white',
		padding: 15,
		margin: 5,
		borderRadius: 6,
	},
});
