'use client';

import { TText } from '@/components/ThemedText';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import { useTRPC } from '../lib/trpc/trpc';
import type { Ingredient, Instruction, Recipe } from '../schema';
import { Timer } from './Timer';

interface RecipeDisplayProps {
    recipe: Recipe;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
    const trpc = useTRPC();
    const deleteRecipeMutation = useMutation(trpc.recipes.delete.mutationOptions());
    const [hoveredIngredient, setHoveredIngredient] = useState<string | null>(null);

    const handleDelete = () => {
        Alert.alert(
            'Delete Recipe',
            'Are you sure you want to delete this recipe?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteRecipeMutation.mutate({ id: recipe.id })
                }
            ]
        );
    };

    return (
        <ScrollView className="flex-1 p-4 bg-[#f5efe9]" showsVerticalScrollIndicator={false}>
            <View className="flex-row justify-between items-center mb-6 ">
                <TText className="text-4xl font-[PlayfairDisplay-Bold] text-[#2c3e50] flex-1 mr-4">{recipe.name}</TText>
                <TouchableOpacity
                    onPress={handleDelete}
                    disabled={deleteRecipeMutation.isPending}
                    className={`p-3 bg-red-50 rounded-lg border border-red-200 ${deleteRecipeMutation.isPending ? 'opacity-50' : ''}`}
                >
                    <TText className="text-xl">🗑️</TText>
                </TouchableOpacity>
            </View>

            <View className="bg-white p-5 rounded-xl mb-4 shadow-sm border border-[#e8d5c4]">
                <TText className="text-2xl font-[PlayfairDisplay-Bold] mb-4">Ingredients</TText>
                <View className="space-y-2">
                    {recipe.data.ingredients.map((ingredient: Ingredient, index: number) => (
                        <View key={index} className="pl-2">
                            <TText className="text-base text-[#4a5568] leading-6">
                                • {ingredient.amount} {ingredient.unit} {ingredient.name}
                            </TText>
                        </View>
                    ))}
                </View>
            </View>

            <View className="bg-white p-5 rounded-xl mb-4 shadow-sm border border-[#e8d5c4]">
                <TText type="subtitle" className="text-2xl font-[PlayfairDisplay-Bold] mb-4 text-[#2c3e50]">Instructions</TText>
                <View className="space-y-6">
                    {recipe.data.instructions.map((instruction: Instruction, index: number) => (
                        <View key={index} className="space-y-3">
                            <View className="flex-row items-start space-x-3">
                                <View className="w-7 h-7 m-2 bg-blue-500 justify-center items-center mt-0.5 rounded-full">
                                    <TText type="defaultSemiBold" className="text-white text-sm font-bold">{index + 1}</TText>
                                </View>
                                <TText className="text-base text-[#4a5568] leading-6 flex-1">
                                    {instruction.description}
                                </TText>
                            </View>
                            {instruction.timer && (
                                <Timer
                                    minutes={instruction.timer}
                                    instructionIndex={index}
                                />
                            )}
                            {instruction.relatedIngredientNames.length > 0 && (
                                <View className="mt-2 space-y-2">
                                    <TText className="text-sm text-[#718096]">🥄 Using:</TText>
                                    <View className="flex-row flex-wrap space-x-2 space-y-1">
                                        {instruction.relatedIngredientNames.map((ingredientName: string, i: number) => {
                                            const ingredient = recipe.data.ingredients.find(
                                                (ing: Ingredient) => ing.name.toLowerCase() === ingredientName.toLowerCase()
                                            );
                                            const isHovered = hoveredIngredient === `${instruction.description}-${ingredientName}-${i}`;

                                            return (
                                                <Pressable
                                                    key={i}
                                                    onPressIn={() => setHoveredIngredient(`${instruction.description}-${ingredientName}-${i}`)}
                                                    className="relative"
                                                >
                                                    <TText className="text-sm text-[#a8c4d9] bg-[#f8f9fa] px-2 py-1 rounded-full border border-[#e8d5c4]">
                                                        {ingredientName}
                                                    </TText>
                                                    {ingredient && isHovered && (
                                                        <View className="absolute -top-8 left-1/2 bg-[#2c3e50] px-2 py-1 rounded z-10">
                                                            <TText className="text-white text-xs">
                                                                {ingredient.amount} {ingredient.unit}
                                                            </TText>
                                                        </View>
                                                    )}
                                                </Pressable>
                                            );
                                        })}
                                    </View>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
} 