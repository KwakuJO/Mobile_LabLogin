import { zodSignInType } from "../(signin)";
import { zodSignUpType } from "../(signup)/signup";
import supabase from "./supabase";

// Sign In with Email function
async function signInEmail(zData: zodSignInType) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: zData.email,
        password: zData.password
    });
}

// Sign Out overall
async function signOutAll() {
    const {error} = await supabase.auth.signOut();
    
    if (error) {
        console.error("Issue signing out: " + error.message);
    } else {
        console.log("signing out");

    }
}

// Sign Up with Email
async function signUpEmail(zData: zodSignUpType) {
    const { data, error } = await supabase.auth.signUp({
        email: zData.email,
        password: zData.password,
        options: {
            data: {
                first_name: zData.firstName,
                last_name: zData.lastName,
            }
        }
    })
}

export default function signInWithEmail(zData: zodSignInType) {
    const value = signInEmail(zData);
}
export function signOut() {
    signOutAll();
}
export function signUp(zData: zodSignUpType) {
    signUpEmail(zData);
}


