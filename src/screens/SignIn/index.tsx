
import { Body, Button, Container, Footer, FormContainer, Header, IconEye, TextFooter, TextInputS, Title } from './styles';
import { Keyboard, Text, TextInput, ToastAndroid, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { defaultStatusAuth, useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
	const navigation = useNavigation();

	const [passwordVisible, setPasswordVisible] = useState(true);

	const { user,password,statusAuth, userData, setStatusAuth, login } = useAuth();

	const { control, handleSubmit, setValue, formState: { errors } } = useForm();

	const onSubmit = (data: any) => {
		login(data.user, data.password);
		Keyboard.dismiss();

	};

	useEffect(() => {
		if (statusAuth.error) {
			ToastAndroid.show( statusAuth.message?statusAuth.message:"",ToastAndroid.SHORT);
			setStatusAuth(defaultStatusAuth)
		}else if(!statusAuth.error && typeof userData.token == "string" && typeof userData.name == "string"){
			setStatusAuth(defaultStatusAuth)
			navigation.navigate("Home");
		}
	}, [statusAuth]);

	useEffect(() => {
		setValue('user', user);
    	setValue('password', password);
	}, [user,password]);


	return (
		<Container>
			<Header>
				<AntDesign name="user" size={75} />
				<Title>Login</Title>
			</Header>
			<Body>
				<FormContainer>
					<Controller
						control={control}
						name="user"
						rules={{
							required: "O campo usuário é obrigatório",
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInputS
								placeholder="Digite seu usuário"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								hasError={!!errors.user} 
							/>
						)}
					/>
					<Controller
						control={control}
						name="password"
						rules={{
							required: "O campo senha é obrigatório",
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<>
								<TextInputS
									placeholder="Digite sua senha"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									secureTextEntry={passwordVisible} 
									hasError={!!errors.password} //
									/>
								<IconEye
									name={passwordVisible ? 'eye' : 'eyeo'}
									size={20}
									color="black"
									onPress={() => setPasswordVisible(!passwordVisible)} 
									style={{ marginLeft: 10 }}
								/>

							</>
						)}
					/>
					<Button type="submit" onPress={handleSubmit(onSubmit)}>
						<Text>Login</Text>
					</Button>
				</FormContainer>

			</Body>
			<Footer>
				<TextFooter variant='bodyMedium' >Seu próximo passo começa aqui. Faça login e explore suas possibilidades</TextFooter>
			</Footer>
		</Container>
	);
}

