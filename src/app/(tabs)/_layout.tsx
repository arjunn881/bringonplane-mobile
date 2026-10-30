import { Tabs } from 'expo-router';
import { Platform, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 86 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: -2,
        },
        headerStyle: {
          backgroundColor: Colors.primary,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 18,
          letterSpacing: -0.3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Search',
          headerTitle: () => <WebsiteHeaderTitle />,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon emoji="🔍" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          headerTitle: 'Browse Categories',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon emoji="📂" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="checklist"
        options={{
          title: 'Checklist',
          headerTitle: 'Packing Checklist',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon emoji="🧳" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="guides"
        options={{
          title: 'Guides',
          headerTitle: 'Travel Guides & Rules',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon emoji="📖" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          headerTitle: 'Airline & TSA Rules',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon emoji="⋯" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

function WebsiteHeaderTitle() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 18 }}>✈️</Text>
      </View>
      <View>
        <Text
          style={{
            color: Colors.white,
            fontSize: 17,
            fontWeight: '900',
            letterSpacing: -0.4,
          }}
        >
          BringOnPlane
        </Text>
        <Text
          style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 9,
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: 0.8,
          }}
        >
          TSA & AIRLINE BAGGAGE RULES
        </Text>
      </View>
    </View>
  );
}

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.45 }}>
      {emoji}
    </Text>
  );
}
