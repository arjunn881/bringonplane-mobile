import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#208AEF" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#208AEF' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="item/[slug]"
          options={{
            title: 'Item Details',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
    </>
  );
}
