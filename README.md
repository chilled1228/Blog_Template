This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## CSS Optimization

This project uses PurgeCSS to remove unused CSS in production builds. The optimization is automatically applied when running:

```bash
npm run build
```

This will:
1. Build the Next.js application
2. Automatically run PurgeCSS to remove unused CSS from the generated CSS files

The PurgeCSS configuration can be found in `purgecss.config.js` and includes safelisting for commonly used dynamic classes.

To manually run the CSS optimization after building:
```bash
npm run postbuild
```

## Understanding CSS Optimization

**Important**: Your source `src/app/globals.css` file will always show the full 2500+ lines because:
- This is your development file that needs to remain complete
- PurgeCSS works on the compiled output, not source files
- The actual optimization happens in the build process
- Only unused CSS in the compiled output is removed

To understand how the optimization works:
```bash
npm run css-explain
```

## Utility Scripts

The project includes several utility scripts to help you understand and manage CSS optimization:

```bash
# View CSS statistics (size, line count, etc.)
npm run css-stats

# Compare CSS before and after optimization
npm run css-compare

# Explain why globals.css still shows 2500+ lines
npm run css-explain
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.