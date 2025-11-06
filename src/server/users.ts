"use server"

import { db } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getUsers = async () => {
    try {
        const users = await db.query.user.findMany()
        return users
    } catch {
        console.log("Error")
    }
}

export const signInUser = async (email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password
            },
        })

        return { success: true, message: "Signed in successfully" }
    } catch (error) {
        const e = error as Error
        return { success: true, message: e.message || "Failed to sign in" }
    }
}


export const signUpUser = async (email: string, password: string, name: string) => {
    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name
            },
        })

        return { success: true, message: "Please check your email for verification" }
    } catch (error) {
        const e = error as Error
        return { success: true, message: e.message || "Failed to sign up" }
    }
}

export async function signOutUser() {
    try {
        await auth.api.signOut({
            headers: await headers()
        })

        return { success: true, message: "Logged out" };
    } catch (error) {
        const e = error as Error;
        return { success: false, message: e.message || "Failed to log out" };
    }
}