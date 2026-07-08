<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/e91dbe29-765e-4e70-b4d4-c2b7f02c1d63

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set any required environment variables in a `.env` or `.env.local` file (see `.env.example` if present).
3. Run the app in development:
   `npm run dev`
4. Build for production:
   `npm run build`
5. Preview the production build locally:
   `npm run preview`

To prepare and push to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create <your-username>/<repo-name> --public --source=. --remote=origin
git push -u origin main
```
