import { TText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { authClient } from '@/lib/auth-client';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const colorScheme = useColorScheme();

    const handleEmailSignIn = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            await authClient.signIn.email({
                email,
                password,
            });
            router.replace('/');
        } catch (error) {
            console.error("err", error);
            Alert.alert('Error', 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            console.log("email email:", typeof authClient.signUp.email);
            await authClient.signUp.email({
                email,
                name: email,
                password,
            });
            Alert.alert('Success', 'Account created successfully! Please sign in.');
        } catch (error) {
            console.error("err", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TText type="title">Welcome to Little Chef</TText>
                <TText type="subtitle">Sign in to get started</TText>
            </View>

            <View style={styles.form}>
                <TextInput
                    style={[
                        styles.textInput,
                        {
                            backgroundColor: Colors[colorScheme ?? 'light'].background,
                            color: Colors[colorScheme ?? 'light'].text,
                            borderColor: Colors[colorScheme ?? 'light'].tint,
                        }
                    ]}
                    placeholder="Email"
                    placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={[
                        styles.textInput,
                        {
                            backgroundColor: Colors[colorScheme ?? 'light'].background,
                            color: Colors[colorScheme ?? 'light'].text,
                            borderColor: Colors[colorScheme ?? 'light'].tint,
                        }
                    ]}
                    placeholder="Password"
                    placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[styles.button, styles.primaryButton]}
                    onPress={handleEmailSignIn}
                    disabled={isLoading}
                >
                    <TText style={styles.buttonText}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </TText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={handleSignUp}
                    disabled={isLoading}
                >
                    <TText style={[styles.buttonText, styles.secondaryButtonText]}>
                        Create Account
                    </TText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 80,
        marginBottom: 40,
    },
    form: {
        gap: 16,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
    },
    button: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#007AFF',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    googleButton: {
        backgroundColor: '#4285F4',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButtonText: {
        color: '#007AFF',
    },
    googleButtonText: {
        color: 'white',
    },
    divider: {
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerText: {
        color: '#8E8E93',
        fontSize: 14,
    },
}); 