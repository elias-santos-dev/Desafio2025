import styled from "styled-components/native";
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 10px;
  align-items: center;
  justify-content: center;
  
`;

export const Header = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;

`;

export const Body = styled.View`
  flex: 10;
  width: 100%;
  align-items: center;
  justify-content: center;

`;

export const ItemFlatList = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  margin:5px;
  width:90%;
  border-bottom-width: 1px;
  padding: 10px;
`

export const TextItem = styled.Text`
  font-size: 15px;
  font-weight: 500;
`

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 400;
`

export const TextInputS = styled.TextInput<{ hasError: boolean }>`
  width: 90%;
  padding: 12px;
  border-bottom-width: 1px;
  margin-bottom: 10px;
`;

export const MensagemData = styled.TextInput<{ hasError: boolean }>`
  width: 90%;
  padding: 12px;
  border-bottom-width: 1px;
  margin-bottom: 10px;
`;
