import { TText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { authClient } from '@/lib/auth-client';
import { useTRPC } from '@/lib/trpc/trpc';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

export default function Index() {
    const [recipePrompt, setRecipePrompt] = useState('');
    const colorScheme = useColorScheme();
    const trpc = useTRPC();
    const { data: session, isPending: sessionLoading } = authClient.useSession();
    const generateRecipeMutation = useMutation(trpc.recipes.generate.mutationOptions());

    useEffect(() => {
        if (!sessionLoading && !session) {
            router.replace('/signin');
        }
    }, [session, sessionLoading]);

    const handleGenerateRecipe = () => {
        generateRecipeMutation.mutate({ text: recipePrompt }, {
            onSuccess: (data) => {
                router.push(`/recipe/${data.recipe.id}`);
            }
        });
    };

    const handleSignOut = async () => {
        await authClient.signOut();
        router.replace('/signin');
    };

    if (sessionLoading) {
        return (
            <View className="flex-1 p-5">
                <TText>Loading...</TText>
            </View>
        );
    }

    if (!session) {
        return null; // Will redirect to signin
    }

    return (
        <View className="flex-1 p-5 bg-[#f5efe9]">
            <View className="items-center mt-15 mb-10">
                <TText className="text-4xl">Little Chef</TText>
                <TText className="font-semibold">Your AI-powered recipe assistant!</TText>
                <TText className="mt-2 text-sm opacity-70">Welcome, {session.user?.name || session.user?.email}!</TText>
            </View>

            <View className="gap-4 mb-10">
                <TextInput
                    className={`border rounded-xl p-4 text-base min-h-[120px]`}
                    placeholder="Describe what you want to cook..."
                    placeholderTextColor={colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'}
                    value={recipePrompt}
                    onChangeText={setRecipePrompt}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                />

                <TouchableOpacity
                    className="bg-blue-500 p-4 rounded-xl items-center"
                    onPress={handleGenerateRecipe}
                >
                    <TText className="text-white">Generate Recipe</TText>
                </TouchableOpacity>
            </View>

            <View className="flex-1 justify-center items-center opacity-60">
                <TText>Your generated recipe will appear here</TText>
                <TText>Open the drawer to see your saved recipes</TText>
            </View>

            <TouchableOpacity
                className="absolute top-15 right-5 p-2 rounded-lg bg-red-500"
                onPress={handleSignOut}
            >
                <TText type="defaultSemiBold" className="text-white text-sm font-medium">Sign Out</TText>
            </TouchableOpacity>
        </View>
    );
} 