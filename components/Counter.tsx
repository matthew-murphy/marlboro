import { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Text, View } from './Themed';
import Colors from '../constants/Colors';

interface Props {
	name: string;
	count: number;
}

export const Counter = ({ path }: { path: string }) => {
	const colorScheme = useColorScheme();

	const [state, setState] = useState<Props[]>([{
		name: 'Fire Alarms',
		count: 0,
	}]);

	const [selectedState, setSelectedState] = useState<number>(0);

	const handleIncrement = (index: number) => {
		setState(prev => {
			const newState = [...prev];
			newState[index] = {
				...newState[index],
				count: newState[index].count + 1,
			}
			return newState;
		});
	}

	const handleDecrement = (index: number) => {
		setState(prev => {
			const newState = [...prev];
			newState[index] = {
				...newState[index],
				count: newState[index].count - 1,
			}
			return newState;
		});
	}

	const handleReset = (index: number) => {
		setState(prev => {
			const newState = [...prev];
			newState[index] = {
				...newState[index],
				count: 0,
			}
			return newState;
		});
	}

	const editName = (index: number, name: string) => {
		setState(prev => {
			const newState = [...prev];
			newState[index].name = name;
			return newState;
		});
	}

	const addNewCounter = () => {
		setState([...state, {
			name: 'New Counter' + (state.length + 1).toString(),
			count: 0,
		}]);
		setSelectedState(state.length);
	}


	const selectedName = (index: number) => {
		return(<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
			<TouchableOpacity
				style={selectedState !== state.length - 1 ? {alignSelf: 'center', backgroundColor: Colors[colorScheme ?? 'light'].tint} : {alignSelf: 'center', opacity: 0.5}}
				onPress={() => {
					setSelectedState(prev => prev - 1);
				}}
				disabled={selectedState === 0}
			>
				<MaterialIcons name="navigate-before" size={24} color={Colors[colorScheme ?? 'light'].tint} />
			</TouchableOpacity>
			<TextInput
				style={{ color: Colors[colorScheme ?? 'light'].tint, height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, borderRadius: 5, width: 200, textAlign: 'center', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}
				onChangeText={text => editName(index, text)}
				value={(state[index] && state[index].name) || ""}
			/>
			<TouchableOpacity 
				style={selectedState !== state.length - 1 ? {alignSelf: 'center'} : {alignSelf: 'center', opacity: 0.5}} 
				onPress={() => {
					setSelectedState(prev => prev + 1);
				}}
				disabled={selectedState === state.length - 1}
			>
				<MaterialIcons name="navigate-next" size={24} color={Colors[colorScheme ?? 'light'].tint} />
			</TouchableOpacity>
		</View>);
	}

	const selectedCounter = (index: number) => {
		return(<View style={{ flexDirection: 'row', gap: 10, margin: 10 }}>
			<TouchableOpacity disabled={state[index] && state[index].count === 0} style={state[index] && state[index].count !== 0 ? styles.button : styles.buttonDisabled} onPress={() => handleDecrement(index)}>
				<Text>Decrement <AntDesign name="minus" size={20} color="black" /></Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => handleIncrement(index)}>
				<Text>Increment <AntDesign name="plus" size={20} color="black" /></Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => handleReset(index)}>
				<Text>Reset <Ionicons name="refresh" size={20} color="black" /></Text>
			</TouchableOpacity>
		</View>);
	}

	return (
		<View>
			{state.map((item: Props, index: number) => {
				if (index === selectedState) {
					return(
						<View key={index}>
							<TouchableOpacity activeOpacity={.5} onPress={addNewCounter}><Text style={{ textDecorationLine: 'underline', color: Colors.light.tint}}>Add new</Text></TouchableOpacity>
							{selectedName(index)}
							<Text style={{ fontSize: 60}}>{item && item.count}</Text>
							{selectedCounter(index)}
						</View>
					);
				}
			})}
		</View>
	);
}


const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		padding: 10,
		borderRadius: 5,
		backgroundColor: Colors.light.tint,
	},
	buttonDisabled: {
		alignItems: 'center',
		padding: 10,
		opacity: 0.5,
		borderRadius: 5,
		backgroundColor: Colors.dark.tint,
	},
});