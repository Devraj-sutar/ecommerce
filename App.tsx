import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import Shopall from './screens/Shopall';
import Viewcategory from './screens/Viewcategory';
import Productdetails from './screens/Productdetails';
import SearchProductList from './screens/SearchProductList';



const App = () => {
  const Stack = createStackNavigator();

  
  return (
    <NavigationContainer>
      <StatusBar barStyle='dark-content'  backgroundColor={'white'} />
      <Stack.Navigator initialRouteName='splashscreen'>
        <Stack.Screen name='splashscreen' component={SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name='home' component={Home} options={{headerShown:false}} />
        <Stack.Screen name='shopall' component={Shopall} options={{headerShown:false}} />
        <Stack.Screen name='viewcategory' component={Viewcategory} options={{headerShown:false}} />
        <Stack.Screen name='productdetails' component={Productdetails} options={{headerShown:false}} />
        <Stack.Screen name='searchproductlist' component={SearchProductList} options={{headerShown:false}} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
