import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: "https://little-chef-nu.vercel.app", // Base URL of your Better Auth backend
    plugins: [
        expoClient({
            scheme: "assignmentnativeapp",
            storagePrefix: "assignmentnativeapp",
            storage: SecureStore,
        })
    ]
}); 