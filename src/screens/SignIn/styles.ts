import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native'
import AntDesign from '@expo/vector-icons/AntDesign';


export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: flex-end;

`;

export const Body = styled.View`
  flex: 2;
  width: 100%;
  align-items: center;
  justify-content: center;

`;

export const Footer = styled.View`
  flex: 1;
  width: 75%;
  align-items: center;
  justify-content: center;

`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: 400;
`

export const TextFooter = styled.Text`
    width:100%;
    font-weight: 350;
`;

export const TextInputS = styled.TextInput<{ hasError: boolean }>`
width: 75%;
padding: 12px;
border-width: 1px;
border-radius: 10px;
margin-bottom: 25px;
border-color: ${({ hasError }) => (hasError ? 'red' : 'black')};
`;

export const Button = styled.TouchableOpacity`
  width: 200px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  border: 1px;
`;

export const FormContainer = styled.View`
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: absolute;
`;


export const IconEye = styled(AntDesign)`
  position: absolute;
  right: 15%;
  padding-top: 6px;
`;