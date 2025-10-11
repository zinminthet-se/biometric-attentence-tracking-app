import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { View, Image, Text, ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import icons from "../constants/icons";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

export default function AppTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarShowLabel: false,
        headerShown: false,
      }}
      initialRouteName="homeStack"
      id="undefined"
    >
      <Tab.Screen
        name="homeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="home" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="history"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="analytics" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="person-circle" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
