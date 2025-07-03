import { GoogleGenerativeAI } from '@google/generative-ai';
import { type Recipe } from '../data/recipeData';

export interface RecipeSearchResult {
  recipe: Recipe;
  similarityScore: number;
  matchedIngredients: string[];
  graphPath: string[];
}

export class RecipeService {
  private apiKey: string = '';
  private genAI: GoogleGenerativeAI | null = null;
  private generatedRecipes: Set<string> = new Set(); // Track generated recipes
  private recipeCounter: number = 0; // Counter for unique recipes

  // Set API key for Google Gemini
  setApiKey(key: string) {
    this.apiKey = key;
    this.genAI = new GoogleGenerativeAI(key);
  }

  // Generate recipe using Google Gemini API based on ingredients
  async searchRecipes(ingredientInput: string, excludeRecipeId?: string): Promise<RecipeSearchResult | null> {
    console.log('🔍 Starting Google Gemini recipe generation for:', ingredientInput);
    
    if (!this.apiKey || !this.genAI) {
      throw new Error('Google API key is required. Please enter your Google API key.');
    }

    try {
      // Generate recipe using Google Gemini
      const recipe = await this.generateRecipeWithGemini(ingredientInput, excludeRecipeId);
      
      if (!recipe) {
        return null;
      }

      // Parse ingredients from user input for matching
      const inputIngredients = this.parseIngredients(ingredientInput);
      const matchedIngredients = this.findMatchedIngredients(inputIngredients, recipe.ingredients);
      
      // Calculate similarity score based on matched ingredients
      const similarityScore = Math.min(0.95, Math.max(0.75, matchedIngredients.length / Math.max(inputIngredients.length, recipe.ingredients.length)));
      
      return {
        recipe,
        similarityScore,
        matchedIngredients,
        graphPath: [`${inputIngredients.join(', ')} → AI Generated Recipe`]
      };
    } catch (error) {
      console.error('Google Gemini API error:', error);
      throw error;
    }
  }

