# Vercel Deployment Guide for Luzi Home Health Services

## 🚀 Quick Deployment

### Option 1: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - Project name: luzi-home-health-services
# - Directory: ./
# - Override settings? No
```

### Option 2: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

## ⚙️ Environment Variables

Set these in your Vercel dashboard under Project Settings > Environment Variables:

```env
# Brevo API Configuration
VITE_BREVO_API_KEY=your_brevo_api_key_here

# Agency Information
VITE_ADMIN_EMAIL=admin@texanovahomecare.com
VITE_ADMIN_NAME=Texanova Home Care LLC

# Environment
NODE_ENV=production
```

### 🔑 Getting Brevo API Key:
1. Log into your Brevo account
2. Go to **SMTP & API** → **API Keys**
3. Create a new API key or copy an existing one
4. Use this API key in your environment variables

## 🔧 Configuration Files

### vercel.json
- **Routing**: Handles SPA routing for all pages
- **Headers**: Security headers and caching policies
- **Redirects**: Clean URL redirects
- **Assets**: Optimized caching for static files

### .vercelignore
- Excludes development files from deployment
- Reduces bundle size
- Improves build performance

## 📁 File Structure for Deployment

```
/
├── dist/                    # Build output (generated)
├── public/                  # Static assets
│   ├── manifest.json       # PWA manifest
│   ├── robots.txt          # SEO robots file
│   └── sitemap.xml         # SEO sitemap
├── src/                    # Source code
├── vercel.json             # Vercel configuration
├── .vercelignore           # Vercel ignore file
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite configuration
```

## 🌐 Custom Domain Setup

1. **Add Domain in Vercel Dashboard**:
   - Go to Project Settings > Domains
   - Add your custom domain (e.g., `luzihomehealth.com`)

2. **DNS Configuration**:
   ```
   Type: A
   Name: @
   Value: 76.76.19.61

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate**: Automatically provided by Vercel

## 🔍 SEO Optimization

The deployment includes:
- ✅ **Meta tags** for search engines
- ✅ **Structured data** (Schema.org)
- ✅ **Sitemap** for search engine crawling
- ✅ **Robots.txt** for crawler instructions
- ✅ **PWA manifest** for mobile optimization

## 📊 Performance Features

- **Static Asset Caching**: 1 year cache for images, fonts, CSS, JS
- **Gzip Compression**: Automatic compression
- **CDN**: Global content delivery network
- **Edge Functions**: Serverless functions at the edge
- **Image Optimization**: Automatic image optimization

## 🔒 Security Headers

- **X-Content-Type-Options**: nosniff
- **X-Frame-Options**: DENY
- **X-XSS-Protection**: 1; mode=block
- **Referrer-Policy**: strict-origin-when-cross-origin
- **Permissions-Policy**: Restricted camera, microphone, geolocation

## 🚀 Deployment Commands

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to Vercel
vercel --prod

# Check deployment status
vercel ls

# View deployment logs
vercel logs
```

## 📱 PWA Features

- **Offline Support**: Service worker for offline functionality
- **App-like Experience**: Standalone display mode
- **Installable**: Users can install as app on mobile devices
- **Push Notifications**: Ready for future notification features

## 🔄 Continuous Deployment

When connected to Git:
- **Automatic Deployments**: Every push to main branch
- **Preview Deployments**: Every pull request
- **Branch Protection**: Deploy only from main branch

## 📈 Analytics & Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Core Web Vitals**: Automatic tracking
- **Real User Monitoring**: User experience metrics
- **Error Tracking**: Automatic error reporting

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Failures**:
   ```bash
   # Check build logs
   vercel logs
   
   # Test build locally
   npm run build
   ```

2. **Environment Variables**:
   - Ensure `VITE_API_KEY` is set in Vercel dashboard
   - Redeploy after adding new environment variables

3. **Routing Issues**:
   - Check `vercel.json` routes configuration
   - Ensure all routes redirect to `index.html`

4. **Asset Loading**:
   - Verify file paths in `vercel.json`
   - Check `.vercelignore` isn't excluding needed files

## 📞 Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Luzi Home Health**: info@luzihomehealth.com

---

**Ready to deploy?** Run `vercel` in your project directory and follow the prompts! 🚀
