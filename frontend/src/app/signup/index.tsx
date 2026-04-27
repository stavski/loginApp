import { View, Text, Image, ScrollView, KeyboardAvoidingView, Platform} from "react-native"

import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "@/styles/globalStyles";
import { styles } from "./styles";
import { useForm } from "react-hook-form";

export default function Signup() {
    const {control, handleSubmit, formState: {errors} } = useForm({});

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
                                }}
                            />
                            <Input 
                                error={errors.email?.message}
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
                                    keyboardType: "email-address" 
                                }}
                            />
                            <Input 
                                error={errors.password?.message}
                                formProps={{
                                    name: 'password',
                                    control,
                                    rules: {
                                        required: "Password is required",
                                    }
                                }}
                                inputProps={{ 
                                    placeholder: 'Password', 
                                    secureTextEntry: true
                                }}
                            />
                            <Input 
                                error={errors.confirmPassword?.message}
                                formProps={{
                                    name: 'confirmPassword',
                                    control,
                                    rules: {
                                        required: "Confirm Password is required",
                                    }
                                }}
                                inputProps={{ 
                                    placeholder: 'Confirm Password', 
                                    secureTextEntry: true
                                }}
                            />
                            <Button label="Create" onPress={handleSubmit(handleSignIn)}/>
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