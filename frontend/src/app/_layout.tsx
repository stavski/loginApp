import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

function RootLayoutNav() {
    const { signed, loading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        const inAuthGroup = segments[0] === "(auth)";

        if (!signed && inAuthGroup) {
            router.replace("/");
        } else if (signed && segments[0] === "(public)") {
            router.replace("/home");
        }
    }, [signed, loading, segments]);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(public)/index" />
            <Stack.Screen name="(public)/signup" />
            <Stack.Screen name="(auth)/home" />
            <Stack.Screen name="(auth)/profile" />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootLayoutNav />
        </AuthProvider>
    );
}