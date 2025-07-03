import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, ArrowLeft, Sparkles, Zap, Shield, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  // Scroll animation effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 particle-bg">
      {/* Navigation Header */}
      <header className="bg-white/85 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-50 enhanced-shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <ChefHat className="w-8 h-8 text-sky-500 group-hover:text-sky-600 transition-all duration-300 float-animation glow-effect" />
              <h1 className="logo-text">
                Tasteify
              </h1>
            </Link>
            
            {/* Back to Home */}
            <Link to="/">
              <Button variant="outline" className="border-navy-300 text-navy-800 hover:bg-navy-100 font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-gradient">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center mb-12 bounce-in">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Brain className="w-10 h-10 text-sky-500 glow-effect" />
              <h1 className="text-5xl lg:text-7xl font-playfair font-black">
                <span className="text-gradient">About Tasteify</span>
              </h1>
              <Sparkles className="w-8 h-8 text-sky-500 glow-effect" />
            </div>
            
            <p className="text-2xl lg:text-3xl text-navy-900 font-black mb-4 max-w-4xl mx-auto text-enhanced">
              🚀 The Future of Recipe Discovery is Here
            </p>
            <p className="text-navy-700 font-bold max-w-3xl mx-auto text-enhanced">
              Powered by Google's cutting-edge Gemini AI technology, Tasteify generates unlimited personalized recipes 
              from any ingredients you have on hand.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16 scroll-animate">
          <h2 className="text-4xl font-playfair font-black text-navy-900 mb-6 text-center text-enhanced">
            🎯 Our Mission
          </h2>
          <p className="text-xl text-navy-700 font-bold leading-relaxed text-center text-enhanced">
            We believe cooking should be creative, accessible, and exciting. Tasteify eliminates the barriers 
            between your available ingredients and delicious meals by harnessing the power of artificial intelligence 
            to generate personalized recipes instantly.
          </p>
        </div>

        {/* Why Tasteify Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-playfair font-black text-navy-900 mb-12 text-center scroll-animate text-enhanced">
            🌟 Why Choose Tasteify?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Unlimited Recipes */}
            <div className="glass-card p-6 rounded-2xl scroll-animate slide-in-left">
              <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-4 glow-effect">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-playfair font-black text-navy-900 mb-3 text-enhanced">🤖 Unlimited AI Recipes</h3>
              <p className="text-navy-700 font-bold text-enhanced">
                Unlike traditional recipe apps with limited databases, Tasteify uses Google Gemini to generate 
                infinite recipe possibilities for any ingredient combination.
              </p>
            </div>

            {/* Personalized Results */}
            <div className="glass-card p-6 rounded-2xl scroll-animate fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-4 glow-effect">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-playfair font-black text-navy-900 mb-3 text-enhanced">✨ Personalized Results</h3>
              <p className="text-navy-700 font-bold text-enhanced">
                Every recipe is generated specifically for your ingredients, ensuring maximum utilization 
                of what you have while creating delicious, practical meals.
              </p>
            </div>

            {/* Privacy First */}
            <div className="glass-card p-6 rounded-2xl scroll-animate slide-in-right">
              <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-4 glow-effect">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-playfair font-black text-navy-900 mb-3 text-enhanced">🔒 Privacy Guaranteed</h3>
              <p className="text-navy-700 font-bold text-enhanced">
                Your API key stays in your browser. No account creation, no data storage, 
                no tracking. Your cooking preferences remain completely private.
              </p>
            </div>

            {/* Instant Generation */}
            <div className="glass-card p-6 rounded-2xl scroll-animate slide-in-left" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-4 glow-effect">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-playfair font-black text-navy-900 mb-3 text-enhanced">⚡ Lightning Fast</h3>
              <p className="text-navy-700 font-bold text-enhanced">
                Get professional-quality recipes in seconds. No browsing through endless lists 
                or filtering through irrelevant results.
              </p>
            </div>

            {/* Cost Effective */}
            <div className="glass-card p-6 rounded-2xl scroll-animate fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-4 glow-effect text-2xl">
                💰
              </div>
              <h3 className="text-xl font-playfair font-black text-navy-900 mb-3 text-enhanced">💰 Cost Effective</h3>
              <p className="text-navy-700 font-bold text-enhanced">
                Use your own Google API key and pay only for what you use. No monthly subscriptions 
                or hidden fees. Typically costs just pennies per recipe.
              </p>
            </div>

            {/* Always Fresh */}
            <div className="glass-card p-6 rounded-2xl scroll-animate slide-in-right" style={{ animationDelay: '0.8s' }}>
              <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-4 glow-effect text-2xl">
                🌟
              </div>
              <h3 className="text-xl font-playfair font-black text-navy-900 mb-3 text-enhanced">🌟 Always Fresh</h3>
              <p className="text-navy-700 font-bold text-enhanced">
                Never run out of recipe ideas. Each generation creates unique variations, 
                so you'll always discover new ways to cook with the same ingredients.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16 scroll-animate">
          <h2 className="text-4xl font-playfair font-black text-navy-900 mb-12 text-center text-enhanced">
            🔧 How It Works
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6 items-start glass-card p-6 rounded-2xl">
                <div className="flex-shrink-0 w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center font-black text-xl glow-effect">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-playfair font-black text-navy-900 mb-2 text-enhanced">🔑 Enter Your API Key</h3>
                  <p className="text-navy-700 font-bold text-enhanced">
                    Get a free API key from Google AI Studio. Your key stays in your browser 
                    and is never stored on our servers.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6 items-start glass-card p-6 rounded-2xl">
                <div className="flex-shrink-0 w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center font-black text-xl glow-effect">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-playfair font-black text-navy-900 mb-2 text-enhanced">🥘 List Your Ingredients</h3>
                  <p className="text-navy-700 font-bold text-enhanced">
                    Simply type in whatever ingredients you have available. No need for exact measurements 
                    or specific formatting.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6 items-start glass-card p-6 rounded-2xl">
                <div className="flex-shrink-0 w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center font-black text-xl glow-effect">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-playfair font-black text-navy-900 mb-2 text-enhanced">🤖 Get AI-Generated Recipe</h3>
                  <p className="text-navy-700 font-bold text-enhanced">
                    Our AI analyzes your ingredients and creates a personalized recipe with detailed 
                    instructions, cooking times, and serving suggestions.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6 items-start glass-card p-6 rounded-2xl">
                <div className="flex-shrink-0 w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center font-black text-xl glow-effect">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-playfair font-black text-navy-900 mb-2 text-enhanced">🍽️ Cook & Enjoy</h3>
                  <p className="text-navy-700 font-bold text-enhanced">
                    Download your recipe as a text file for offline use, or generate alternative 
                    recipes with the same ingredients for variety.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="glass-card rounded-2xl p-8 mb-16 scroll-animate">
          <h2 className="text-3xl font-playfair font-black text-navy-900 mb-6 text-center text-enhanced">
            🔧 Technology & Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Technology */}
            <div>
              <h3 className="text-xl font-black text-navy-900 mb-4 flex items-center text-enhanced">
                <span className="w-10 h-10 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center mr-3 text-lg glow-effect">
                  🤖
                </span>
                Google Gemini AI Integration
              </h3>
              <ul className="space-y-2 text-navy-700 font-bold">
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2 font-black">✓</span>
                  <span>Powered by Google's advanced Gemini AI model</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2 font-black">✓</span>
                  <span>Unlimited recipe generation capabilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2 font-black">✓</span>
                  <span>Intelligent ingredient matching and suggestions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2 font-black">✓</span>
                  <span>Creative and practical recipe combinations</span>
                </li>
              </ul>
            </div>

            {/* User Experience */}
            <div>
              <h3 className="text-xl font-black text-navy-900 mb-4 flex items-center text-enhanced">
                <span className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-3 text-lg glow-effect">
                  ⚡
                </span>
                User Experience
              </h3>
              <ul className="space-y-2 text-navy-700 font-bold">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 font-black">✓</span>
                  <span>Instant recipe generation (3-5 seconds)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 font-black">✓</span>
                  <span>Clean, intuitive interface design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 font-black">✓</span>
                  <span>Mobile-responsive for all devices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 font-black">✓</span>
                  <span>Download recipes as text files</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center scroll-animate">
          <h2 className="text-4xl font-playfair font-black text-navy-900 mb-6 text-enhanced">
            🚀 Ready to Transform Your Cooking?
          </h2>
          <p className="text-xl text-navy-700 font-bold mb-8 max-w-3xl mx-auto text-enhanced">
            Join thousands of home cooks who have discovered the joy of AI-powered recipe generation. 
            Your culinary adventure starts with just a few ingredients.
          </p>
          
          <Link to="/">
            <Button className="button-primary px-10 py-5 text-white rounded-2xl font-black text-xl">
              <ChefHat className="w-6 h-6 mr-2" />
              🍳 Start Cooking with AI
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-navy-300 font-bold">
            © 2024 Tasteify. Made with ❤️ for food lovers everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;