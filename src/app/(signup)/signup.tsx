import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as z from "zod";
import { signUp } from '../lib/authSign';
import supabase from '../lib/supabase';

// Zod Schema for Signing in
const zodSignUp = z.object({

    firstName: z.string("Please input your first Name").min(3, "Your first name isn't longer than 2 letters?"),
    lastName: z.string("Please input your last name").min(3, "Your last name isn't longer than 2 letters?"),
    email: z.email("Please input your email"),
    password: z.string("Please input your password").min(8, "Your password must be atleast 8 characters long"),
    confirmPassword: z.string("Please input your password again")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});
export type zodSignUpType = z.infer<typeof zodSignUp>;

// Page Code
export default function SingUp() {
    const route = useRouter();

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) route.replace("/protected/home");

        });
        return () => data.subscription.unsubscribe();
    }, [route]);

    // This is react hook form for Zod
    const { handleSubmit, control, formState: { errors } } = useForm<zodSignUpType>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",

        },
        resolver: zodResolver(zodSignUp),
    });

    return (
        <View style={styles.container}>
            <Controller
                name="firstName"
                control={control}
                render={({ field: {onChange, value, onBlur}}) => (
                    <TextInput placeholder="First Name" onChangeText={onChange} value={value} onBlur={onBlur}/>
                    
                )}
            />
            {errors.firstName?.message && <Text>{errors.firstName.message }</Text>}
            <Controller
                name="lastName"
                control={control}
                render={({ field: {onChange, value, onBlur}}) => (
                    <TextInput placeholder="Last Name" onChangeText={onChange} value={value} onBlur={onBlur}/>
                    
                )}
            />
            {errors.lastName?.message && <Text>{errors.lastName.message }</Text>}
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
            <Controller
                name="confirmPassword"
                control={control}
                render={({ field: {onChange, value, onBlur}}) => (
                    <TextInput placeholder="Confirm Password" onChangeText={onChange} value={value} onBlur={onBlur}/>
                    
                )}
            />
            {errors.confirmPassword?.message && <Text>{errors.confirmPassword.message }</Text>}
            <Pressable
                onPress={handleSubmit((data) => {
                    signUp(data);
                })}
                >
                <Text>Sign Up</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                route.navigate("/")
              }}
            >
              <Text>Sign In</Text>
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
