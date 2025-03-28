import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import AfstemningerScreen from "./AfstemningerScreen"

const Tab = createBottomTabNavigator();

export default function MainApp() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Afstemninger" component={AfstemningerScreen}></Tab.Screen>
      
    </Tab.Navigator>
  );
}
