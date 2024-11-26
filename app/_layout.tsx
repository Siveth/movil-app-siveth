import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="Screens/Viajes" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Screens/Boletos" 
          options={{ 
            title: 'Selección del viaje', // Cambia el título del header
            headerStyle: { backgroundColor: '#1E90FF' }, // Personaliza el estilo del header
            headerTitleStyle: { color: '#fff' }, // Personaliza el estilo del texto del header
            headerBackTitleVisible: false, // Oculta el título de retroceso
          }} 
        />
        <Stack.Screen 
          name="Screens/Asiento" 
          options={{ 
            title: 'Asientos',
            headerStyle: { backgroundColor: '#1E90FF' },
            headerTitleStyle: { color: '#fff' },
            headerBackTitleVisible: false,
          }} 
        />
        <Stack.Screen 
          name="Screens/Confirmacion" 
          options={{ 
            title: 'Detalle de compra',
            headerStyle: { backgroundColor: '#1E90FF' },
            headerTitleStyle: { color: '#fff' },
            headerBackTitleVisible: false,
          }} 
        />
        {/*
        <Stack.Screen name="Screens/Mudanza" options={{ headerShown: false }} />
        <Stack.Screen name="Screens/Paqueteria" options={{ headerShown: false }} /> */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
