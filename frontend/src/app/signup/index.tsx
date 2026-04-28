import { View, Text, Image, ScrollView, KeyboardAvoidingView, Platform, TextInput} from "react-native"

import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "@/styles/globalStyles";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { styles } from "@/styles/signup.styles";
import { AccountProps } from "@/types/signup.type";

export default function Signup() {
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const passwordConfirmationRef = useRef<TextInput>(null);

    const {control, handleSubmit, formState: {errors}, getValues } = useForm<AccountProps>();
    
    function handleSignIn(data: AccountProps) {
        console.log(data);
    }

    function validationPasswordConfirmation(passwordConfirmation: string) {
        const { password } = getValues();

        return password === passwordConfirmation || "The passwords do not match";
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
            <KeyboardAvoidingView 
                style={{ flex: 1 }} 
                behavior={ Platform.select({ ios: "padding", android: "height" }) }
            >
                <ScrollView 
                    style={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={globalStyles.container}>
                        <Image 
                            source={require("@/assets/signup.png")}
                            style={styles.illustration}
                        />

                        <Text style={globalStyles.title}>Sign Up</Text>
                        <Text style={globalStyles.subtitle}>Create your account to gain access.</Text>

                        <View style={globalStyles.form}>
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
                                    onSubmitEditing: () => emailRef.current?.focus(),
                                    returnKeyType: 'next'
                                }}
                            />
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
                                    placeholder: 'E-mail',
                                    keyboardType: "email-address" ,
                                    onSubmitEditing: () => passwordRef.current?.focus(),
                                    returnKeyType: 'next'
                                }}
                            />
                            <Input 
                                error={errors.password?.message}
                                ref={passwordRef}
                                formProps={{
                                    name: 'password',
                                    control,
                                    rules: {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "The password must be at least 6 characters long"
                                        }
                                    }
                                }}
                                inputProps={{ 
                                    placeholder: 'Password', 
                                    secureTextEntry: true,
                                    onSubmitEditing: () => passwordConfirmationRef.current?.focus(),
                                    returnKeyType: 'next'
                                }}
                            />
                            <Input 
                                error={errors.passwordConfirmation?.message}
                                ref={passwordConfirmationRef}
                                formProps={{
                                    name: 'passwordConfirmation',
                                    control,
                                    rules: {
                                        required: "Password Confirmation is required",
                                        validate: validationPasswordConfirmation,
                                    }
                                }}
                                inputProps={{ 
                                    placeholder: 'Password Confirmation', 
                                    secureTextEntry: true
                                }}
                            />
                            <Button label="Save" onPress={handleSubmit(handleSignIn)}/>
                        </View>

                        <Text style={styles.footerText}>
                            Already have an account? {" "}
                            <Link 
                                href="/login"
                                style={styles.footerLink}
                            >
                                Click here.
                            </Link>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}