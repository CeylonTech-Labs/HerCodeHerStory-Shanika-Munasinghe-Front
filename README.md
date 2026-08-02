# HerCodeHerStory - Shanika Munasinghe Frontend

link : https://her-code-her-story-shanika-munasing.vercel.app/ 


Next.js App Router frontend for the HerCodeHerStory personal platform.

This project is hosted as one Vercel Next.js app. It does not require the separate Express backend or Cloudinary.

## How Data Works

Content operations are handled through `lib/content.ts` and exposed through `lib/api.ts`.

When `DATABASE_URL` is configured on Vercel, the app uses Next.js API routes in this same frontend project to save one shared content snapshot in MySQL. This makes public content visible to all visitors and devices.

If `DATABASE_URL` is not configured, the app falls back to browser `localStorage`.

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

Uploaded media is saved as browser data URLs inside the shared content snapshot.

Important: large uploaded images can make the content snapshot heavy. Prefer optimized/compressed images for Vercel and MySQL storage.

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

For shared content locally, add the same environment variables shown below.

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
Environment Variables:

DATABASE_URL
ADMIN_EMAIL
ADMIN_PASSWORD
ADMIN_SESSION_SECRET
```

Use your AlwaysData MySQL connection for `DATABASE_URL`.

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE_NAME"
ADMIN_EMAIL="shanika.uok2@gmail.com"
ADMIN_PASSWORD="your-admin-password"
ADMIN_SESSION_SECRET="a-long-random-secret"
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
