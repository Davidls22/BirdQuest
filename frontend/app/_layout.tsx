import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";

import AuthProvider from "@/context/AuthProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/login",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    ...FontAwesome.font,
  });

  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    // Introduce a timeout to ensure splash screen is visible for at least 2 seconds
    const timeout = setTimeout(() => {
      if (fontsLoaded) {
        setSplashReady(true);
        SplashScreen.hideAsync();
      }
    }, 2000); // Adjust the timeout duration as needed

    // Hide splash screen immediately if fonts are loaded before the timeout
    if (fontsLoaded) {
      clearTimeout(timeout);
      setSplashReady(true);
      SplashScreen.hideAsync();
    }

    return () => clearTimeout(timeout);
  }, [fontsLoaded]);

  if (!isSplashReady) {
    return null; // Show nothing while the splash screen is visible
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