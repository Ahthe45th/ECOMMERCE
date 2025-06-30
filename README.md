# Mtumba Online MVP

This is a minimal Next.js + MongoDB eCommerce demo for a Kenyan second-hand clothing store.

## Development

```bash
npm install
npm run dev
```

Set `MONGODB_URI` in `.env` to connect to MongoDB. To enable email notifications,
also provide `MAILJET_API_KEY`, `MAILJET_SECRET_KEY` and `MAILJET_FROM`.

## Production

Install dependencies and create an optimized build:

```bash
npm install
npm run build
```

`next build` compiles the application and generates Tailwind CSS styles.

Start the production server with:

```bash
npm start
```
