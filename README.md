# 🤖 AI Chat Application

A modern, feature-rich chat application built with **Angular 18** and **Node.js**, featuring real-time AI responses powered by **Google Gemini API**. The application showcases a clean, Claude Code-inspired design with dark/light theme support and streaming responses.

![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### Frontend (Angular 18)
- ✅ **Modern Architecture**: Standalone components, signals, new control flow syntax
- ✅ **Claude Code-Inspired Design**: Clean, minimalist UI with professional aesthetics
- ✅ **Dark/Light Theme**: Seamless theme switching with local storage persistence
- ✅ **Real-time Streaming**: Character-by-character AI response streaming
- ✅ **Markdown Support**: Full markdown rendering with syntax highlighting
- ✅ **Code Highlighting**: Syntax highlighting for 180+ programming languages
- ✅ **Responsive Design**: Mobile-first design, works on all devices
- ✅ **Message Persistence**: Conversations saved in localStorage
- ✅ **Auto-scroll**: Automatic scrolling to latest messages
- ✅ **Copy Code**: One-click code block copying
- ✅ **Error Handling**: Graceful error states and loading indicators

### Backend (Node.js + Express)
- ✅ **Gemini API Integration**: Powered by Google's Gemini Pro model
- ✅ **Server-Sent Events (SSE)**: Efficient streaming for AI responses
- ✅ **TypeScript**: Full type safety
- ✅ **CORS Configuration**: Secure cross-origin requests
- ✅ **Error Handling**: Comprehensive error handling and logging
- ✅ **Health Checks**: API status monitoring
- ✅ **Environment Configuration**: Easy setup with .env files

## 🏗️ Architecture

```
├── frontend/                    # Angular 18 Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/           # Services & Models
│   │   │   ├── shared/         # Reusable Components
│   │   │   └── features/       # Feature Modules
│   │   └── styles/             # Global Styles
│   └── tailwind.config.js
│
└── backend/                     # Node.js + Express Server
    ├── src/
    │   ├── routes/             # API Routes
    │   ├── services/           # Business Logic
    │   ├── middleware/         # Express Middleware
    │   └── types/              # TypeScript Types
    └── .env.example
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** ([Download](https://nodejs.org/))
- **npm 9+** (comes with Node.js)
- **Google Gemini API Key** ([Get it here](https://ai.google.dev/))

### Installation

#### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd Claude-web--gen-chat-app
\`\`\`

#### 2. Backend Setup

\`\`\`bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env and add your Gemini API key
# GEMINI_API_KEY=your_actual_api_key_here
\`\`\`

**🔑 Getting Your Gemini API Key:**
1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Click "Get API Key"
4. Copy the API key
5. Paste it in `backend/.env` file

#### 3. Frontend Setup

\`\`\`bash
cd frontend

# Install dependencies
npm install
\`\`\`

### Running the Application

#### Option 1: Run Both Services Separately

**Terminal 1 - Backend:**
\`\`\`bash
cd backend
npm run dev
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd frontend
npm start
\`\`\`

#### Option 2: Production Build

**Backend:**
\`\`\`bash
cd backend
npm run build
npm start
\`\`\`

**Frontend:**
\`\`\`bash
cd frontend
npm run build
# Serve the dist folder with your preferred web server
\`\`\`

### Access the Application

- **Frontend:** http://localhost:4200
- **Backend API:** http://localhost:3000
- **Health Check:** http://localhost:3000/api/chat/health

## 📝 API Configuration

### Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | - | ✅ Yes |
| `PORT` | Server port | 3000 | ❌ No |
| `CORS_ORIGIN` | Allowed origins (comma-separated) | http://localhost:4200 | ❌ No |
| `NODE_ENV` | Environment mode | development | ❌ No |

### Frontend Environment

Located in `frontend/src/environments/environment.ts`:

\`\`\`typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
\`\`\`

For production, update `environment.prod.ts` with your production API URL.

## 🎨 Design System

### Color Palette

**Dark Theme:**
- Background Primary: `#1a1a1a`
- Background Secondary: `#2a2a2a`
- Text Primary: `#e3e3e3`
- Accent: `#f97316`

**Light Theme:**
- Background Primary: `#ffffff`
- Background Secondary: `#f8f8f8`
- Text Primary: `#1a1a1a`
- Accent: `#f97316`

### Typography
- **Primary Font:** Inter
- **Monospace Font:** JetBrains Mono
- **Base Size:** 14px

## 🛠️ Development

### Frontend Commands

\`\`\`bash
npm start              # Start dev server
npm run build          # Production build
npm run watch          # Build with watch mode
npm test               # Run tests
npm run lint           # Lint code
\`\`\`

### Backend Commands

\`\`\`bash
npm run dev            # Start with hot reload
npm run build          # Compile TypeScript
npm start              # Run compiled code
npm test               # Run tests
\`\`\`

## 📦 Technology Stack

### Frontend
- **Framework:** Angular 18.2+
- **Language:** TypeScript 5.4+
- **Styling:** TailwindCSS 4.0
- **Code Highlighting:** Highlight.js
- **Markdown:** Marked + DOMPurify
- **State Management:** Angular Signals

### Backend
- **Runtime:** Node.js 22+
- **Framework:** Express 5
- **Language:** TypeScript 5.9+
- **AI:** Google Gemini API
- **Streaming:** Server-Sent Events (SSE)

## 🔒 Security Features

- ✅ CORS protection
- ✅ HTML sanitization (DOMPurify)
- ✅ Environment variable protection
- ✅ Input validation
- ✅ Error message sanitization

## 🐛 Troubleshooting

### Common Issues

**1. Backend doesn't start:**
- Ensure `.env` file exists with valid `GEMINI_API_KEY`
- Check if port 3000 is available
- Verify Node.js version (18+)

**2. Frontend can't connect to backend:**
- Verify backend is running on port 3000
- Check CORS configuration in backend
- Ensure `environment.ts` has correct API URL

**3. No AI responses:**
- Verify Gemini API key is valid
- Check API quota at [Google AI Studio](https://ai.google.dev/)
- Look for errors in backend console

**4. Build errors:**
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

## 📱 Browser Support

- Chrome 100+ ✅
- Firefox 100+ ✅
- Safari 15+ ✅
- Edge 100+ ✅

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- **Google Gemini** - AI capabilities
- **Angular Team** - Amazing framework
- **Tailwind Labs** - Utility-first CSS
- **Claude Code** - Design inspiration

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using Angular 18 and Gemini AI**
