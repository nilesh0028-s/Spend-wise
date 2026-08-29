import { View, Text } from 'react-native'
import { Link } from 'expo-router'

export default function Login() {
  return (
    <View>
      <Text>Login</Text>
      <Text>already have an  account <Link href="/auth/Register" push> Resister</Link></Text>
    </View>
  )
}