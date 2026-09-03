# HerCodeHerStory - Shanika Munasinghe Frontend

link : 


Next.js App Router frontend for the HerCodeHerStory personal platform.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` from `.env.example`:

   ```bash
   cp .env.example .env
   ```

3. Set the backend API URL:

   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000/api"
   ```

4. Run the app:

   ```bash
   npm run dev
   ```

## shadcn/ui Notes

The project includes a `components.json` file and local shadcn-style primitives under `components/ui`.
To add more official shadcn/ui components later, run:

```bash
npx shadcn@latest add dialog tabs dropdown-menu form
```

The current UI primitives already cover buttons, cards, badges, dialogs, inputs, textareas and skeletons.

## Pages

- `/`
- `/about`
- `/stories`
- `/stories/[slug]`
- `/projects`
- `/certificates`
- `/achievements`
- `/timeline`
- `/gallery`
- `/contact`
- `/resume`

## API Integration

All API calls live in `lib/api.ts` and use `NEXT_PUBLIC_API_URL`.
The pages handle missing backend data with empty states so the frontend can still build before the backend is running.
