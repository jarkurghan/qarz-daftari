import { Pressable, ActivityIndicator } from "react-native";
import globalStyles from "../../styles/style";

export default function Button({ children, loading = false, handleClick }) {

    return (
        <Pressable style={globalStyles.button} onPress={handleClick}>
            {loading ?
                <ActivityIndicator color="#fff" size="small" /> :
                children}
        </Pressable>
    )
}
