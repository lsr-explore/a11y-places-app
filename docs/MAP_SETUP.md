# Map Page Setup Guide

This guide will help you set up the Mapbox-powered map page with password protection.

## 📋 Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Getting a Mapbox Token](#getting-a-mapbox-token)
3. [Securing Your Mapbox Token](#securing-your-mapbox-token)
4. [GitHub Secrets Setup](#github-secrets-setup)
5. [Deployment](#deployment)
6. [Security Considerations](#security-considerations)

---

## 🖥️ Local Development Setup

### Step 1: Copy Environment Variables

```bash
cp .env.local.example .env.local
```

### Step 2: Edit `.env.local`

Open `.env.local` and add your credentials:

```bash
# Your Mapbox access token (get from https://account.mapbox.com/access-tokens/)
REACT_APP_MAPBOX_TOKEN=pk.your_actual_token_here

# Your map access password (choose any password you like)
REACT_APP_MAP_PASSWORD=your_secure_password_here
```

### Step 3: Run the App

```bash
pnpm start
```

Navigate to `http://localhost:3000/map` and you should see the login screen!

---

## 🗺️ Getting a Mapbox Token

### 1. Create a Mapbox Account

Visit [https://account.mapbox.com/auth/signup/](https://account.mapbox.com/auth/signup/) and sign up (it's free!).

### 2. Create an Access Token

1. Go to [https://account.mapbox.com/access-tokens/](https://account.mapbox.com/access-tokens/)
2. Click "Create a token"
3. Give it a name (e.g., "A11y Places App")
4. **Important**: Under "Token restrictions", add URL restrictions:
   - For development: `http://localhost:3000/*`
   - For production: `https://lsr-explore.github.io/*` (or your GitHub Pages URL)
5. Select the scopes you need (the defaults are fine)
6. Click "Create token"
7. **Copy the token immediately** (you won't be able to see it again!)

### 3. Add Token to Your Environment

Paste the token into your `.env.local` file:

```bash
REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNsZXhhbXBsZWlkIn0.example_token_here
```

---

## 🔒 Securing Your Mapbox Token

Mapbox tokens are designed to be used client-side, but you should still secure them:

### URL Restrictions (Recommended)

In your [Mapbox token settings](https://account.mapbox.com/access-tokens/):

1. Edit your token
2. Add "URL restrictions":
   - `http://localhost:3000/*` (for development)
   - `https://your-username.github.io/*` (for production)
3. Save changes

Now the token only works on your specified domains!

### Scope Restrictions

Only enable the APIs you need:
- ✅ Styles (required for map display)
- ✅ Fonts (recommended)
- ❌ Disable APIs you don't use

### Usage Limits & Alerts

1. Go to [Mapbox Settings](https://account.mapbox.com/settings/)
2. Set up billing alerts
3. Monitor your usage regularly

**Free tier includes**: 50,000 map loads/month (plenty for most projects!)

---

## 🔐 GitHub Secrets Setup

To deploy to GitHub Pages with your secrets:

### Step 1: Navigate to Repository Settings

1. Go to your GitHub repository
2. Click **Settings** (top navigation)
3. In the left sidebar, click **Secrets and variables** → **Actions**

### Step 2: Add Your Secrets

Click **"New repository secret"** and add these two secrets:

#### Secret 1: `REACT_APP_MAPBOX_TOKEN`
- **Name**: `REACT_APP_MAPBOX_TOKEN`
- **Value**: Your Mapbox token (starts with `pk.`)
- Click **"Add secret"**

#### Secret 2: `REACT_APP_MAP_PASSWORD`
- **Name**: `REACT_APP_MAP_PASSWORD`
- **Value**: Your desired map access password
- Click **"Add secret"**

### Step 3: Verify Secrets

You should now see both secrets listed (values will be hidden).

---

## 🚀 Deployment

### Automatic Deployment (Recommended)

The GitHub Actions workflow is already set up! Every time you push to `main`:

1. GitHub Actions runs automatically
2. Builds your app with the secrets from GitHub Secrets
3. Deploys to GitHub Pages

### Manual Deployment

If you prefer to build locally and deploy:

```bash
# Build with your local .env.local
pnpm run build

# Deploy to GitHub Pages
pnpm run gh-deploy
```

**Note**: With manual deployment, you need to have `REACT_APP_MAPBOX_TOKEN` and `REACT_APP_MAP_PASSWORD` in your `.env.local` file.

### Enable GitHub Pages

First time setup:

1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source**: GitHub Actions (if using the workflow)
   - OR **Source**: Deploy from a branch → select `gh-pages` (if deploying manually)
3. Save

Your site will be available at: `https://your-username.github.io/a11y-places-app/`

---

## 🛡️ Security Considerations

### ⚠️ Important: Client-Side Security Limitations

**The password protection is NOT truly secure**. Here's what you should know:

#### What the Setup Does:
- ✅ Keeps secrets out of your Git repository
- ✅ Allows you to manage credentials via GitHub Secrets
- ✅ Prevents casual users from accessing the map

#### What It Doesn't Do:
- ❌ **Does NOT provide true security**: Anyone can inspect the JavaScript bundle and find the password
- ❌ **Does NOT encrypt the credentials**: They're in the built JavaScript file
- ❌ **Does NOT prevent determined users**: This is security through obscurity

### Why This Approach?

This setup is appropriate for:
- 🎓 **Workshop/demo apps** (like this one!)
- 🧪 **Development/testing environments**
- 🔒 **Restricting casual access** without needing a backend

### When You Need Real Security

For production apps with real security needs, consider:
- **Firebase Authentication** (free tier available)
- **Auth0** or similar authentication services
- **Backend API** that validates credentials server-side

### Best Practices

1. **Change passwords regularly** via GitHub Secrets
2. **Monitor Mapbox usage** for unexpected spikes
3. **Use URL restrictions** on your Mapbox token (most important!)
4. **Don't use sensitive data** that requires real protection

---

## 🆘 Troubleshooting

### Map doesn't load
- Check browser console for errors
- Verify `REACT_APP_MAPBOX_TOKEN` is set correctly
- Check Mapbox token URL restrictions

### "Configuration Error" message
- Make sure `.env.local` exists and has your token
- Restart the development server after adding environment variables

### Authentication not working
- Verify `REACT_APP_MAP_PASSWORD` matches what you enter
- Check browser console for errors
- Clear browser cache/session storage

### GitHub Actions deployment fails
- Check that both secrets are set in GitHub
- Verify secret names match exactly (case-sensitive!)
- Check Actions tab for detailed error logs

---

## 📚 Additional Resources

- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/)
- [react-map-gl Documentation](https://visgl.github.io/react-map-gl/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Create React App Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)

---

## ✨ What You've Built

Your map page includes:
- 🗺️ **Interactive Mapbox map** centered on Los Angeles
- 🔍 **Zoom controls** with +/- buttons
- 📋 **Collapsible legend** (side panel on desktop, bottom sheet on mobile)
- 🔒 **Password protection** for access control
- ♿ **Fully accessible** with keyboard navigation and screen reader support
- 📱 **Responsive design** that works on all devices

Enjoy exploring your accessible map! 🎉
