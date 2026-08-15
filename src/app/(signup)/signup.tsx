import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from "zod";
import styles from '../globalStyle';
import { signUp } from '../lib/authSign';
import supabase from '../lib/supabase';

// Zod Schema for Signing in
const zodSignUp = z.object({

    firstName: z.string("Please input your first Name").min(3, "Please input your first name"),
    lastName: z.string("Please input your last name").min(3, "Please input your last name"),
    email: z.email("Please input your email"),
    password: z.string("Please input your password").min(8, "Your password must be at least 8 characters long"),
    confirmPassword: z.string("Please input your password again")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});
export type zodSignUpType = z.infer<typeof zodSignUp>;

// Page Code
export default function SingUp() {
    const route = useRouter();
    const [loading, isLoading] = useState<boolean>(false)


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
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.h1}>Welcome to App!</Text>
                <Text style={styles.p}>Sign Up here</Text>
            </View>
            <View style={styles.inputsContainer}>
                <Controller
                    name="firstName"
                    control={control}
                    render={({ field: {onChange, value, onBlur}}) => (
                        <TextInput style={styles.textInput} placeholder="First Name" onChangeText={onChange} value={value} onBlur={onBlur}/>
                        
                    )}
                />
                {errors.firstName?.message && <Text style={styles.p}>{errors.firstName.message }</Text>}
                <Controller
                    name="lastName"
                    control={control}
                    render={({ field: {onChange, value, onBlur}}) => (
                        <TextInput style={styles.textInput} placeholder="Last Name" onChangeText={onChange} value={value} onBlur={onBlur}/>
                        
                    )}
                />
                {errors.lastName?.message && <Text style={styles.p}>{errors.lastName.message }</Text>}
                <Controller
                    name="email"
                    control={control}
                    render={({ field: {onChange, value, onBlur}}) => (
                        <TextInput style={styles.textInput} placeholder="Email" onChangeText={onChange} value={value} onBlur={onBlur}/>
                        
                    )}
                />
                {errors.email?.message && <Text style={styles.p}>{errors.email.message }</Text>}
                <Controller
                    name="password"
                    control={control}
                    render={({ field: {onChange, value, onBlur}}) => (
                        <TextInput style={styles.textInput} placeholder="Password" onChangeText={onChange} value={value} onBlur={onBlur}/>
                        
                    )}
                />
                {errors.password?.message && <Text style={styles.p}>{errors.password.message }</Text>}
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field: {onChange, value, onBlur}}) => (
                        <TextInput style={styles.textInput} placeholder="Confirm Password" onChangeText={onChange} value={value} onBlur={onBlur}/>
                        
                    )}
                />
                {errors.confirmPassword?.message && <Text style={styles.p}>{errors.confirmPassword.message }</Text>}
            </View>
            <View style={styles.inputsContainer}>
                <Pressable
                    style={styles.submit}
                    onPress={handleSubmit((data) => {
                        isLoading(true);
                        signUp(data);
                    })}
                    >
                    {loading ? <ActivityIndicator size="large" /> : <Text style={styles.h1} >Sign Up</Text>}
                </Pressable>
                <Pressable
                    onPress={() => {
                        route.navigate("/")
                    }}
                    >
                    <Text style={styles.p} >Click here to go to Sign In</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
