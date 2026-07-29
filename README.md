# HerCodeHerStory - Shanika Munasinghe Frontend

Next.js App Router frontend for the HerCodeHerStory personal platform.

This project is now frontend-only for Vercel hosting. It does not require the Express backend, database, Cloudinary, JWT secrets, or `NEXT_PUBLIC_API_URL`.

## How Data Works

All content operations are handled in the browser through `lib/content.ts` and exposed through `lib/api.ts`.

- Admin login
- Posts and stories
- Categories and tags
- Projects
- Certificates
- Achievements
- Timeline events
- Media uploads
- Comments
- Reactions
- Contact messages
- Profile settings
- Dashboard stats

Uploaded media is saved as browser data URLs in `localStorage`.

Important: because there is no hosted backend/database, admin changes are stored per browser/device. They will persist in the same browser, but they are not shared across visitors or devices.

To move edited content from localhost to Vercel:

1. Open the localhost admin dashboard.
2. Go to `/admin/settings`.
3. Click `Export`.
4. Open the deployed Vercel admin dashboard.
5. Go to `/admin/settings`.
6. Click `Import` and choose the exported JSON file.

## Admin Login

```txt
Email: shanika.uok2@gmail.com
Password: 21PQshani@
```

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the app:

   ```bash
   npm run dev
   ```

No `.env` values are required for frontend-only mode.

## Vercel Deployment

Deploy only this frontend folder:

```txt
HerCodeHerStory-Shanika-Munasinghe-Front
```

Recommended Vercel settings:

```txt
Framework Preset: Next.js
Build Command: npm run build
Install Command: npm install
Output Directory: .next
Environment Variables: none required
```

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
- `/admin/login`
- `/admin/dashboard`

## UI Notes

The project includes a `components.json` file and local shadcn-style primitives under `components/ui`.
The current UI primitives cover buttons, cards, badges, dialogs, inputs, textareas and skeletons.