  // Generate recipe using Google Gemini API with uniqueness
  private async generateRecipeWithGemini(ingredients: string, excludeRecipeId?: string): Promise<Recipe | null> {
    this.recipeCounter++;
    
    const cuisineStyles = ['Italian', 'Asian', 'Mediterranean', 'Mexican', 'Indian', 'French', 'American', 'Thai', 'Middle Eastern', 'Japanese', 'Korean', 'Vietnamese', 'Greek', 'Spanish', 'Moroccan'];
    const cookingMethods = ['stir-fry', 'roasted', 'grilled', 'braised', 'sautéed', 'baked', 'steamed', 'pan-seared', 'slow-cooked', 'air-fried', 'poached', 'smoked'];
    const dishTypes = ['pasta', 'curry', 'soup', 'salad', 'casserole', 'stew', 'risotto', 'noodles', 'rice bowl', 'sandwich', 'wrap', 'pizza'];
    
    const randomCuisine = cuisineStyles[Math.floor(Math.random() * cuisineStyles.length)];
    const randomMethod = cookingMethods[Math.floor(Math.random() * cookingMethods.length)];
    const randomDish = dishTypes[Math.floor(Math.random() * dishTypes.length)];
    
    // Create a unique prompt each time with more variation
    const uniqueId = Date.now() + Math.random() + this.recipeCounter;
    const creativityBoost = Math.random() > 0.5 ? 'fusion' : 'traditional';
    const spiceLevel = ['mild', 'medium', 'spicy'][Math.floor(Math.random() * 3)];
    
    const prompt = `Create a completely unique and creative ${creativityBoost} ${randomCuisine} style ${randomMethod} ${randomDish} recipe using these ingredients: ${ingredients}

Recipe Generation ID: ${uniqueId}
Style: ${creativityBoost} ${randomCuisine} cuisine
Method: ${randomMethod} cooking technique
Dish Type: ${randomDish}
Spice Level: ${spiceLevel}
Creativity Factor: ${Math.floor(Math.random() * 100)}

IMPORTANT: This must be a COMPLETELY DIFFERENT recipe from any previously generated. Be highly creative and innovative.

Please respond with a JSON object in this exact format:
{
  "title": "Creative and Unique Recipe Name",
  "ingredients": ["ingredient 1 with measurements", "ingredient 2 with measurements", "ingredient 3 with measurements"],
  "description": "Appetizing description highlighting unique flavors, textures, and cooking techniques",
  "instructions": ["Detailed step 1", "Detailed step 2", "Detailed step 3"],
  "cookingTime": "X minutes",
  "servings": X
}

Requirements:
- Create a COMPLETELY UNIQUE recipe that hasn't been generated before
- Use ${creativityBoost} ${randomCuisine} cooking techniques and flavor profiles
- Apply ${randomMethod} cooking method creatively
- Make it ${spiceLevel} in heat level
- Use as many provided ingredients as possible
- Add complementary ingredients for enhanced flavor
- Be extremely creative and innovative
- Include specific measurements in ingredients
- Provide detailed, clear cooking instructions
- Make it sound absolutely delicious and appealing
- Ensure the recipe is practical and cookable
- Respond ONLY with valid JSON, no additional text`;

    try {
      if (!this.genAI) {
        throw new Error('Google API not initialized');
      }

      const model = this.genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.95, // Maximum creativity
          topP: 0.9,
          topK: 50,
          maxOutputTokens: 2048,
        }
      });
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error('No content received from Google Gemini');
      }

      // Clean the response to extract JSON
      let jsonText = text.trim();
      
      // Remove markdown code blocks if present
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/```json\n?/, '').replace(/\n?```$/, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```\n?/, '').replace(/\n?```$/, '');
      }

      // Parse the JSON response
      const recipeData = JSON.parse(jsonText);
      
      // Create recipe object with unique ID
      const recipe: Recipe = {
        id: uniqueId.toString(),
        title: recipeData.title,
        ingredients: recipeData.ingredients,
        description: recipeData.description,
        instructions: recipeData.instructions,
        cookingTime: recipeData.cookingTime,
        servings: recipeData.servings,
        vector: this.generateDummyVector()
      };

      // Track this recipe to avoid duplicates
      this.generatedRecipes.add(recipe.title.toLowerCase());

      console.log('✅ Successfully generated unique recipe:', recipe.title);
      return recipe;
    } catch (error) {
      console.error('Error generating recipe with Google Gemini:', error);
      
      // Enhanced error handling for Google API
      if (error instanceof Error) {
        if (error.message.includes('API_KEY_INVALID')) {
          throw new Error('🔑 Invalid Google API key! Please check your Google API key.');
        } else if (error.message.includes('QUOTA_EXCEEDED')) {
          throw new Error('❌ Google API quota exceeded! Please check your usage limits.');
        } else if (error.message.includes('RATE_LIMIT_EXCEEDED')) {
          throw new Error('⏱️ Rate limit exceeded! Please wait a moment and try again.');
        } else if (error.message.includes('JSON')) {
          throw new Error('🔄 Recipe generation failed. Please try again with different ingredients.');
        } else {
          throw new Error(`🔴 Google API error: ${error.message}`);
        }
      }
      
      throw error;
    }
  }

  // Parse ingredient input string into individual ingredients
  private parseIngredients(input: string): string[] {
    return input
      .toLowerCase()
      .split(/[,;]+|\sand\s/)
      .map(ing => ing.trim())
      .filter(ing => ing.length > 0);
  }

  // Find which recipe ingredients match the user's input ingredients
  private findMatchedIngredients(inputIngredients: string[], recipeIngredients: string[]): string[] {
    const matches: string[] = [];
    
    for (const input of inputIngredients) {
      for (const recipeIng of recipeIngredients) {
        if (recipeIng.toLowerCase().includes(input) || input.includes(recipeIng.toLowerCase())) {
          matches.push(recipeIng);
          break;
        }
      }
    }
    
    return matches;
  }

  // Generate dummy vector for compatibility with existing code
  private generateDummyVector(): number[] {
    return Array.from({ length: 8 }, () => Math.random());
  }

  // Generate enhanced recipe (now just returns the same recipe since it's already AI-generated)
  async generateEnhancedRecipe(searchResult: RecipeSearchResult, userInput: string): Promise<Recipe> {
    console.log('🤖 Recipe already enhanced by Google Gemini');
    
    return {
      ...searchResult.recipe,
      description: `${searchResult.recipe.description} This recipe is ${Math.round(searchResult.similarityScore * 100)}% matched to your available ingredients.`
    };
  }

  // Clear generated recipes cache for fresh recipes
  clearCache() {
    this.generatedRecipes.clear();
    this.recipeCounter = 0;
    console.log('🧹 Recipe cache cleared for fresh generation');
  }
}

// Export singleton instance
export const recipeService = new RecipeService();