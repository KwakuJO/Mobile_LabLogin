import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { signOut } from "../lib/authSign";
import supabase from "../lib/supabase";

export default function home() {
    const route = useRouter();
  
    // This checks if the user is signed in, and if they aren't they can't be here!
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            // console.log(data);
            if (!data.user) {
                route.replace("/");
            } 
        });
    }, [route]);

    return (
        <View> 
            <Text>Protected Page</Text>
            <Pressable
                onPress={() => {
                    signOut()
                    route.replace("/")
                }}
            >
                <Text>Sign Out</Text>
            </Pressable>
        </View>
    )
}
