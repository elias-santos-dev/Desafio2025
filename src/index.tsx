import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './screens/SignIn';
import Model from './screens/Model';
import Home from './screens/Home';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './contexts/AuthContext';
const Stack = createStackNavigator();

export default function Main() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <StatusBar />
                <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="Model" component={Model} />
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </AuthProvider>
        </NavigationContainer>
    );
}