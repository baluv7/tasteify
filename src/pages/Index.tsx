import React, { useState, useEffect } from "react";
import {
  Search,
  ChefHat,
  Sparkles,
  Menu,
  Key,
  RefreshCw,
  Zap,
  Shield,
  Brain,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { RecipeCard } from "../components/RecipeCard";
import {
  recipeService,
  type RecipeSearchResult,
} from "../services/recipeService";
import { downloadRecipeAsText } from "../utils/downloadUtils";
import { type Recipe } from "../data/recipeData";
import { toast } from "sonner";

const Index = () => {
  // State management for the application
  const [ingredientInput, setIngredientInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<RecipeSearchResult | null>(
    null
  );
  const [enhancedRecipe, setEnhancedRecipe] = useState<Recipe | null>(null);
  const [currentIngredients, setCurrentIngredients] = useState("");
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Scroll animation effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll(".scroll-animate");
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Handle recipe search functionality
  const handleSearch = async () => {
    if (!ingredientInput.trim()) {
      toast.error("Please enter some ingredients first!");
      return;
    }

    if (!apiKey.trim()) {
      toast.error("Please enter your Google API key first!");
      return;
    }

    setIsLoading(true);
    setCurrentIngredients(ingredientInput);

    try {
      console.log("🚀 Starting AI recipe generation...");

      // Set API key in service
      recipeService.setApiKey(apiKey);

      // Generate recipe using Google Gemini
      const result = await recipeService.searchRecipes(ingredientInput);

      if (!result) {
        toast.error(
          "Could not generate recipe. Please try different ingredients!"
        );
        setSearchResult(null);
        setEnhancedRecipe(null);
        return;
      }

      // Generate enhanced recipe
      const enhanced = await recipeService.generateEnhancedRecipe(
        result,
        ingredientInput
      );

      setSearchResult(result);
      setEnhancedRecipe(enhanced);

      toast.success(`✨ Generated amazing recipe: ${result.recipe.title}!`);
    } catch (error) {
      console.error("Search error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Something went wrong. Please check your API key and try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Generate a new recipe for the same ingredients
  const handleRegenerate = async () => {
    if (!currentIngredients) {
      toast.error("No previous search to regenerate from!");
      return;
    }

    if (!apiKey.trim()) {
      toast.error("Please enter your Google API key first!");
      return;
    }

    setIsRegenerating(true);
    try {
      console.log(
        "🔄 Generating completely new recipe for same ingredients..."
      );

      // Set API key in service
      recipeService.setApiKey(apiKey);

      // Clear cache to ensure fresh recipes
      recipeService.clearCache();

      // Generate new recipe with exclusion of current recipe
      const currentRecipeId = searchResult?.recipe.id;
      const result = await recipeService.searchRecipes(
        currentIngredients,
        currentRecipeId
      );

      if (!result) {
        toast.error("Could not generate alternative recipe. Please try again!");
        return;
      }

      // Generate enhanced recipe
      const enhanced = await recipeService.generateEnhancedRecipe(
        result,
        currentIngredients
      );

      setSearchResult(result);
      setEnhancedRecipe(enhanced);

      toast.success(`🎉 Generated fresh new recipe: ${result.recipe.title}!`);
    } catch (error) {
      console.error("Regenerate error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Could not generate alternative recipe. Please try again.");
      }
    } finally {
      setIsRegenerating(false);
    }
  };

  // Handle recipe download functionality
  const handleDownload = () => {
    if (enhancedRecipe) {
      downloadRecipeAsText(enhancedRecipe);
      toast.success("📥 Recipe downloaded successfully!");
    }
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 particle-bg">
      {/* Navigation Header */}
      <header className="bg-white/85 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-50 enhanced-shadow">
        <div className="container mx-auto mobile-padding px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <ChefHat className="w-6 h-6 md:w-8 md:h-8 text-sky-500 group-hover:text-sky-600 transition-all duration-300 float-animation glow-effect" />
              <h1 className="logo-text text-xl md:text-3xl">Tasteify</h1>
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-sky-600 font-bold text-enhanced hover:text-sky-700 transition-all duration-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-navy-700 hover:text-sky-600 transition-all duration-300 font-bold text-enhanced"
              >
                About
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <Link
                to="/about"
                className="text-navy-700 hover:text-sky-600 transition-all duration-300 font-bold text-sm"
              >
                About
              </Link>
              <Menu className="w-5 h-5 text-navy-700" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-gradient relative">
        <div className="container mx-auto mobile-padding px-4 py-12 md:py-16 lg:py-24 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            {/* Main Title */}
            <div className="flex justify-center items-center gap-2 md:gap-4 mb-4 md:mb-6 bounce-in">
              <ChefHat className="w-8 h-8 md:w-12 md:h-12 text-sky-500 float-animation glow-effect" />
              <h1 className="hero-title text-4xl md:text-6xl lg:text-8xl font-poppins font-black">
                <span className="text-gradient">Tasteify</span>
              </h1>
              <Sparkles
                className="w-6 h-6 md:w-10 md:h-10 text-sky-500 float-animation glow-effect"
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Subtitle and Description */}
            <div className="fade-in-up" style={{ animationDelay: "0.3s" }}>
              <p className="hero-subtitle text-xl md:text-3xl lg:text-4xl text-navy-900 font-black mb-4 md:mb-6 max-w-4xl mx-auto text-enhanced">
                🤖 AI-Powered Recipe Generator using Google Gemini
              </p>
              <p className="text-base md:text-xl text-navy-700 font-bold max-w-3xl mx-auto text-enhanced">
                Enter your available ingredients and get personalized recipes
                generated by AI. Powered by Google's Gemini AI technology for
                unlimited recipe possibilities.
              </p>
            </div>
          </div>

          {/* Search Interface */}
          <div
            className="max-w-4xl mx-auto fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="glass-card mobile-card rounded-2xl md:rounded-3xl p-4 md:p-8 border border-slate-200/60">
              <div className="space-y-4 md:space-y-6">
                {/* API Key Input */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <Key className="w-4 h-4 md:w-5 md:h-5 text-navy-800" />
                    <label className="text-xs md:text-sm font-black text-navy-900 text-enhanced">
                      🔑 Google API Key (Required)
                    </label>
                  </div>
                  <Input
                    type="password"
                    placeholder="Enter your Google API key "
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="enhanced-input w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg font-bold"
                    disabled={isLoading || isRegenerating}
                  />
                  <div className="mt-3 space-y-2">
                    <p className="mobile-text text-xs md:text-sm text-navy-700 font-bold">
                      Get your free API key from{" "}
                      <a
                        href="https://makersuite.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:text-sky-700 font-black underline transition-colors"
                      >
                        Google AI Studio
                      </a>
                    </p>
                    <p className="mobile-small-text text-xs text-amber-800 font-bold">
                      ⚠️ If you get quota errors, check your{" "}
                      <a
                        href="https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-900 hover:underline font-black"
                      >
                        usage limits & billing
                      </a>
                    </p>
                  </div>
                </div>

                {/* Ingredients Input */}
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="🥘 Enter your ingredients (e.g., chicken, broccoli, soy sauce)"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="enhanced-input w-full px-4 md:px-6 py-4 md:py-5 text-base md:text-lg font-bold"
                    disabled={isLoading || isRegenerating}
                  />
                </div>

                {/* Search Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleSearch}
                    disabled={
                      isLoading ||
                      isRegenerating ||
                      !ingredientInput.trim() ||
                      !apiKey.trim()
                    }
                    className="button-primary mobile-button px-8 md:px-12 py-4 md:py-6 text-white rounded-xl md:rounded-2xl text-lg md:text-xl font-black w-full md:w-auto min-w-[250px] md:min-w-[300px] disabled:opacity-50"
                  >
                    <Search className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                    {isLoading
                      ? "🤖 Generating Recipe..."
                      : "✨ Generate AI Recipe"}
                  </Button>
                </div>

                {/* Quick Suggestions */}
                <div className="flex justify-center">
                  <div className="flex flex-wrap gap-2 md:gap-3 mobile-text text-xs md:text-sm text-navy-700 justify-center font-bold">
                    <span className="font-black">🎯 Try:</span>
                    <button
                      onClick={() =>
                        setIngredientInput("chicken, broccoli, soy sauce")
                      }
                      className="text-sky-600 hover:text-sky-800 underline font-black transition-colors"
                    >
                      chicken, broccoli, soy sauce
                    </button>
                    <span>•</span>
                    <button
                      onClick={() =>
                        setIngredientInput("pasta, mushrooms, cream")
                      }
                      className="text-sky-600 hover:text-sky-800 underline font-black transition-colors"
                    >
                      pasta, mushrooms, cream
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto mobile-padding px-4 py-6 md:py-8">
        {/* Loading State */}
        {(isLoading || isRegenerating) && (
          <div className="text-center py-8 md:py-12 bounce-in">
            <LoadingSpinner />
            <p className="mt-4 text-navy-800 font-black text-lg md:text-xl">
              {isRegenerating
                ? "🔄 Creating a brand new recipe..."
                : "🤖 AI is crafting your perfect recipe..."}
            </p>
          </div>
        )}

        {/* Recipe Results */}
        {searchResult && enhancedRecipe && !isLoading && !isRegenerating && (
          <div className="fade-in-up">
            <RecipeCard
              searchResult={searchResult}
              enhancedRecipe={enhancedRecipe}
              onRegenerate={handleRegenerate}
              onDownload={handleDownload}
            />
          </div>
        )}

        {/* Empty State */}
        {!searchResult && !isLoading && !isRegenerating && (
          <div className="text-center py-12 md:py-16 scroll-animate">
            <div className="max-w-md mx-auto">
              <ChefHat className="w-16 h-16 md:w-24 md:h-24 text-slate-400 mx-auto mb-4 md:mb-6 float-animation glow-effect" />
              <h3 className="text-2xl md:text-3xl font-poppins font-black text-navy-900 mb-3 md:mb-4 text-enhanced">
                🚀 Ready to Generate AI Recipes?
              </h3>
              <p className="text-navy-700 font-bold text-enhanced mobile-text">
                Enter your Google API key and ingredients above to generate
                unlimited personalized recipes
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-slate-100 via-white to-blue-100 py-12 md:py-20">
        <div className="container mx-auto mobile-padding px-4">
          <div className="text-center mb-12 md:mb-16 scroll-animate">
            <h2 className="text-3xl md:text-5xl font-poppins font-black text-navy-900 mb-4 md:mb-6 text-enhanced">
              🌟 Why Choose Tasteify?
            </h2>
            <p className="text-lg md:text-2xl text-navy-800 font-black max-w-4xl mx-auto text-enhanced">
              Experience unlimited recipe possibilities with AI-powered cooking
              assistance
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mobile-grid grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="text-center glass-card mobile-card p-6 md:p-8 rounded-2xl scroll-animate slide-in-left">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-sky-400 to-sky-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 text-2xl md:text-3xl font-black enhanced-shadow glow-effect">
                🤖
              </div>
              <h3 className="font-poppins text-xl md:text-2xl font-black text-navy-900 mb-3 md:mb-4 text-enhanced">
                AI-Powered
              </h3>
              <p className="text-navy-700 font-bold text-enhanced mobile-text">
                Unlimited recipe generation using Google's Gemini AI for any
                ingredient combination
              </p>
            </div>

            <div
              className="text-center glass-card mobile-card p-6 md:p-8 rounded-2xl scroll-animate fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 text-2xl md:text-3xl font-black enhanced-shadow glow-effect">
                🔒
              </div>
              <h3 className="font-poppins text-xl md:text-2xl font-black text-navy-900 mb-3 md:mb-4 text-enhanced">
                Privacy First
              </h3>
              <p className="text-navy-700 font-bold text-enhanced mobile-text">
                Your API key stays in your browser. No data storage, no
                registration required
              </p>
            </div>

            <div className="text-center glass-card mobile-card p-6 md:p-8 rounded-2xl scroll-animate slide-in-right">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 text-2xl md:text-3xl font-black enhanced-shadow glow-effect">
                ⚡
              </div>
              <h3 className="font-poppins text-xl md:text-2xl font-black text-navy-900 mb-3 md:mb-4 text-enhanced">
                Instant Results
              </h3>
              <p className="text-navy-700 font-bold text-enhanced mobile-text">
                Get personalized recipes in seconds with downloadable format for
                offline use
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 md:mt-16 scroll-animate">
            <Link to="/about">
              <Button className="button-primary mobile-button px-8 md:px-10 py-4 md:py-5 text-white rounded-xl md:rounded-2xl font-black text-lg md:text-xl">
                🚀 Learn More About Tasteify
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
