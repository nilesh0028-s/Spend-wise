import { useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchMe } from '@/redux/auth/auth.thunk';

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const check = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        await dispatch(fetchMe());
        router.replace('/(tabs)/home');
      } else {
        router.replace('/auth/pages/Login');
      }
    };
    check();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#34A748" />
    </View>
  );
}
