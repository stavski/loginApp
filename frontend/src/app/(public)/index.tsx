import { View, Text, Image, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from "react-native"

import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "@/styles/global.styles";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { styles } from "@/styles/login.styles";
import { LoginFormData } from "@/types/login.types";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
	const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();
	const passwordRef = useRef<TextInput>(null);

	const { signIn } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	async function handleSignIn(data: LoginFormData) {
		setIsLoading(true);

		try {

			await signIn(data);

		} catch (error: any) {
			Alert.alert(
				"Login failed",
				"Invalid email or password."
			);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.select({ ios: "padding", android: "height" })}
			>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					<View style={globalStyles.container}>
						<Image
							source={require("@/assets/login.png")}
							style={styles.illustration}
						/>

						<Text style={globalStyles.title}>Sign in</Text>
						<Text style={globalStyles.subtitle}>Access your account using your email and password.</Text>

						<View style={globalStyles.form}>
							<Input
								error={errors.email?.message?.toString()}
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
									placeholder: 'E-mail',
									keyboardType: "email-address",
									onSubmitEditing: () => passwordRef.current?.focus(),
									returnKeyType: 'next',
									autoCapitalize: "none",
									autoCorrect: false,
								}}
							/>
							<Input
								ref={passwordRef}
								error={errors.password?.message?.toString()}
								formProps={{
									name: 'password',
									control,
									rules: {
										required: "Password is required"
									}
								}}
								inputProps={{
									placeholder: 'Password',
									secureTextEntry: true
								}}
							/>
							<Button
								label={isSubmitting ? "Loading..." : "Login"}
								onPress={handleSubmit(handleSignIn)}
								disabled={isSubmitting}
							/>
						</View>

						<Text style={styles.footerText}>
							Don't have an account? {" "}
							<Link
								href="/signup"
								style={styles.footerLink}
							>
								Register here.
							</Link>
						</Text>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}