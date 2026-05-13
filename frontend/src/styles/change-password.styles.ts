import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    backButton: { marginTop: 40, marginBottom: 20 },
    backText: { color: '#007AFF', fontSize: 16 },
    title: { fontSize: 28, fontWeight: 'bold' },
    subtitle: { color: '#666', marginBottom: 30 },
    form: { gap: 15 },
    input: {
        height: 50,
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16
    },
    mainButton: {
        backgroundColor: '#007AFF',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    mainButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});