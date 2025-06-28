import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';

import CustomDrawerContent from '@/components/CustomDrawerContent';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TRPCClientProvider, TRPCProvider } from '@/lib/trpc/trpc';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <TRPCClientProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
              headerShown: true,
              headerTitle: 'Little Chef',
            }}
          >
            <Drawer.Screen name="index" options={{ drawerLabel: "New Recipe", title: "New Recipe" }} />
          </Drawer>
        </ThemeProvider>
      </GestureHandlerRootView>
    </TRPCClientProvider>
  );
}
