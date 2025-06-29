export interface Ingredient {
    name: string;
    amount: string;
    unit: string;
}

export interface Instruction {
    description: string;
    timer?: number;
    relatedIngredientNames: string[];
}

export interface RecipeData {
    ingredients: Ingredient[];
    instructions: Instruction[];
}

export interface Recipe {
    id: string;
    name: string;
    data: RecipeData;
} 