
// Recipe interface for AI-generated recipes
export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  description: string;
  instructions: string[];
  cookingTime: string;
  servings: number;
  vector: number[]; // Dummy vector for compatibility
}

// This file now serves as a type definition only
// All recipes are dynamically generated using OpenAI API
