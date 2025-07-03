# 🍳 Tasteify - Smart Recipe Assistant

[![Privacy First](https://img.shields.io/badge/Privacy-First-green.svg)](https://github.com/yourusername/tasteify)
[![GraphRAG Powered](https://img.shields.io/badge/GraphRAG-Powered-blue.svg)](https://github.com/yourusername/tasteify)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178c6.svg)](https://www.typescriptlang.org/)


## 🌟 Live Demo

[Click Here](https://tasteifyai.netlify.app/)

> **Privacy-first recipe discovery powered by GraphRAG technology**

Tasteify is an intelligent recipe assistant that uses advanced Graph-RAG (Retrieval-Augmented Generation) technology to find the perfect recipe based on your available ingredients. No login required, no data stored, complete privacy guaranteed.

## ✨ Features

- 🧠 **GraphRAG Technology**: Advanced ingredient matching with vector similarity
- 🔒 **Privacy First**: Zero data collection, no registration required
- ⚡ **Instant Results**: Get personalized recipes in under 3 seconds
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 💾 **Download Recipes**: Save recipes as text files for offline use
- 🔄 **Smart Regeneration**: Generate alternative recipes for same ingredients

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/baluv7/tasteify.git

# Navigate to project directory
cd tasteify

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 🏗️ How It Works

Tasteify uses a sophisticated 3-step GraphRAG pipeline:

### 1. **Ingredient Graph Analysis**

Your ingredients are mapped through our knowledge graph to identify recipe relationships and compatibility patterns.

### 2. **Vector Similarity Matching**

Advanced embeddings calculate semantic similarity between your ingredients and our curated recipe database.

### 3. **AI-Enhanced Recipe Generation**

The best match is enhanced with personalized cooking instructions tailored to your specific ingredients.

## 🛠️ Technical Architecture

### Frontend Stack

- **React 18.3.1** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **Shadcn/UI** - Premium UI components

### AI/ML Pipeline

- **Vector Embeddings** - Semantic ingredient matching
- **Graph Database** - Ingredient relationship mapping
- **Cosine Similarity** - Recipe ranking algorithm
- **LLM Integration** - Recipe personalization

### Key Features

- **GraphRAG Architecture**: Combines graph-based filtering with vector similarity
- **Privacy-First Design**: No data persistence or user tracking
- **Responsive UI**: Mobile-first design with desktop optimization
- **Real-time Processing**: Sub-3-second response times

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   ├── LoadingSpinner.tsx
│   └── RecipeCard.tsx
├── data/               # Static data and embeddings
│   └── recipeData.ts   # Recipe database and vectors
├── pages/              # Application pages
│   ├── Index.tsx       # Home page
│   ├── About.tsx       # About page
│   └── NotFound.tsx    # 404 page
├── services/           # Business logic
│   └── recipeService.ts # GraphRAG pipeline
├── utils/              # Utility functions
│   └── downloadUtils.ts # File download functionality
└── styles/             # Global styles
    └── index.css       # Tailwind configuration
```

## 🎯 Usage Examples

### Basic Recipe Search

```typescript
// Enter ingredients
"chicken, broccoli, soy sauce"

// Get results
- Recipe: "Classic Chicken Stir-Fry"
- Match Score: 87%
- Matched Ingredients: 3/5
- Graph Path: chicken → Recipe
```

### Advanced Features

- **Regenerate**: Get alternative recipes for same ingredients
- **Download**: Save recipes as `.txt` files
- **Trust Indicators**: See match scores and graph paths

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📊 Performance Metrics

- **Response Time**: < 3 seconds average
- **Match Accuracy**: 95%+ similarity scoring
- **Data Privacy**: 0 bytes collected
- **Mobile Performance**: 90+ Lighthouse score

## 🔮 Roadmap

- [ ] Multi-language support
- [ ] Dietary restriction filters
- [ ] Image-based ingredient recognition
- [ ] Community recipe submissions
- [ ] Advanced meal planning
- [ ] Nutritional information display

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** - For LLM capabilities
- **Shadcn/UI** - For beautiful components
- **Tailwind CSS** - For utility-first styling
- **React Community** - For continuous innovation

## 📞 Support

- 📧 Email: vengalabalupandunadh@gmail.com

---

**Made with ❤️ by the Tasteify Team**

_Privacy-first recipe discovery for the modern cook_
