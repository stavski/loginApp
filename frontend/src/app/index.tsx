import { View, Text, Image, ScrollView, KeyboardAvoidingView, Platform, Alert, TextInputProps, TextInput} from "react-native"

import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/globalStyles";
import { useForm } from "react-hook-form";
import { useRef } from "react";

export default function Index() {
    const {control, handleSubmit} = useForm({});
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
                            style={globalStyles.illustration}
                        />

                        <Text style={globalStyles.title}>Sign in</Text>
                        <Text style={globalStyles.subtitle}>Access your account using your email and password.</Text>

                        <View style={globalStyles.form}>
                            <Input 
                                formProps={{
                                    name: 'email',
                                    control
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
                                formProps={{
                                    name: 'password',
                                    control,
                                }}
                                inputProps={{ 
                                    placeholder: 'Password', 
                                    secureTextEntry: true
                                }}
                            />
                            <Button label="Login" onPress={handleSubmit(handleSignIn)}/>
                        </View>

                        <Text style={globalStyles.footerText}>
                            Don't have an account? {" "}
                            <Link 
                                href="/signup"
                                style={globalStyles.footerLink}
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