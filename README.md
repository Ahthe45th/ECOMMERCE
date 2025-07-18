# Mtumba Online MVP

This is a minimal Next.js + MongoDB eCommerce demo for a Kenyan second-hand clothing store.

## New Features

- Customers can sign up and log in to view their orders.
- Orders now have a workflow status (pending, processed, shipped, delivered, cancelled) editable in the admin panel.
- Admins can bulk import products from a CSV or JSON file.
- Product images can be uploaded to a Google Cloud Storage bucket.

## Development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and update the values for your environment. Set
`MONGODB_URI` in `.env` to connect to MongoDB. If not provided, the app
defaults to `mongodb://127.0.0.1:27017/ecommerce`. To enable email
notifications, also provide `MAILJET_API_KEY`, `MAILJET_SECRET_KEY` and
`MAILJET_FROM`.

To upload product images to Google Cloud Storage, set `GCS_BUCKET_NAME` and
`GOOGLE_APPLICATION_CREDENTIALS`. In a traditional environment this should be
the path to a service account JSON file. On serverless platforms such as
Vercel, you can instead store the JSON itself in the environment variable; the
API route will write it to a temporary file at runtime. The optional
`GCP_PROJECT_ID` can also be specified if not included in the credentials file.
An example bucket name is `my-form-uploads`, which is provided in `.env.example`.

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

## Bulk Import of Products

Admins can upload a JSON or CSV file containing multiple products.
Navigate to `/admin` and use the **Import Products** form to select a file.
The CSV must include a header row with the following fields:

```
name,description,price,imageUrl,size,gender,category,color
```

JSON files should contain an array of product objects with the same fields.

Alternatively you can call the API directly:

```bash
curl -X POST http://localhost:3000/api/products/bulk \
  -H "Content-Type: application/json" \
  --cookie "admin-token=YOURTOKEN" \
  -d '[{"name":"Shirt","description":"Blue","price":10,"imageUrl":"/img.jpg","size":"M","gender":"M","category":"tops","color":"blue"}]'
```
