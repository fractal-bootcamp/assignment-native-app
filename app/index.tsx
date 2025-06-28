import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { authClient } from '@/lib/auth-client';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Index() {
    const [recipePrompt, setRecipePrompt] = useState('');
    const colorScheme = useColorScheme();
    const { data: session, isPending: sessionLoading } = authClient.useSession();

    useEffect(() => {
        if (!sessionLoading && !session) {
            router.replace('/signin');
        }
    }, [session, sessionLoading]);

    const handleGenerateRecipe = () => {
        // TODO: Implement AI recipe generation
        console.log('Generating recipe for:', recipePrompt);
    };

    const handleSignOut = async () => {
        await authClient.signOut();
        router.replace('/signin');
    };

    if (sessionLoading) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText>Loading...</ThemedText>
            </ThemedView>
        );
    }

    if (!session) {
        return null; // Will redirect to signin
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.header}>
                <Text className="text-xl font-bold text-blue-500">Little Chef</Text>
                <ThemedText type="subtitle">Your AI-powered recipe assistant!</ThemedText>
                <ThemedText style={styles.welcomeText}>Welcome, {session.user?.name || session.user?.email}!</ThemedText>
            </ThemedView>

            <ThemedView style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.textInput,
                        {
                            backgroundColor: Colors[colorScheme ?? 'light'].background,
                            color: Colors[colorScheme ?? 'light'].text,
                            borderColor: Colors[colorScheme ?? 'light'].tint,
                        }
                    ]}
                    placeholder="Describe what you want to cook..."
                    placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
                    value={recipePrompt}
                    onChangeText={setRecipePrompt}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                />

                <TouchableOpacity
                    style={[
                        styles.generateButton
                    ]}
                    onPress={handleGenerateRecipe}
                >
                    <ThemedText style={styles.buttonText}>Generate Recipe</ThemedText>
                </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.placeholder}>
                <ThemedText type="subtitle">Your generated recipe will appear here</ThemedText>
                <ThemedText>Open the drawer to see your saved recipes</ThemedText>
            </ThemedView>

            <TouchableOpacity
                style={styles.signOutButton}
                onPress={handleSignOut}
            >
                <ThemedText style={styles.signOutButtonText}>Sign Out</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 40,
    },
    welcomeText: {
        marginTop: 8,
        fontSize: 14,
        opacity: 0.7,
    },
    inputContainer: {
        gap: 16,
        marginBottom: 40,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        minHeight: 120,
    },
    generateButton: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.6,
    },
    signOutButton: {
        position: 'absolute',
        top: 60,
        right: 20,
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#FF3B30',
    },
    signOutButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
}); 