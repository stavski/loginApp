import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    menuButton: {
        marginRight: 15,
        padding: 5,
    },
    welcome: {
        fontSize: 18,
        color: "#8E8E93",
    },
    userName: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1C1C1E",
        marginTop: 5,
    },
    filterContainer: { padding: 15, backgroundColor: '#fff' },
    filterInput: {
        height: 40,
        backgroundColor: '#F3F3F3',
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    userCard: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff'
    },
    userNameInList: { fontSize: 16, fontWeight: 'bold' },
    userEmailInList: { color: '#666' },
    headerContainer: {
        padding: 20,
        backgroundColor: '#fff',
        width: '100%',
    },
    welcomeSection: {
        marginBottom: 20,
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        marginLeft: 8,
        fontSize: 16,
    },
});