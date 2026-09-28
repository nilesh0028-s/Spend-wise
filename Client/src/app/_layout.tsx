import { Stack, router, useSegments } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetMe } from '@/redux/auth/auth.service';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function AuthGuard() {
  const segments = useSegments();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      const inAuthGroup = segments[0] === 'auth';

      if (!token && !inAuthGroup) {
        router.replace('/auth/pages/Login');
        return;
      }

      if (token) {
        try {
          await GetMe(token);
        } catch {
          await AsyncStorage.removeItem('token');
          router.replace('/auth/pages/Login');
        }
      }
    };
    checkToken();
  }, [segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#34A748" />
      <Provider store={store}>
        <AuthGuard />
      </Provider>
    </SafeAreaProvider>
  );
}
