# The Blog

## Vercel deployment

1. Import this repository into Vercel. Vercel detects the Vite build automatically.
2. Add these Environment Variables in the Vercel project settings for the Production environment:
	- `VITE_CONTENTFUL_SPACE_ID`
	- `VITE_CONTENTFUL_ACCESS_TOKEN`
	- `VITE_CONTENTFUL_ENVIRONMENT` (use `master` unless a different Contentful environment is required)
3. Deploy. The included `vercel.json` keeps React Router routes working when opened or refreshed directly.

For local development, copy `.env.example` to `.env` and replace the placeholder values with the Contentful Delivery API values.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
