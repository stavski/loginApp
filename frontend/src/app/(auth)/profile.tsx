import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";

import { useAuth } from "@/contexts/AuthContext";
import { Input } from '@/components/Input';
import { AccountProps } from "@/types/signup.type";
import { styles } from '@/styles/profile.styles';
import { Button } from '@/components/Button';
import api from "@/services/api";

export default function Profile() {
    const { user, signOut, updateUser } = useAuth();

    const emailRef = useRef<TextInput>(null);

    const { control, handleSubmit, reset, formState: { errors, isSubmitting }, getValues } = useForm<AccountProps>();

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email
            });
        }
    }, [user, reset]);

    async function handleSignIn(data: AccountProps) {
        try {
            const response = await api.put(`/users/${user?.id}`, {
                name: data.name,
                email: data.email,
            });

            if (response.status === 200) {
                updateUser(response.data.data);

                Alert.alert("Success", "Profile updated successfully!", [
                    {
                        text: "OK",
                    }
                ]);
            }
        } catch (error: any) {
            if (error.response) {
                const serverError = error.response.data.error;

                if (error.response.status === 409 && serverError.email) {
                    Alert.alert("Conflict", serverError.email);
                } else {
                    Alert.alert("Error", typeof serverError === 'string' ? serverError : "Something went wrong");
                }
            } else {
                Alert.alert("Network Error", "Could not connect to the server.");
            }
        }
    }

    async function handleDeleteAccount() {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const response = await api.delete(`/users/${user?.id}`);

                            console.log(response.status);

                            if (response.status === 204) {
                                Alert.alert("Deleted", "Your account has been removed.");

                                signOut();
                            } else {
                                Alert.alert("Error", "Something went wrong.");
                            }
                        } catch (error) {
                            Alert.alert("Error", "Could not delete account. Try again later.");
                        }
                    }
                }
            ]
        );
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <Stack.Screen options={{ headerTitle: "My Profile", headerShown: true }} />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView style={styles.container} contentContainerStyle={styles.content}>

                    {/* Section 1: Personal Info */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Account Details</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <Input
                                error={errors.name?.message}
                                formProps={{
                                    name: 'name',
                                    control,
                                    rules: {
                                        required: "Name is required",
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message: "Invalid name"
                                        }
                                    }
                                }}
                                inputProps={{
                                    placeholder: 'Name',
                                    style: styles.input,
                                    returnKeyType: 'next',
                                    onSubmitEditing: () => emailRef.current?.focus(),
                                }}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <Input
                                error={errors.email?.message}
                                ref={emailRef}
                                formProps={{
                                    name: 'email',
                                    control,
                                    rules: {
                                        required: "E-mail is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email address"
                                        }
                                    }
                                }}
                                inputProps={{
                                    placeholder: 'Email',
                                    keyboardType: "email-address",
                                    autoCapitalize: "none",
                                    autoCorrect: false,
                                    style: styles.input,
                                }}
                            />
                        </View>

                        <Button
                            label={isSubmitting ? "Loading..." : "Save"}
                            onPress={handleSubmit(handleSignIn)}
                            disabled={isSubmitting}
                        />
                    </View>

                    {/* Section 2: Security */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Security</Text>

                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => router.push("/change-password")}
                        >
                            <Text style={styles.secondaryButtonText}>Change Password</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={handleDeleteAccount}
                        >
                            <Text style={styles.deleteText}>Delete Account</Text>
                        </TouchableOpacity>
                    </View>


                    {/* Logout */}
                    <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                        <Text style={styles.logoutText}>Sign Out</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}