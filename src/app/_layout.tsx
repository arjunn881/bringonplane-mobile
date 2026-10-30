import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/colors';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: '700', fontSize: 17 },
          headerBackTitle: 'Back',
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="item/[slug]"
          options={{
            title: 'Item Rules',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="airlines"
          options={{
            title: 'Airline Baggage Policies',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="countries"
          options={{
            title: 'Country Customs Rules',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="tsa-rules"
          options={{
            title: 'Official TSA Rules 2026',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="compare"
          options={{
            title: 'Compare Items',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="guide/[slug]"
          options={{
            title: 'Travel Guide',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
    </>
  );
}
