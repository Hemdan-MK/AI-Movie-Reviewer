# 🚀 Deploy AI Movie Reviewer to Vercel

This guide will help you deploy your AI Movie Reviewer app to Vercel with **Google One Tap authentication**.

## 🎯 What is Google One Tap?

Google One Tap provides seamless authentication that:
- ✅ **Appears automatically** when users visit your site (in production)
- ✅ **No sign-up buttons needed** - works without any UI elements
- ✅ **One-click sign-in** for users with Google accounts
- ✅ **Only works on HTTPS** (Vercel provides this automatically)
- ✅ **Blocked on localhost** (for security reasons)

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ All your environment variables ready
- ✅ Google Cloud Console project set up
- ✅ Firebase project configured
- ✅ Git repository with your code

## 🌐 Step-by-Step Deployment

### 1. **Prepare Your Repository**

Make sure your code is committed to Git:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. **Deploy to Vercel**

#### Option A: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# ? Set up and deploy? [Y/n] y
# ? Which scope? (your-username)
# ? What's your project's name? ai-movie-reviewer
# ? In which directory is your code located? ./
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your Git repository
4. Configure project settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. **Configure Environment Variables**

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key_here
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Important**: Set all variables for **Production**, **Preview**, and **Development** environments.

### 4. **Configure Google OAuth for Production**

#### Update Google Cloud Console:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add your Vercel domain to **"Authorized JavaScript origins"**:
   ```
   https://your-app-name.vercel.app
   https://your-custom-domain.com (if you have one)
   ```
5. **Save** the configuration

#### Update Firebase Console:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project → **Authentication** → **Sign-in method**
3. Click **Google** provider
4. Add your Vercel domain to **"Authorized domains"**:
   ```
   your-app-name.vercel.app
   your-custom-domain.com (if you have one)
   ```
5. **Save** the configuration

### 5. **Redeploy with Environment Variables**

After adding environment variables:
```bash
# If using CLI
vercel --prod

# Or trigger redeploy from Vercel Dashboard
```

## 🔧 Troubleshooting

### Common Issues:

#### **Build Errors**
```bash
# Check your build locally first
npm run build

# If it works locally but fails on Vercel, check:
# 1. Node.js version compatibility
# 2. Environment variables are set
# 3. All dependencies are in package.json
```

#### **Google Authentication Issues**
- **403 Error**: Check that your Vercel domain is added to Google Cloud Console
- **Firebase Error**: Verify your Firebase project allows your domain
- **One Tap not showing**: Make sure you're using HTTPS (Vercel provides this automatically)

#### **Environment Variables**
```bash
# Test your environment variables locally
echo $VITE_GOOGLE_CLIENT_ID

# In production, check Vercel Dashboard → Settings → Environment Variables
```

## 🎯 Post-Deployment Checklist

After successful deployment:

- [ ] ✅ **Test authentication** - Google One Tap should work automatically
- [ ] ✅ **Check movie search** - TMDB API should load movies
- [ ] ✅ **Test AI reviews** - Google AI should generate summaries
- [ ] ✅ **Mobile responsiveness** - Test on different screen sizes
- [ ] ✅ **Performance** - Check loading speeds
- [ ] ✅ **Error handling** - Test with invalid inputs

## 🌟 Production Features

Once deployed, your users will experience:

### **🎯 Google One Tap**
- Automatic sign-in prompt for returning users
- One-click authentication
- Secure, Google-managed credentials

### **⚡ Fast Performance**
- Vercel's global CDN
- Automatic image optimization
- Edge caching

### **🔒 Security**
- HTTPS by default
- Environment variables secured
- Firebase security rules

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to your main branch:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically deploys the changes
```

## 📱 Custom Domain (Optional)

To use your own domain:

1. **In Vercel Dashboard** → Your Project → **Settings** → **Domains**
2. **Add your domain**: `yourdomain.com`
3. **Configure DNS** as instructed by Vercel
4. **Update Google OAuth** origins to include your custom domain
5. **Update Firebase** authorized domains

## 🎉 Success!

Your AI Movie Reviewer app is now live! 

**Production URL**: `https://your-app-name.vercel.app`

### **Key Features Working:**
- ✅ Google One Tap authentication
- ✅ Movie browsing and search
- ✅ AI-powered review summaries
- ✅ Responsive design
- ✅ Fast global performance

## 🆘 Need Help?

If you encounter issues:

1. **Check Vercel logs**: Dashboard → Your Project → Functions → View Function Logs
2. **Check browser console**: F12 → Console tab
3. **Verify environment variables**: Dashboard → Settings → Environment Variables
4. **Test locally first**: `npm run dev` to ensure everything works locally

---

**🎬 Enjoy your deployed AI Movie Reviewer app!**
