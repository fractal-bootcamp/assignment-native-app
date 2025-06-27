import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

// Dummy recipe data
const dummyRecipes = [
    { id: 1, title: 'Spaghetti Carbonara', category: 'Italian' },
    { id: 2, title: 'Chicken Tikka Masala', category: 'Indian' },
    { id: 3, title: 'Caesar Salad', category: 'Salad' },
    { id: 4, title: 'Chocolate Chip Cookies', category: 'Dessert' },
    { id: 5, title: 'Beef Stir Fry', category: 'Asian' },
    { id: 6, title: 'Margherita Pizza', category: 'Italian' },
    { id: 7, title: 'Fish Tacos', category: 'Mexican' },
    { id: 8, title: 'Greek Yogurt Parfait', category: 'Breakfast' },
];

export default function CustomDrawerContent(props: any) {
    const colorScheme = useColorScheme();
    const router = useRouter();

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
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Saved Recipes
                </ThemedText>
                <Link href="/" asChild>
                    <TouchableOpacity>
                        <ThemedText>New Recipe</ThemedText>
                    </TouchableOpacity>
                </Link>
                <Link href="/signin" asChild>
                    <TouchableOpacity>
                        <ThemedText>Sign In</ThemedText>
                    </TouchableOpacity>
                </Link>

                <ScrollView style={styles.recipeList}>
                    {dummyRecipes.map((recipe) => (
                        <TouchableOpacity
                            key={recipe.id}
                            style={[
                                styles.recipeItem,
                                {
                                    borderBottomColor: Colors[colorScheme ?? 'light'].tabIconDefault,
                                }
                            ]}
                            onPress={() => {
                                router.push('/recipe');
                            }}
                        >
                            <ThemedText style={styles.recipeTitle}>{recipe.title}</ThemedText>
                            <ThemedText style={styles.recipeCategory}>{recipe.category}</ThemedText>
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