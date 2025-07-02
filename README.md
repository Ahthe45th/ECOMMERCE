# Mtumba Online MVP

This is a minimal Next.js + MongoDB eCommerce demo for a Kenyan second-hand clothing store.

## New Features

- Customers can sign up and log in to view their orders.
- Orders now have a workflow status (pending, processed, shipped, delivered, cancelled) editable in the admin panel.

## Development

```bash
npm install
npm run dev
```

Set `MONGODB_URI` in `.env` to connect to MongoDB. If not provided, the app
defaults to `mongodb://127.0.0.1:27017/ecommerce`. To enable email
notifications, also provide `MAILJET_API_KEY`, `MAILJET_SECRET_KEY` and
`MAILJET_FROM`.

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
