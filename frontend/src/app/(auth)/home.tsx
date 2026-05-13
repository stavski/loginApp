import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, TextInput, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "@/contexts/AuthContext";
import { globalStyles } from "@/styles/global.styles";
import { styles } from "@/styles/home.styles";
import api from '@/services/api';
import { User } from "@/types/user.types";

export default function Home() {
    const { user, signOut } = useAuth();

    if (!user) return null;

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const limit = 5;
    const [users, setUsers] = useState<User[]>([]);

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

    const fetchUsers = async (pageNumber = 1, shouldRefresh = false) => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await api.get('/users', {
                params: {
                    page: pageNumber,
                    limit: limit,
                    filter: search
                }
            });

            const remoteData = response.data.data;
            const meta = response.data.meta || { totalPages: 1 };

            setUsers(prev => shouldRefresh ? remoteData : [...prev, ...remoteData]);
            setTotalPages(meta.totalPages);
            setPage(pageNumber);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(1, true);
    }, [search]);

    const handleLoadMore = () => {
        if (page < totalPages && !loading) {
            fetchUsers(page + 1);
        }
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

            <View style={styles.headerContainer}>
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcome}>Welcome back,</Text>
                    <Text style={styles.userName}>{user?.name || "User"}</Text>
                </View>

                <View style={styles.searchSection}>
                    <Ionicons name="search" size={20} color="#8E8E93" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search users..."
                        value={search}
                        onChangeText={setSearch}
                        placeholderTextColor="#8E8E93"
                    />
                </View>
            </View>

            <FlatList
                data={users}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View style={styles.userCard}>
                        <Text style={styles.userNameInList}>{item.name}</Text>
                        <Text style={styles.userEmailInList}>{item.email.toLowerCase()}</Text>
                        <Text style={styles.userEmailInList}>{new Date(item.created_at).toLocaleDateString('pt-BR')}</Text>
                    </View>
                )}
                ListFooterComponent={() => (
                    loading && page > 1 ? <ActivityIndicator style={{ margin: 20 }} /> : null
                )}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.2}
                onRefresh={() => fetchUsers(1, true)}
                refreshing={loading && page === 1}
            />
        </View>
    );
}