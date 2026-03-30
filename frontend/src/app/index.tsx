import { View, Text, StyleSheet, Image, ScrollView} from "react-native"

import { Input } from "@/components/Input"
import { Button } from "@/components/Button"

export default function Index() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image 
                    source={require("@/assets/login.png")}
                    style={styles.illustration}
                />

                <Text style={styles.title}>Sign in</Text>
                <Text style={styles.subtitle}>Access your account using your email and password.</Text>

                <View style={styles.form}>
                    <Input placeholder="Email" keyboardType="email-address" />
                    <Input placeholder="Password" secureTextEntry />
                    <Button label="Login"></Button>
                </View>

                <Text style={styles.footerText}>
                    Don't have an account? Register here.
                </Text>
            </View>
        </ScrollView>
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
    }
}) 