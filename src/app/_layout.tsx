import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {

  return (
    <SafeAreaView style={styles.container}>
      <Stack screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="(signin)/index" />
        <Stack.Screen name="(signup)/signup" />
        <Stack.Screen name="protected/home" /> */}
      </Stack>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    
  }
})