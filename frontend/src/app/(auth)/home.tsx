import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "@/styles/globalStyles";

export default function Home() {
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
                    <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={globalStyles.title}>HOME</Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}