import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from "zod";
import styles from '../globalStyle';
import signInWithEmail from '../lib/authSign';
import supabase from '../lib/supabase';

// Zod Schema for Signing in
const zodSignIn = z.object({
  email: z.email("Please input your email"),
  password: z.string("Please input your password").min(1, "Please input your password"),
});
export type zodSignInType = z.infer<typeof zodSignIn>;

// Page Code
export default function Index() {
  const route = useRouter();
  const [loading, isLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // This ensures that if you become signed in you move to the signed in pages
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) route.replace("/protected/home");

    });
    return () => data.subscription.unsubscribe();
  }, [route]);

  async function doSignInEmail(data: zodSignInType) {
    const response = await signInWithEmail(data);
    if (response) {
      console.log(response);
      isLoading(false);
      setMessage("We don't see a user with that email and password");
    }
  }




  // This is react hook form for Zod
  const { register, handleSubmit, control, formState: {errors}} = useForm<zodSignInType>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(zodSignIn),
  });

  return (
        <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.h1}>Welcome to App!</Text>
            <Text style={styles.p}>Sign In here</Text>
          </View>
          <View style={styles.inputsContainer}>
            <Controller
                name="email"
                control={control}
                render={({ field: {onChange, value, onBlur}}) => (
                    <TextInput style={styles.textInput} placeholder="Email" onChangeText={onChange} value={value} onBlur={onBlur}/>
                    
                )}
            />
            {errors.email?.message && <Text>{errors.email.message }</Text>}
            <Controller
                name="password"
                control={control}
                render={({ field: {onChange, value, onBlur}}) => (
                    <TextInput style={styles.textInput}  secureTextEntry={true} placeholder="Password" onChangeText={onChange} value={value} onBlur={onBlur}/>
                    
                )}
            />
            {errors.password?.message && <Text>{errors.password.message }</Text>}
            {message && <Text style={styles.p}>{message}</Text>}
          </View>
          <View style={styles.inputsContainer}>
            <Pressable
              style={styles.submit}
              onPress={handleSubmit((data) => {
                isLoading(true);
                setMessage("");
                doSignInEmail(data);
              })}
              >
              {loading ? <ActivityIndicator size="large" /> : <Text style={styles.h1} >Sign In</Text>}
            </Pressable>
            <Pressable
              onPress={() => {
                route.navigate("/(signup)/signup")
              }}
            >
              <Text style={styles.p}>Click here to go to Sign Up</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  );
}