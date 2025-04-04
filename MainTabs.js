import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import AfstemningerScreen from "./AfstemningerScreen"
import AboutScreen from "./AboutScreen";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Afstemninger") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "Om data") {
            iconName = focused ? "information-circle" : "information-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#a6192e",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // Optional: hide header for cleaner look
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Afstemninger" component={AfstemningerScreen} />
      <Tab.Screen name="Om data" component={AboutScreen} />
    </Tab.Navigator>
  );
} 
