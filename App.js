import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainApp from "./MainTabs";
import Login from "./user_management/Login";
import SignUp from "./user_management/SignUp";


// Create stack navigator
const Stack = createStackNavigator();

export default function App() {
 
  const [session, setSession] = useState(null);
const [loading, setLoading] = useState(true);




  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
          <Stack.Screen name="MainApp" component={MainApp} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
