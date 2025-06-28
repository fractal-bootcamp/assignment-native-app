import { initTRPC } from '@trpc/server';
import { z } from 'zod';

/**
 * We are doing something very weird here.
 * 
 * In order to create a TRPC client, we need a router type, AppRouter, to determine
 * the functions and inputs and outputs that are available. We do not need a copy of the 
 * server-side router, but we do need the type definition, AppRouter, that it creates.
 * 
 * The easiest way to do this in your own project is to have your next.js project and this native app
 * in the same repo. Then you can just import the AppRouter type from the next.js project.
 * 
 * This file would normally live in your next.js project. However, I do not want to have a next.js 
 * project for this assignment, so we are just going to create a copy of the AppRouter type. 
 * Notice that there is no implementation of the procedures here, because the actual implementation
 * of this lives inside of my next.js project.
 * 
 * It is very important that you do not import actual objects from your server, just the type, like so:
 * import { type AppRouter } from './trpc-router';
 * 
 * If you import actual objects, you will be importing your server implementation into your client!
 * But if you only import the type, the bundler will correctly include only the type definition, and no
 * part of the server will be imported.
 */
const t = initTRPC.create();

const recipeDataSchema = z.object({
  ingredients: z.array(z.object({
    name: z.string(),
    amount: z.string(),
    unit: z.string(),
  })),
  instructions: z.array(z.object({
    description: z.string(),
    timer: z.number().optional(),
    relatedIngredientNames: z.array(z.string()),
  })),
});

const recipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  data: recipeDataSchema,
});

const createRecipeSchema = z.object({
  name: z.string(),
  data: recipeDataSchema,
});

export const recipesRouter = t.router({
  // Get all recipes for the authenticated user
  list: t.procedure
    .output(z.object({ recipes: z.array(recipeSchema) }))
    .query(async ({ ctx }) => { return { recipes: [] } }),

  // Get a single recipe by ID
  get: t.procedure
    .input(z.object({ id: z.string() }))
    .output(z.object({ recipe: recipeSchema.optional() }))
    .query(async ({ ctx, input }) => { return { recipe: undefined } }),

  // Create a new recipe manually
  create: t.procedure
    .input(createRecipeSchema)
    .mutation(async ({ ctx, input }) => { }),

  // Generate a recipe from text description
  generate: t.procedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => { }),

  // Delete a recipe
  delete: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => { }),
});
const appRouter = t.router({
  recipes: recipesRouter,
});
export type AppRouter = typeof appRouter;