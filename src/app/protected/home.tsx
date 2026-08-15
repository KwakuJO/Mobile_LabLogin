import { User } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "../components/SignOutButton";
import styles from '../globalStyle';
import supabase from "../lib/supabase";

interface dataInterface {
    data: User | null;
}


export default function home() {
    const route = useRouter(); 
    const [data, setData] = useState<User | null>(null);

    // This checks if the user is signed in, and if they aren't they can't be here!
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            // console.log(data);
            if (!data.user) {
                route.replace("/");
            } else {
                setData(data.user);
            }
        });
    }, [route]);


    if (data == null) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loading}>
                    <ActivityIndicator size="large"/>
                </View>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.h1}>
                    Welcome to the protected page!     
                </Text>

                <Text style={styles.p}>
                    You should only be able to see this page after signing in
                </Text>
                <Text style={styles.p}>
                    Click the sign out button to sign out (duhh)
                </Text>
            </View>
            <SignOutButton />
        </SafeAreaView>
    )
}
