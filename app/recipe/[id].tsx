import { RecipeDisplay } from "@/components/RecipeDisplay";
import { TText } from "@/components/ThemedText";
import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
export default function RecipePage() {
    const trpc = useTRPC();
    const id = useLocalSearchParams<{ id: string }>().id
    const { data: recipeResult, isLoading } = useQuery(trpc.recipes.get.queryOptions({ id }));
    if (isLoading) {
        return <TText>Loading...</TText>;
    }
    if (!recipeResult) {
        return <TText>Recipe not found</TText>;
    }
    return <RecipeDisplay recipe={recipeResult.recipe} />;
} 