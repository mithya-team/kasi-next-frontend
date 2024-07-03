# Next.js + Tailwind CSS + TypeScript Boilerplate

<div align="center">
  <h2>ts-nextjs-tailwind-boilerplate</h2>
  <p>Next.js + Tailwind CSS + TypeScript Boilerplate</p>
  <p>Made by <a href="https://mithyalabs.com">Mithyalabs</a></p>
</div>

## Features

This repository is packed with:

- ⚡️ Next.js 13 with App Router
- ⚛️ React 18
- ✨ TypeScript
- 💨 Tailwind CSS 3 — Configured with CSS Variables to extend the **primary** color
- 💎 Pre-built Components — Components that will **automatically adapt** with brand color
- 📈 Absolute Import and Path Alias — Import components using `@/` prefix and static assets using `~/`
- 📏 ESLint & Prettier — Will also **auto sort** your imports
- 🐶 Husky & Lint Staged — Run scripts on your staged files before they are committed
- 🔥 Snippets — A collection of useful snippets
- 🗺 Site Map — Automatically generate sitemap.xml
- ✨ SVGR Support - import svg icons directly as a React Component

## Getting Started

### 1. Clone this template using one of the two ways

1. Using `create-next-app`

   ```bash
   npx create-next-app -e https://github.com/mithya-team/ts-nextjs-tailwind-boilerplate project-name
   ```

2. Using `degit`

   ```bash
   npx degit mithya/ts-nextjs-tailwind-boilerplate YOUR_APP_NAME
   ```

### 2. Install dependencies

Use **yarn** to ensure the husky hooks can work properly.

```bash
yarn install
```

### 3. Run the development server

You can start the server using this command:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/pages/index.tsx`.

### 4. Change defaults

There are some things you need to change including title, urls, favicons, etc.

Find all comments with !INITIAL_CONFIG, then follow the guide.

Don't forget to change the package name in package.json

## Todo

- Add SVGR Support
- Configure favicons
- Add models
- Fix husky

## Resources

- Use Svgr in React based project: [link](https://blog.logrocket.com/how-to-use-svgs-react/)
- Configuring Svgr for nextjs: [link](https://react-svgr.com/docs/next/)
- SVGR Support **(Does not supports React Props Type)**
- Override the next-env if the type is important: [link](https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration)
- Add Custom fonts: [link](https://blog.logrocket.com/how-to-use-custom-fonts-tailwind-css/)

## Recommendations

- Use HybridButton Link over Button and Link
- Add reusable or shared components, layout in src/components and src/layout diirectory respectively
- Use logger from src/lib/logger over console
- Abstract the UI and business logic into hooks or context.
- Prefer context over hooks to write logic
