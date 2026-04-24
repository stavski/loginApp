import { View, Text, Image, ScrollView, KeyboardAvoidingView, Platform} from "react-native"

import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/globalStyles";
import { useForm } from "react-hook-form";

export default function Signup() {
    const {control} = useForm();

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
                            style={globalStyles.illustration}
                        />

                        <Text style={globalStyles.title}>Sign Up</Text>
                        <Text style={globalStyles.subtitle}>Create your account to gain access.</Text>

                        <View style={globalStyles.form}>
                            <Input 
                                formProps={{
                                    name: 'name',
                                    control
                                }}
                                inputProps={{ 
                                    placeholder: 'Name',
                                }}
                            />
                            <Input 
                                formProps={{
                                    name: 'email',
                                    control
                                }}
                                inputProps={{ 
                                    placeholder: 'E-mail',
                                    keyboardType: "email-address" 
                                }}
                            />
                            <Input 
                                formProps={{
                                    name: 'password',
                                    control,
                                }}
                                inputProps={{ 
                                    placeholder: 'Password', 
                                    secureTextEntry: true
                                }}
                            />
                            <Input 
                                formProps={{
                                    name: 'confirmPassword',
                                    control,
                                }}
                                inputProps={{ 
                                    placeholder: 'Confirm Password', 
                                    secureTextEntry: true
                                }}
                            />
                            <Button label="Create"></Button>
                        </View>

                        <Text style={globalStyles.footerText}>
                            Already have an account? {" "}
                            <Link 
                                href="/"
                                style={globalStyles.footerLink}
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