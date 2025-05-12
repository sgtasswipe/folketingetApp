import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainApp from "./MainTabs";
import { createStackNavigator } from "@react-navigation/stack";


// Create stack navigator
const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
