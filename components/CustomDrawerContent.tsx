import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { authClient } from '@/lib/auth-client';
import { useTRPC } from '@/lib/trpc/trpc';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useQuery } from '@tanstack/react-query';
import { Link, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';


export default function CustomDrawerContent(props: any) {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const { data: session, isPending: sessionLoading } = authClient.useSession();
    const trpc = useTRPC(); // use `import { trpc } from './utils/trpc'` if you're using the singleton pattern
    const { data: recipeData, isLoading: recipeLoading, error: recipeError } = useQuery(trpc.recipes.list.queryOptions());

    useEffect(() => {
        if (recipeError) {
            console.error(recipeError);
        } else {
            console.log(recipeData);
        }
    }, [recipeError, recipeData]);

    return (
        <DrawerContentScrollView {...props}>
            <ThemedView style={styles.drawerHeader}>
                <ThemedText type="title" style={styles.headerTitle}>
                    Little Chef
                </ThemedText>
                <ThemedText type="subtitle" style={styles.headerSubtitle}>
                    Recipe Collection
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.section}>
                <Link href="/" asChild>
                    <TouchableOpacity>
                        <ThemedText>+</ThemedText>
                    </TouchableOpacity>
                </Link>
                {session && !session.user && <Link href="/signin" asChild>
                    <TouchableOpacity>
                        <ThemedText>Sign In</ThemedText>
                    </TouchableOpacity>
                </Link>}

                <ScrollView style={styles.recipeList}>
                    {(recipeData?.recipes ?? []).map((recipe) => (
                        <TouchableOpacity
                            key={recipe.id}
                            style={[
                                styles.recipeItem,
                                {
                                    borderBottomColor: Colors[colorScheme ?? 'light'].tabIconDefault,
                                }
                            ]}
                            onPress={() => {
                                router.push(`/recipe/${recipe.id}`);
                            }}
                        >
                            <ThemedText style={styles.recipeTitle}>{recipe.name}</ThemedText>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </ThemedView>

            <ThemedView style={styles.divider} />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    drawerHeader: {
        padding: 20,
        paddingTop: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        opacity: 0.7,
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    recipeList: {
        maxHeight: 300,
    },
    recipeItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    recipeTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 2,
    },
    recipeCategory: {
        fontSize: 12,
        opacity: 0.6,
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 10,
    },
}); 