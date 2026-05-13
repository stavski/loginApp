import React from 'react';
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { globalStyles } from "@/styles/global.styles";
import { styles } from "@/styles/home.styles";

export default function Home() {
    const { user, signOut } = useAuth();
    const router = useRouter();

    const showMenu = () => {
        Alert.alert(
            "Settings",
            "",
            [
                { text: "Profile", onPress: () => { router.push("/profile") } },
                { text: "Sign Out", style: "destructive", onPress: signOut },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    const handleLogout = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Log Out", onPress: signOut, style: "destructive" }
            ]
        );
    };

    return (
        <View style={globalStyles.container}>
            <Stack.Screen
                options={{
                    headerTitle: "Home",
                    headerShown: true,
                    headerRight: () => (
                        <TouchableOpacity onPress={showMenu} style={styles.menuButton}>
                            <Ionicons name="person-circle-outline" size={26} color="#007AFF" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <View style={styles.content}>
                <Text style={styles.welcome}>Welcome back,</Text>
                <Text style={styles.userName}>{user?.name || "User"}</Text>
            </View>
        </View>
    );
}

