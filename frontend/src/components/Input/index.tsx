import { TextInput, TextInputProps, View, Text } from "react-native";
import { Controller, UseControllerProps } from "react-hook-form";
import { forwardRef } from "react";
import { styles } from "./styles";

type Props = {
    formProps: any;
    inputProps: TextInputProps;
    error?: string;
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
                        style={[
                            styles.input,
                            error ? styles.inputError : null
                        ]} 
                        {...inputProps} 
                    />
                    {
                    error.length > 0 &&
                        <Text style={styles.error}>
                            {error}
                        </Text>
                    }
                </View>
            )}
            { ...formProps }
        />
    );
});

export { Input };