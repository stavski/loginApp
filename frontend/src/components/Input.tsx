import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { Controller, UseControllerProps } from "react-hook-form";
import { forwardRef } from "react";

type Props = {
    formProps: UseControllerProps;
    inputProps: TextInputProps;
}

const Input = forwardRef<TextInput, Props> (({ formProps, inputProps}, ref) => {
    return (
        <Controller 
            render={({ field }) => (
                <TextInput 
                    ref={ref}
                    value={field.value}
                    onChangeText={field.onChange}
                    style={styles.input} 
                    {...inputProps} />
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