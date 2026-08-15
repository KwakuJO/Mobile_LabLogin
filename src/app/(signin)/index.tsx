import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as z from "zod";
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

  // This ensures that if you become signed in you move to the signed in pages
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) route.replace("/protected/home");

    });
    return () => data.subscription.unsubscribe();
  }, [route]);

  // This is react hook form for Zod
  const { register, handleSubmit, control, formState: {errors}} = useForm<zodSignInType>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(zodSignIn),
  });

  return (
        <View style={styles.container}>
            <Controller
                name="email"
                control={control}
                render={({ field: {onChange, value, onBlur}}) => (
                    <TextInput placeholder="Email" onChangeText={onChange} value={value} onBlur={onBlur}/>
                    
                )}
            />
            {errors.email?.message && <Text>{errors.email.message }</Text>}
            <Controller
                name="password"
                control={control}
                render={({ field: {onChange, value, onBlur}}) => (
                    <TextInput placeholder="Password" onChangeText={onChange} value={value} onBlur={onBlur}/>
                    
                )}
            />
            {errors.password?.message && <Text>{errors.password.message }</Text>}
            <Pressable
                onPress={handleSubmit((data) => {
                  signInWithEmail(data);
                })}
                >
                <Text>Sign In</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                route.navigate("/(signup)/signup")
              }}
            >
              <Text>Sign Up</Text>
            </Pressable>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
