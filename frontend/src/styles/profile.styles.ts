import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F2F2F7"
    },
    container: { flex: 1 },
    content: { padding: 20 },
    section: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 16,
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#1C1C1E"
    },
    inputGroup: { marginBottom: 15 },
    label: { fontSize: 13, fontWeight: "600", color: "#8E8E93", marginBottom: 5 },
    input: {
        backgroundColor: "#F2F2F7",
        padding: 12,
        borderRadius: 10,
        fontSize: 16
    },
    primaryButton: {
        backgroundColor: "#007AFF",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10
    },
    primaryButtonText: { color: "#FFF", fontWeight: "700" },
    secondaryButton: {
        borderWidth: 1,
        borderColor: "#E5E5EA",
        padding: 14,
        borderRadius: 12,
        alignItems: "center"
    },
    secondaryButtonText: { color: "#007AFF", fontWeight: "600" },
    logoutButton: { padding: 20, alignItems: "center" },
    logoutText: { color: "#FF3B30", fontWeight: "700" },
    divider: {
        height: 1,
        backgroundColor: '#E5E5E5',
        width: '100%',
        marginVertical: 20
    },
    deleteButton: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FF3B30',
        borderRadius: 8,
    },
    deleteText: {
        color: '#FF3B30',
        fontWeight: '600',
        fontSize: 16,
    },
});