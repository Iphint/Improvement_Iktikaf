import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Fasting,
  Homepage,
  Iktikaf,
  Settings,
  SplashScreen,
  Tadarus,
  Tarawih,
  Zakat,
} from '../views';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CustomBar from '../components/CustomBar';
import DetailPr from '../views/DetailPr';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomBar {...props} />}>
      <Tab.Screen
        name="homepage"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
        component={Homepage}
      />
      <Tab.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} /> 
          ),
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
};

const Path = () => {
  return (
    <Stack.Navigator initialRouteName="splashscreen">
      <Stack.Screen
        name="mainapp"
        options={{ headerShown: false }}
        component={MainTab}
      />
      <Stack.Screen
        name="splashscreen"
        options={{ headerShown: false }}
        component={SplashScreen}
      />
      <Stack.Screen
        name="fasting"
        options={{ headerShown: false }}
        component={Fasting}
      />
      <Stack.Screen
        name="tarawih"
        options={{ headerShown: false }}
        component={Tarawih}
      />
      <Stack.Screen
        name="tadarus"
        options={{ headerShown: false }}
        component={Tadarus}
      />
      <Stack.Screen
        name="zakat"
        options={{ headerShown: false }}
        component={Zakat}
      />
      <Stack.Screen
        name="iktikaf"
        options={{ headerShown: false }}
        component={Iktikaf}
      />
      <Stack.Screen
        name="detailpr"
        options={{ headerShown: false }}
        component={DetailPr}
      />
    </Stack.Navigator>
  );
};

export default Path;
