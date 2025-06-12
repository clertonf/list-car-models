import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import Toast from "react-native-toast-message";

import { AuthProvider, useAuth } from "@/contexts";

import { toastConfig } from "@/config";
import "../global.css";

const queryClient = new QueryClient();

function AppRoutes() {
  const router = useRouter();
  const segments = useSegments();
  const auth = useAuth();

  useEffect(() => {
    if (auth.loading) return;

    const inAuthGroup = segments[0] === "auth";
    const isNotFound = segments[0] === "+not-found";

    if (!auth.user && !inAuthGroup) {
      router.replace("/auth/login");
    } else if (auth.user && (inAuthGroup || isNotFound)) {
      router.replace("/main");
    }
  }, [auth.user, auth.loading, segments, router]);

  if (auth.loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
        <Toast config={toastConfig} />
        <StatusBar barStyle="dark-content" />
      </AuthProvider>
    </QueryClientProvider>
  );
}
