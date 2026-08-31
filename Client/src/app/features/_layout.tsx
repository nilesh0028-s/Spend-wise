import { Stack } from 'expo-router';

export default function FeaturesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#34A748' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackTitle: '',
      }}
    />
  );
}
