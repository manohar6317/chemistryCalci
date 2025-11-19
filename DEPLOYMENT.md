# Deploying to Vercel

You can deploy this project to Vercel easily using the Vercel CLI, even without a GitHub repository.

## Prerequisites
- You need a Vercel account. Sign up at [vercel.com](https://vercel.com).

## Deployment Steps

1.  **Open your terminal** in the project directory (`chemicalc`).

2.  **Run the deploy command**:
    ```bash
    npx vercel
    ```

3.  **Follow the interactive prompts**:
    - **Set up and deploy?** `y` (Yes)
    - **Which scope do you want to deploy to?** Select your account.
    - **Link to existing project?** `N` (No)
    - **What’s your project’s name?** Press Enter to accept `chemicalc` or type a new name.
    - **In which directory is your code located?** Press Enter to accept `./`.
    - **Want to modify these settings?** `N` (No) - The auto-detected settings for Vite are usually correct.

4.  **Wait for deployment**:
    - Vercel will upload your files and build the project.
    - Once done, it will provide a **Production** URL (e.g., `https://chemicalc-xyz.vercel.app`).

## Redeploying
To deploy updates later, just run:
```bash
npx vercel --prod
```
