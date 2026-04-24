import { TextInput, StyleSheet, TextInputProps, View, Text } from "react-native";
import { Controller, UseControllerProps } from "react-hook-form";
import { globalStyles } from "../styles/globalStyles";
import { forwardRef } from "react";

type Props = {
    formProps: UseControllerProps;
    inputProps: TextInputProps;
    error: string;
}

const Input = forwardRef<TextInput, Props> (({ formProps, inputProps, error = ''}, ref) => {
    return (
        <Controller 
            render={({ field }) => (
                <View>
                    <TextInput 
                        ref={ref}
                        value={field.value}
                        onChangeText={field.onChange}
                        style={styles.input} 
                        {...inputProps} 
                    />
                    {
                    error.length > 0 &&
                        <Text style={globalStyles.error}>
                            {error}
                        </Text>
                    }
                </View>
            )}
            { ...formProps }
        />
    );
});

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 48,
        borderWidth: 1,
        borderColor: "#DCDCDC",
        borderRadius: 8,
        fontSize: 16,
        paddingLeft: 12,
    },
})

export { Input };