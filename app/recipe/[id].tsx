import { ThemedText } from "@/components/ThemedText";
import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
export default function RecipePage() {
    const trpc = useTRPC();
    const id = useLocalSearchParams<{ id: string }>().id
    const { data: recipeResult, isLoading } = useQuery(trpc.recipes.get.queryOptions({ id }));
    if (isLoading) {
        return <ThemedText>Loading...</ThemedText>;
    }
    if (!recipeResult) {
        return <ThemedText>Recipe not found</ThemedText>;
    }
    return <Text className="text-2xl font-bold text-cyan-200">{recipeResult.recipe.name}</Text>;
} 