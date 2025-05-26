# Blog App

A simple, modern blog application with a Node.js + GraphQL backend and a Next.js + Apollo Client frontend.

## Features

- View a list of blog posts (title & author)
- View details of a single blog post (title, content, author, date)
- Clean, attractive, and non-generic UI
- Fully typed with TypeScript
- Pagination-ready backend
- MongoDB for persistent storage

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) (App Router, TypeScript)
  - [Apollo Client](https://www.apollographql.com/docs/react/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [React](https://react.dev/)

- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Apollo Server (GraphQL)](https://www.apollographql.com/docs/apollo-server/)
  - [MongoDB](https://www.mongodb.com/) (with MongoDB Node.js Driver)
  - [dotenv](https://www.npmjs.com/package/dotenv) for environment variables

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)

### Backend Setup
1. `cd backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your MongoDB URI:
   ```env
   MONGODB_URI=mongodb://localhost:27017/blog-app
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The GraphQL API will be available at `http://localhost:4000/graphql`.

### Frontend Setup
1. `cd frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Project Structure

```
Blog-App/
├── backend/
│   ├── server.js
│   ├── schema.js
│   ├── resolvers.js
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   └── post/[id]/page.tsx
│   │   ├── graphql/queries.js
│   │   └── ...
│   └── ...
└── README.md
```

## Customization
- Tweak Tailwind classes in `frontend/src/app/page.tsx` and `frontend/src/app/post/[id]/page.tsx` for your own style.
- Backend is ready for more features (e.g., authentication, comments, post creation UI).

## License

MIT 