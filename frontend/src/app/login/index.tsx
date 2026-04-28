import { View, Text, Image, ScrollView, KeyboardAvoidingView, Platform, TextInput} from "react-native"

import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "@/styles/globalStyles";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { styles } from "@/styles/login.styles";
import { LoginFormData } from "@/types/login.types";

export default function Index() {
    const {control, handleSubmit, formState: {errors} } = useForm<LoginFormData>();
    const passwordRef = useRef<TextInput>(null);

    function handleSignIn(data: any) {
        console.log(data);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
            <KeyboardAvoidingView 
                style={{ flex: 1 }} 
                behavior={ Platform.select({ ios: "padding", android: "height" }) }
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
                                    keyboardType: "email-address" ,
                                    onSubmitEditing: () => passwordRef.current?.focus(),
                                    returnKeyType: 'next'
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
                            <Button label="Login" onPress={handleSubmit(handleSignIn)}/>
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