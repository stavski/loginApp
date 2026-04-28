import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 48,
        borderWidth: 1,
        borderColor: "#DCDCDC",
        borderRadius: 8,
        fontSize: 16,
        paddingLeft: 12,
    },
    error: {
        fontSize: 14,
        marginTop: 7,
        color: "#DC1637"
    },
    inputError: {
        borderColor: "#DC1637",
        borderWidth: 1
    }
})