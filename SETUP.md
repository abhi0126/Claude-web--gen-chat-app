# 🚀 Quick Setup Guide

This guide will walk you through setting up and running the AI Chat Application on your local machine.

## 📋 Step-by-Step Setup

### Step 1: Install Prerequisites

Ensure you have the following installed:

- [ ] **Node.js v18 or higher** - [Download here](https://nodejs.org/)
- [ ] **npm v9 or higher** (comes with Node.js)

**Check your versions:**
\`\`\`bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
\`\`\`

### Step 2: Get Your Gemini API Key

This is **REQUIRED** for the application to work.

1. **Visit Google AI Studio:**
   - Go to: https://ai.google.dev/

2. **Sign in:**
   - Use your Google account

3. **Get API Key:**
   - Click on **"Get API Key"** button
   - Click **"Create API Key in new project"** (or select existing project)
   - Copy the generated API key

4. **Important:**
   - Keep your API key secret
   - Don't commit it to version control
   - Don't share it publicly

### Step 3: Setup Backend

\`\`\`bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
\`\`\`

This will install all required packages including:
- express (web server)
- @google/generative-ai (Gemini SDK)
- cors (cross-origin support)
- TypeScript and development tools

### Step 4: Configure Backend Environment

\`\`\`bash
# Create .env file from example
cp .env.example .env
\`\`\`

**Edit the `.env` file:**

Open `backend/.env` in your text editor and update:

\`\`\`env
# REPLACE 'your_gemini_api_key_here' with your actual API key
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Optional: Change port if 3000 is in use
PORT=3000

# Optional: Add more origins if needed
CORS_ORIGIN=http://localhost:4200
\`\`\`

**✅ Your .env file should look like:**
\`\`\`env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:4200
GEMINI_API_KEY=AIzaSyDZXXXXXXXXXXXXXXXXXXXXXXXXXXX
\`\`\`

### Step 5: Setup Frontend

Open a **new terminal window** (keep the first one for backend).

\`\`\`bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
\`\`\`

This will install:
- Angular 18 framework
- TailwindCSS
- Markdown libraries
- Code highlighting
- And all other dependencies

### Step 6: Start the Backend Server

In the **first terminal** (backend directory):

\`\`\`bash
npm run dev
\`\`\`

**Expected output:**
\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Server started successfully!
📡 Listening on port 3000
🌍 Server URL: http://localhost:3000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Gemini API key configured
\`\`\`

**❌ If you see a warning:**
\`\`\`
⚠️  WARNING: GEMINI_API_KEY not configured!
\`\`\`
Go back to Step 4 and make sure your API key is correctly set in `.env`

### Step 7: Start the Frontend Application

In the **second terminal** (frontend directory):

\`\`\`bash
npm start
\`\`\`

**Expected output:**
\`\`\`
** Angular Live Development Server is listening on localhost:4200 **
✔ Compiled successfully.
\`\`\`

### Step 8: Access the Application

Open your browser and navigate to:

**🌐 http://localhost:4200**

You should see:
- A clean chat interface
- Theme toggle button (sun/moon icon)
- An input field to type messages
- "Start a Conversation" message

### Step 9: Test the Application

1. **Type a message** in the input field:
   - Example: "Hello! Can you explain what you can do?"

2. **Press Enter** or click the send button

3. **Watch the magic:**
   - Your message appears on the right (user bubble)
   - AI response streams in character by character
   - Code blocks are syntax highlighted
   - Markdown is properly formatted

## 🎨 Features to Try

### Theme Switching
- Click the **sun/moon icon** in the header
- Theme preference is saved automatically

### Code Examples
Ask the AI to write code:
\`\`\`
"Write a Python function to calculate fibonacci numbers"
"Show me a React component example"
"Create a SQL query to join two tables"
\`\`\`

### Markdown Testing
\`\`\`
"Format your response with headings, lists, and code blocks"
\`\`\`

### Copy Code
- Hover over any code block
- Click the **Copy** button
- Code is copied to clipboard

### Clear Chat
- Click the **trash icon** in header
- Confirms before clearing all messages

## 🛠️ Development Workflow

### Making Changes to Frontend
The Angular dev server auto-reloads when you save files.

### Making Changes to Backend
The nodemon process auto-restarts when you save files.

### Stopping the Application
- Press `Ctrl + C` in each terminal
- Or close the terminal windows

## ⚙️ Advanced Configuration

### Change Backend Port

Edit `backend/.env`:
\`\`\`env
PORT=5000
\`\`\`

Then update `frontend/src/environments/environment.ts`:
\`\`\`typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
\`\`\`

### Add Multiple CORS Origins

Edit `backend/.env`:
\`\`\`env
CORS_ORIGIN=http://localhost:4200,http://localhost:8080
\`\`\`

## 🐛 Troubleshooting

### Issue: "GEMINI_API_KEY not configured"
**Solution:**
1. Make sure `.env` file exists in `backend/` directory
2. Verify API key is on this line: `GEMINI_API_KEY=AIza...`
3. No spaces around `=`
4. Restart the backend server

### Issue: "Connection refused" or CORS error
**Solution:**
1. Make sure backend is running on port 3000
2. Check `CORS_ORIGIN` in backend `.env`
3. Verify frontend `environment.ts` has correct API URL

### Issue: Port 3000 or 4200 already in use
**Solution:**
\`\`\`bash
# Find process using the port (macOS/Linux)
lsof -i :3000
lsof -i :4200

# Kill the process
kill -9 <PID>

# Or change the port (see Advanced Configuration above)
\`\`\`

### Issue: npm install fails
**Solution:**
\`\`\`bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Try again
npm install
\`\`\`

### Issue: "API quota exceeded"
**Solution:**
- You've hit the free tier limit
- Wait for quota to reset (usually 24 hours)
- Or upgrade your Gemini API plan

## 📊 Verify Everything Works

**✅ Checklist:**
- [ ] Backend starts without warnings
- [ ] Frontend compiles successfully
- [ ] Browser opens to http://localhost:4200
- [ ] Can toggle dark/light theme
- [ ] Can send a message
- [ ] AI response streams in
- [ ] Code blocks are highlighted
- [ ] Can copy code blocks
- [ ] No console errors

## 🎉 You're All Set!

If everything works:
1. Start chatting with the AI
2. Explore the features
3. Try different prompts
4. Test the code highlighting
5. Enjoy the clean UI!

## 💡 Tips for Best Experience

- **Use specific prompts** for better AI responses
- **Ask for code examples** to see syntax highlighting
- **Try markdown** formatting in your prompts
- **Test the theme toggle** - dark mode is easier on the eyes
- **Long conversations** are saved in localStorage

## 🤝 Need Help?

If you encounter issues not covered here:
1. Check the main [README.md](./README.md)
2. Review console logs in browser (F12)
3. Check backend terminal for errors
4. Open an issue on GitHub

---

**Happy Chatting! 🚀**
