import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';

export default function Chat({ route }) {
	var [chatlist, setchatlist] = useState([]);
	var [message, setmessage] = useState('');

	const receiver = route.params.receiver,
		sender = route.params.sender;

	async function getChats() {
		const raw = await fetch(`https://chatapi-rs.herokuapp.com/chats?receiver=${receiver}&sender=${sender}`);
		const res = await raw.json();
		let list = res.filter((ele) => {
			if (
				(ele.sender == sender && ele.receiver == receiver) ||
				(ele.sender == receiver && ele.receiver == sender)
			)
				return ele;
		});
		// console.log(list);
		setchatlist(list);
	}
	async function sendMessage() {
		if (message.length == 0) return;
		// const raw = await fetch(
		// 	`https://chatapi-rs.herokuapp.com/send?receiver=${receiver}&sender=${sender}&message=${message}`
		// );
		console.log('sender : ', sender);
		const raw = await fetch(
			`https://chatapi-rs.herokuapp.com/send?receiver=${receiver}&sender=${sender}&message=${message}`
		);
		const res = await raw.json();
		// console.log(res);
		getChats();
	}

	useEffect(() => {
		getChats();
	}, []);
	return (
		<View style={styles.container}>
			<View
				style={{
					backgroundColor: '#f5f5f5',
					padding: 5,
				}}
			>
				<Text
					style={{
						textAlign: 'center',
						fontWeight: 'bold',
						fontSize: 30,
					}}
				>
					{'@' + receiver}
				</Text>
			</View>
			<ScrollView>
				{chatlist.map((ele) => {
					return ele.sender != receiver ? (
						<View style={[styles.listitem, { marginLeft: '40%' }]}>
							<Text
								style={{
									fontWeight: 'bold',
									color: 'green',
								}}
							>
								{ele.sender}
							</Text>
							<Text
								style={{
									// backgroundColor: '#D3D3D3',
									padding: 4,
								}}
							>
								{ele.message}
							</Text>
						</View>
					) : (
						<View style={[styles.listitem, { marginRight: '40%' }]}>
							<Text
								style={{
									fontWeight: 'bold',
									color: '#8B8000',
								}}
							>
								{ele.sender}
							</Text>
							<Text>{ele.message}</Text>
						</View>
					);
				})}
			</ScrollView>

			<View>
				<TextInput
					value={message}
					onChangeText={(e) => setmessage(e)}
					style={styles.input}
					placeholder={`send message to @${receiver}`}
				/>
				<TouchableOpacity onPress={() => sendMessage(receiver, sender, message)} style={styles.sendbutton}>
					<Text
						style={{
							color: 'white',
							fontWeight: 'bold',
							fontSize: 20,
							textAlign: 'center',
						}}
					>
						Send
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E6E6E6',
		marginTop: 50,
		justifyContent: 'space-between',
	},
	input: {
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 6,
	},
	sendbutton: {
		backgroundColor: 'green',
		padding: 10,
	},
	listitem: {
		backgroundColor: 'white',
		paddingVertical: 10,
		margin: 6,
		padding: 10,
		borderRadius: 8,
	},
});
