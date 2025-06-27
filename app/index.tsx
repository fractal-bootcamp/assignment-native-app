import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function Index() {
    const [recipePrompt, setRecipePrompt] = useState('');
    const colorScheme = useColorScheme();

    const handleGenerateRecipe = () => {
        // TODO: Implement AI recipe generation
        console.log('Generating recipe for:', recipePrompt);
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.header}>
                <ThemedText type="title">Little Chef</ThemedText>
                <ThemedText type="subtitle">Your AI-powered recipe assistant!</ThemedText>
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
}); 