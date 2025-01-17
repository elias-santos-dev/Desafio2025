import { Button, FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Body, Container, Header, ItemFlatList, TextInputS, TextItem, Title } from './styles';
import { useAuth } from '../../contexts/AuthContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { brandsService, responseBrands } from '../../api/brandsService';

export default function Home() {
	const navigation = useNavigation();
	  const [data,setData] = useState<responseBrands[]>([])
	  const [search, setSearch] = useState<string>()
	  const [filteredData, setFilteredData] = useState<responseBrands[]>(data);
	
	const { userData, logout } = useAuth();

	const logOutApp = () => {
		logout();
		navigation.goBack();
	}

	const getData = () => {
		brandsService.getBrands().then((reps) => {
			if (reps.length > 0) {
				setData(reps);
				setFilteredData(reps)
			} else {
				ToastAndroid.show("Nenhuma marca encontrada",ToastAndroid.SHORT);
				setData([]);
			}
		});
	}

	const handleSearch = (text: string) => {
		setSearch(text);
		if (text === '') {
		  setFilteredData(data);
		} else if(data){
		  const filtered = data.filter((item) =>
			item.nome.toLowerCase().includes(text.toLowerCase())
		  );
		  setFilteredData(filtered);
		}
	};
	   
	useEffect(() => {
		getData()
	}, []);

	const renderItem = ({ item }: { item: { codigo: string; nome: string } }) => (
		<ItemFlatList  onPress={() => { navigation.navigate("Model", { item: item, userData: userData }) }}>
			<TextItem>{item.nome}</TextItem>
			<AntDesign name="rightcircleo" size={20} color="black" />
		</ItemFlatList>
	);

	return (
		<Container>
			<Header>
				<Title>{userData.name}</Title>
				<AntDesign name="logout" size={20} color="black" onPress={() => { logOutApp() }} />
			</Header>
			<Body>
				<TextInputS
					placeholder="Buscar marca.."
					onChangeText={handleSearch}
					value={search}
					style={{ display:filteredData.length>0 ? "flex":"none",with: 100 }}
				/>
				<FlatList
					data={filteredData}
					renderItem={renderItem}
					keyExtractor={(item) => item.codigo}
					style={{ display:filteredData.length>0 ? "flex":"none",width: "100%" }}
				/>
				<View>
					{data.length == 0 ? <>
						<Text>Não foi possivel obter os dados das marcas!</Text>
						<Button title='Tentar novamente' onPress={() => { getData() }}></Button>
					</> : <></>}
				</View>
			</Body>

		</Container>
	);
}


