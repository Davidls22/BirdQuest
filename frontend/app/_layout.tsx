import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import AuthProvider from "@/context/AuthProvider";
import SplashScreen from "@/components/SplashScreen"; // Custom SplashScreen import

export {
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "/splash", // Set initial route to the custom SplashScreen
};

export default function RootLayout() {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSplashReady(true);
    }, 2000); // Display splash screen for 2 seconds

    return () => clearTimeout(timeout);
  }, []);

  if (!isSplashReady) {
    return <SplashScreen />; // Show custom splash screen while loading
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(public)/login"
            options={{ headerShown: false }}
          />
      </Stack>
    </AuthProvider>
  );
}