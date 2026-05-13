import React, { useRef } from 'react';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { router, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";

import { Input } from '@/components/Input';
import { ChangePasswordFormData } from "@/types/change-password.type";
import { styles } from '@/styles/profile.styles';
import { Button } from '@/components/Button';
import api from '@/services/api';
import { useAuth } from "@/contexts/AuthContext";

export default function ChangePassword() {
    const newPasswordRef = useRef<TextInput>(null);
    const newPasswordConfirmationRef = useRef<TextInput>(null);

    const { user } = useAuth();

    if (!user) return null;

    const { control, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm<ChangePasswordFormData>();

    async function handleSignIn(data: ChangePasswordFormData) {
        try {
            const response = await api.patch(`/users/${user?.id}/update-password`, {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
                passwordConfirmation: data.newPasswordConfirmation,
            });

            if (response.status === 204) {
                Alert.alert("Success", "Password changed successfully!", [
                    {
                        text: "OK",
                        onPress: () => router.back()
                    }
                ]);
            }
        } catch (error: any) {
            if (error.response) {
                const serverError = error.response.data.error;

                console.log(error.response.data);

                Alert.alert("Error", typeof serverError === 'string' ? serverError : "Something went wrong");
            } else {
                Alert.alert("Network Error", "Could not connect to the server.");
            }
        }
    }

    function validationPasswordConfirmation(newPasswordConfirmation: string) {
        const { newPassword } = getValues();

        return newPassword === newPasswordConfirmation || "The passwords do not match";
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <Stack.Screen options={{ headerTitle: "Security", headerShown: true }} />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView style={styles.container} contentContainerStyle={styles.content}>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Change Password</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Current Password</Text>
                            <Input
                                error={errors.currentPassword?.message}
                                formProps={{
                                    name: 'currentPassword',
                                    control,
                                    rules: {
                                        required: "Current Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "The password must be at least 6 characters long"
                                        }
                                    }
                                }}
                                inputProps={{
                                    secureTextEntry: true,
                                    returnKeyType: 'next',
                                    textContentType: 'oneTimeCode',
                                    importantForAutofill: 'no',
                                    onSubmitEditing: () => newPasswordRef.current?.focus(),
                                }}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>New Password</Text>
                            <Input
                                error={errors.newPassword?.message}
                                ref={newPasswordRef}
                                formProps={{
                                    name: 'newPassword',
                                    control,
                                    rules: {
                                        required: "New Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "The password must be at least 6 characters long"
                                        }
                                    }
                                }}
                                inputProps={{
                                    secureTextEntry: true,
                                    returnKeyType: 'next',
                                    textContentType: 'oneTimeCode',
                                    importantForAutofill: 'no',
                                    onSubmitEditing: () => newPasswordConfirmationRef.current?.focus(),
                                }}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>New Password Confirmation</Text>
                            <Input
                                error={errors.newPasswordConfirmation?.message}
                                ref={newPasswordConfirmationRef}
                                formProps={{
                                    name: 'newPasswordConfirmation',
                                    control,
                                    rules: {
                                        required: "New Password Confirmation is required",
                                        validate: validationPasswordConfirmation,
                                    }
                                }}
                                inputProps={{
                                    secureTextEntry: true
                                }}
                            />
                        </View>

                        <Button
                            label={isSubmitting ? "Loading..." : "Save"}
                            onPress={handleSubmit(handleSignIn)}
                            disabled={isSubmitting}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}