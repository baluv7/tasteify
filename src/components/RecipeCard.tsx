import React from 'react';
import { Clock, Users, Download, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type Recipe } from '../data/recipeData';
import { type RecipeSearchResult } from '../services/recipeService';

interface RecipeCardProps {
  searchResult: RecipeSearchResult;
  enhancedRecipe: Recipe;
  onRegenerate: () => void;
  onDownload: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ 
  searchResult, 
  enhancedRecipe, 
  onRegenerate, 
  onDownload 
}) => {
  const { recipe, similarityScore, matchedIngredients, graphPath } = searchResult;
  
  return (
    <div className="w-full max-w-5xl mx-auto bounce-in">
      {/* Trust Indicators - Show GraphRAG processing results */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <Badge className="bg-gradient-to-r from-sky-500 to-sky-600 text-white border-0 px-6 py-3 text-base font-black enhanced-shadow glow-effect">
          <Sparkles className="w-5 h-5 mr-2" />
          Match Score: {(similarityScore * 100).toFixed(0)}%
        </Badge>
        <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 px-6 py-3 text-base font-black enhanced-shadow glow-effect">
          ✅ {matchedIngredients.length} ingredients matched
        </Badge>
        <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 px-6 py-3 text-base font-black enhanced-shadow glow-effect">
          🤖 AI Generated
        </Badge>
      </div>

      {/* Main Recipe Card */}
      <Card className="recipe-card border-0 enhanced-shadow">
        <CardHeader className="pb-6">
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1">
              {/* Recipe Title */}
              <CardTitle className="text-5xl font-playfair font-black text-navy-900 mb-4 text-enhanced">
                {enhancedRecipe.title}
              </CardTitle>
              {/* Recipe Description */}
              <p className="text-navy-700 text-xl leading-relaxed font-bold text-enhanced">
                {enhancedRecipe.description}
              </p>
            </div>
            
            {/* Recipe Meta Information */}
            <div className="flex flex-col gap-3 text-navy-600 min-w-[140px]">
              <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-xl enhanced-shadow">
                <Clock className="w-6 h-6 text-sky-600" />
                <span className="font-black text-navy-900">{recipe.cookingTime}</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-xl enhanced-shadow">
                <Users className="w-6 h-6 text-sky-600" />
                <span className="font-black text-navy-900">{recipe.servings} servings</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-10">
          {/* Ingredients Section */}
          <div>
            <h3 className="text-3xl font-playfair font-black text-navy-900 mb-6 text-enhanced">🥘 Ingredients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recipe.ingredients.map((ingredient, index) => {
                // Check if this ingredient was matched by the user's input
                const isMatched = matchedIngredients.some(matched => 
                  matched.toLowerCase().includes(ingredient.toLowerCase()) ||
                  ingredient.toLowerCase().includes(matched.toLowerCase())
                );
                
                return (
                  <div
                    key={index}
                    className={`px-4 py-3 rounded-xl border-2 font-bold text-enhanced transition-all duration-300 hover:scale-105 ${
                      isMatched 
                        ? 'bg-gradient-to-r from-sky-50 to-sky-100 border-sky-400 text-sky-900 enhanced-shadow' 
                        : 'bg-gradient-to-r from-slate-50 to-slate-100 border-slate-400 text-slate-900 enhanced-shadow'
                    }`}
                  >
                    • {ingredient}
                    {isMatched && (
                      <Badge className="ml-3 text-xs bg-sky-500 text-white border-0 font-black">
                        ✓ matched
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions Section */}
          <div>
            <h3 className="text-3xl font-playfair font-black text-navy-900 mb-6 text-enhanced">👨‍🍳 Instructions</h3>
            <div className="space-y-4">
              {enhancedRecipe.instructions.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-5 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border-2 border-slate-300 enhanced-shadow transition-all duration-300 hover:scale-105"
                >
                  {/* Step Number */}
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-navy-600 to-navy-700 text-white rounded-full flex items-center justify-center text-lg font-black enhanced-shadow glow-effect">
                    {index + 1}
                  </div>
                  {/* Step Description */}
                  <p className="text-navy-800 leading-relaxed font-bold text-enhanced">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t-2 border-slate-200">
            {/* Download Recipe Button */}
            <Button 
              onClick={onDownload}
              className="button-primary flex-1 text-white font-black py-5 text-xl rounded-xl"
            >
              <Download className="w-6 h-6 mr-3" />
              📥 Save Recipe
            </Button>
            
            {/* Generate New Recipe Button */}
            <Button 
              onClick={onRegenerate}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-black py-5 text-xl rounded-xl enhanced-shadow transition-all duration-300 hover:scale-105"
            >
              <RefreshCw className="w-6 h-6 mr-3" />
              🔄 Generate New Recipe
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Note */}
      <div className="mt-8 text-center">
        <p className="text-navy-700 font-bold text-enhanced">
          🔒 <span className="font-black">Privacy-first:</span> Your data stays with you—no storage or login required.
        </p>
      </div>
    </div>
  );
};