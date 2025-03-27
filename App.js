import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login2 from './Login2';


export default function App(){
  return(
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Login2 />
    </View>
  )
}