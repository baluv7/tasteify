import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center particle-bg">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-center items-center gap-3 mb-8">
          <ChefHat className="w-12 h-12 text-sky-500 float-animation glow-effect" />
          <h1 className="logo-text text-2xl">
            Tasteify
          </h1>
        </div>

        {/* 404 Error */}
        <div className="bounce-in">
          <h1 className="text-8xl font-black text-navy-900 mb-4 text-enhanced">404</h1>
          <h2 className="text-3xl font-poppins font-black text-navy-800 mb-4 text-enhanced">
            🍽️ Recipe Not Found!
          </h2>
          <p className="text-xl text-navy-700 font-bold mb-8 text-enhanced">
            Oops! This page seems to have been eaten. Let's get you back to cooking!
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-4">
            <Link to="/">
              <Button className="button-primary w-full px-8 py-4 text-white rounded-xl font-black text-lg">
                <Home className="w-5 h-5 mr-2" />
                🏠 Back to Home
              </Button>
            </Link>
            
            <Link to="/about">
              <Button variant="outline" className="w-full px-8 py-4 border-navy-300 text-navy-800 hover:bg-navy-100 font-bold rounded-xl">
                <ArrowLeft className="w-5 h-5 mr-2" />
                📖 Learn About Tasteify
              </Button>
            </Link>
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-8 p-4 bg-white/80 rounded-xl border border-slate-200 enhanced-shadow">
          <p className="text-navy-600 font-bold text-sm">
            💡 <span className="font-black">Pro Tip:</span> Try generating a recipe with ingredients like "chicken, rice, vegetables" on our home page!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;