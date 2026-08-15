import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';
import styles from '../globalStyle';
import { signOut } from '../lib/authSign';


export default function SignOutButton() {
    const route = useRouter();

    return (
        <Pressable
            style = {styles.button}
            onPress={() => {
                signOut()
                route.replace("/")
            }}
        >
            <Text style = {styles.h1}>Sign Out</Text>
        </Pressable>
    )
}

