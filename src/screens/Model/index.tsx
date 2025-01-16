
import React, { useEffect, useState } from 'react';
import { FlatList, } from 'react-native';
import { Container, Body, Header, ItemFlatList, Title, TextItem, TextInputS } from './styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { baseModel, modelService, responseModels } from '../../api/modelsService';

export default function Model({ route }: any) {
  const navigation = useNavigation();
  const [data,setData] = useState<baseModel[]>([])
  const [search, setSearch] = useState<string>()
  const [filteredData, setFilteredData] = useState(data);

  const { item } = route.params;

  useEffect(() => {
    modelService.getModels(item.codigo).then((reps) => {
      setData(reps.modelos)
      setFilteredData(reps.modelos)
    });
  }, []);

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
  
  const renderItem = ({ item }: { item: { codigo: string; nome: string } }) => (
    <ItemFlatList >
      <TextItem>{item.nome}</TextItem>
      <AntDesign name="tags" size={20} color="black" />
    </ItemFlatList>
  );

  return (
    <Container>
      <Header>
        <AntDesign name="leftcircleo" size={20} color="black"  onPress={() => { navigation.goBack(); }}/>
        <Title>{item.nome}</Title>
      </Header>
      <Body>
        <TextInputS
          placeholder="Buscar modelo.."
          onChangeText={handleSearch}
          value={search}
          style={{with:100}}
        />
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.codigo}
          style={{ width: "100%" }}
        />
      </Body>

    </Container>
  );
}

