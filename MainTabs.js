import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import AfstemningerScreen from "./screens/AfstemningerScreen";
import AboutScreen from "./screens/AboutScreen";
import VoteInformationScreen from "./screens/VoteInformationScreen";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
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
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Afstemninger" component={AfstemningerScreen} />
      <Tab.Screen name="Om data" component={AboutScreen} />
    </Tab.Navigator>
  );
}

export default function MainApp() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="VoteInformation" component={VoteInformationScreen} options={{ headerShown: true, headerTintColor: '#a6192e', headerTitle: 'Afstemning' }} />
    </Stack.Navigator>
  );
}
