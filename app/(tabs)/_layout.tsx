import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Entypo name={focused ? 'home' : 'home'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Login"
        options={{
          title: 'Inicio de sesión',
          tabBarIcon: ({ color, focused }) => (
            <Entypo name={focused ? "login" : 'login'} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Registro"
        options={{
          title: 'Registro',
          tabBarIcon: ({ color, focused }) => (
            <Entypo name={focused ? 'add-user' : 'add-user'} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Servicios"
        options={{
          title: 'Servicios',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name={focused ? 'toolbox' : 'toolbox'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
