import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { View, SafeAreaView, StyleSheet } from "react-native";
import Header from "@/components/Header";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.tabsContainer}>
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="birdsearch"
            options={{
              title: "Bird Search",
              tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
              headerShown: false,
            }}
          />
        </Tabs>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flex: 1,
    marginTop: 10, 
  },
});
