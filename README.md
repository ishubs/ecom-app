This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Run the development server:

```bash
npm run dev
# or
pnpm dev
```

### Build the project:

```bash
npm run build
# or
pnpm build
```

### Start the production server:

```bash
npm run start
# or
pnpm start
```

### Run tests:

```bash
npm run test
# or
pnpm test
```

## Trade-offs Made

1. **Faker API Limitations**:
   - Faker API does not offer a product detail API, so the details page might not always show the clicked product since Faker generates random products each time.
   - Faker API does not have a search by name function, so we fetch the top 100 products instead.

## Future Improvements

1. Enhance responsiveness, particularly in the navbar and other components.
2. Improve user experience by adding a loading indicator when navigating to a product or performing a search.

## Architectural Decisions

- **Next.js**:
  - Utilized for its server-side rendering (SSR) and static site generation (SSG) capabilities, improving performance and SEO.
  - API routes handle product fetching from Faker API efficiently.

- **Redux**:
  - Used for global state management to maintain consistency in the product list and cart state.
  
- **Testing**:
  - Implemented unit tests for critical components using Jest and React Testing Library.
  - Ensured Redux store functionality through reducer and action tests.

Live product Link
https://magenta-selkie-7d63fc.netlify.app/