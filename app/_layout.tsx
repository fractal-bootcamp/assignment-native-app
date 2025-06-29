import CustomDrawerContent from '@/components/CustomDrawerContent';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TRPCClientProvider } from '@/lib/trpc/trpc';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    'PlayfairDisplay-Regular': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
    'PlayfairDisplay-Bold': require('../assets/fonts/PlayfairDisplay-Bold.ttf'),
    'PlayfairDisplay-SemiBold': require('../assets/fonts/PlayfairDisplay-SemiBold.ttf'),
    'PlayfairDisplay-Italic': require('../assets/fonts/PlayfairDisplay-Italic.ttf'),
  });

  console.log("fonts:", loaded, error);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <TRPCClientProvider>
      <GestureHandlerRootView className="bg-blue-500 flex-1">
        <View className="flex-1 bg-blue-500">
          <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
              headerShown: true,
              headerTitle: 'Little Chef',
              headerStyle: {
                backgroundColor: '#e8d5c4',
              },
              headerTitleStyle: {
                color: '#2c3e50',
                fontFamily: 'PlayfairDisplay-Bold',
              },
            }}
          >
            <Drawer.Screen name="index" options={{ drawerLabel: "New Recipe", title: "New Recipe" }} />
          </Drawer>
        </View>
      </GestureHandlerRootView>
    </TRPCClientProvider>
  );
}
