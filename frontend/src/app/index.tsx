import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform, Alert} from "react-native"

import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { Link } from "expo-router"
import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSignIn() {
        if (!email.trim() || !password.trim()) {
            return Alert.alert("Atention!", "Fill out the fields to log in.")
        }   
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
                    <View style={styles.container}>
                        <Image 
                            source={require("@/assets/login.png")}
                            style={styles.illustration}
                        />

                        <Text style={styles.title}>Sign in</Text>
                        <Text style={styles.subtitle}>Access your account using your email and password.</Text>

                        <View style={styles.form}>
                            <Input 
                                placeholder="Email" 
                                keyboardType="email-address" 
                                onChangeText={setEmail}
                            />
                            <Input 
                                placeholder="Password" 
                                secureTextEntry 
                                onChangeText={setPassword}
                            />
                            <Button label="Login" onPress={handleSignIn}/>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDFDFD",
        padding: 32,
    },
    illustration: {
        width: "100%",
        height: 330,
        resizeMode: "contain",
        marginTop: 62,
    },
    title: {
        fontSize: 32,
        fontWeight: 900,
    },
    subtitle: {
        fontSize: 16,
    },
    form: {
        marginTop: 24,
        gap: 16,
    },
    footerText: {
        textAlign: "center",
        marginTop: 24,
        color: "#585860",
    },
    footerLink: {
        color: "#032ad7",
        fontWeight: 700,
    }
}) 