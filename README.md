# GitHub Profile Analyzer

A React-based web application that allows users to analyze GitHub profiles, view repositories, and visualize contribution patterns. Built with React, TypeScript, and Vite.

![GitHub Profile Analyzer](public/Screenshot.png)

![GitHub Profile Analyzer](public/Screenshot%202025-04-09%20161609.png)

## Features

- 🔍 Search for any GitHub user
- 📊 View contribution graphs
- 📚 List of public repositories
- 🎨 Beautiful UI with Tailwind CSS
- ⚡ Fast and responsive

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- GitHub Personal Access Token

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/github-profile-analyzer.git
cd github-profile-analyzer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```env
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Deployment Instructions

### Deploy with Vercel

1. **Prepare Your Repository**
   ```bash
   # Initialize git if not already done
   git init
   
   # Add and commit your changes
   git add .
   git commit -m "Initial commit"
   
   # Push to GitHub
   git remote add origin https://github.com/yourusername/github-profile-analyzer.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com) and sign in with GitHub
   - Click on "New Project"
   - Import your GitHub repository
   - Configure project settings:
     - Framework Preset: Select `Vite`
     - Build Settings: Leave as default
     - Root Directory: `./`
   
3. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add the following variable:
     ```env
     VITE_GITHUB_TOKEN=your_github_personal_access_token
     ```
   - Make sure to add this variable to all environments (Production, Preview, Development)

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application
   - Once complete, you'll get a deployment URL (e.g., `https://your-app.vercel.app`)

5. **Custom Domain (Optional)**
   - In your project settings, go to "Domains"
   - Add your custom domain
   - Follow Vercel's DNS configuration instructions

### Automatic Deployments

Vercel automatically deploys:
- Every push to main branch → Production
- Every pull request → Preview deployment

### Troubleshooting

If your deployment fails:
1. Check build logs in Vercel dashboard
2. Verify environment variables are set correctly
3. Ensure all dependencies are properly listed in `package.json`
4. Confirm Vite configuration is correct
5. Check if GitHub token has required permissions
## Environment Variables

The following environment variables are required:

- `VITE_GITHUB_TOKEN`: Your GitHub Personal Access Token

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- GitHub API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
