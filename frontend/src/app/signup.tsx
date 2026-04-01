import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform} from "react-native"

import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
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
                    <View style={styles.container}>
                        <Image 
                            source={require("@/assets/signup.png")}
                            style={styles.illustration}
                        />

                        <Text style={styles.title}>Sign Up</Text>
                        <Text style={styles.subtitle}>Create your account to gain access.</Text>

                        <View style={styles.form}>
                            <Input placeholder="Name" />
                            <Input placeholder="Email" keyboardType="email-address" />
                            <Input placeholder="Password" secureTextEntry />
                            <Input placeholder="Confirm Password" secureTextEntry />
                            <Button label="Create"></Button>
                        </View>

                        <Text style={styles.footerText}>
                            Already have an account? {" "}
                            <Link 
                                href="/"
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