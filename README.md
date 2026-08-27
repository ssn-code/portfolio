# SSN Portfolio

This contains everything you need to run your portfolio app locally.

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
