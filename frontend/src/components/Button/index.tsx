import { 
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
 } from "react-native";

 import { styles } from "./styles";

type ButtonProps = TouchableOpacityProps & {
    label: string,
}

 export function Button({ label, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
 }