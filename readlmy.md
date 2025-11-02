# Deployment Plan for Sales Application

This document outlines the steps to deploy the Sales application to a free hosting provider, specifically focusing on Render, which offers free tiers for both the Node.js backend and the PostgreSQL database.

## Phase 1: Prepare for Deployment

1.  **Version Control:** Ensure your project is pushed to a Git repository (e.g., GitHub). Render integrates directly with Git.
2.  **Environment Variables:** Identify all necessary environment variables (e.g., `DATABASE_URL`, `PORT`).
    *   `DATABASE_URL`: Already obtained from Neon.
    *   `PORT`: The application defaults to `5000`, but Render will provide its own `PORT` environment variable, which the application should use. (The current code already handles `process.env.PORT || '5000'`).
3.  **Build Script:** Ensure the `package.json` has a `build` script that correctly builds both the frontend and the backend for production. (The current `build` script `vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist` seems appropriate).
4.  **Start Script:** Ensure the `package.json` has a `start` script that runs the production build. (The current `start` script `NODE_ENV=production node dist/index.js` is appropriate).

## Phase 2: Deploy to Render

1.  **Create Render Account:** Sign up for a free Render account.
2.  **New Web Service (Backend):**
    *   Connect your Git repository to Render.
    *   Create a new "Web Service".
    *   Select your repository and branch.
    *   **Build Command:** `npm install && npm run build`
    *   **Start Command:** `npm start`
    *   **Environment Variables:** Add `DATABASE_URL` with your Neon connection string. Render will automatically set the `PORT` variable.
    *   **Health Check Path:** `/` (or a more specific API endpoint if available, e.g., `/api/health`)
3.  **New PostgreSQL Database (Optional, if not using Neon):**
    *   If you decide not to use Neon, you can create a new "PostgreSQL" service on Render.
    *   Render will provide a `DATABASE_URL` for this new database, which you would then use in your web service.
4.  **Deployment:** Render will automatically build and deploy your service. Monitor the logs for any issues.

## Phase 3: Post-Deployment Verification

1.  **Access Application:** Visit the provided URL for your Render web service.
2.  **Test Functionality:** Verify that the frontend loads, and all API endpoints (creating/editing/deleting sales items, adding business metrics) work as expected.
3.  **Monitor Logs:** Check Render's logs for your service to ensure there are no runtime errors.
