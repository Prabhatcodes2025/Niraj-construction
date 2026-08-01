# Niraj Shrivastav Construction

Production website for Niraj Shrivastav Construction, built with the official Next.js App Router.

## Local development

Use Node.js 22 and npm:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production checks

```bash
npm run lint
npm run build
npm run start
```

The official Next.js build writes its production output to `.next`.

## Vercel

- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Output Directory: leave empty (framework default)
- Install Command: `npm install`
- Node.js: `22.x`

No application environment variables are required. `NEXT_PUBLIC_SITE_URL` is optional and can be set to the canonical public URL for absolute social metadata. On Vercel, the automatically supplied `VERCEL_PROJECT_PRODUCTION_URL` is used when the optional variable is absent.
