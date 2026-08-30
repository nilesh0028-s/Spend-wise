import { Stack, router, useSegments } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AuthGuard() {
  const segments = useSegments();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      const inAuthGroup = segments[0] === 'auth';

      if (!token && !inAuthGroup) {
        router.replace('/auth/pages/Login');
      } else if (token && inAuthGroup) {
        router.replace('/(tabs)/home');
      }
      setChecking(false);
    };
    checkToken();
  }, [segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthGuard />
    </Provider>
  );
}
