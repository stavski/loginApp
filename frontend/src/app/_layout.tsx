import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

function RootLayoutNav() {
    const { signed, loading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        const rootSegment = segments[0];

        const isAuthRoute = rootSegment === "signup" || rootSegment === undefined;

        if (!signed && !isAuthRoute) {
            router.replace("/");
        } else if (signed && isAuthRoute) {
            router.replace("/home");
        }
    }, [signed, loading, segments]);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="signup/index" />
            <Stack.Screen name="home/index" />
        </Stack>
    );
}

export default function Layout() {
    return (
        <AuthProvider>
            <RootLayoutNav />
        </AuthProvider>
    );
}