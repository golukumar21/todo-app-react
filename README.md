# To-Do Application Setup & Run Guide

## Overview

This document explains how to set up, install, and run the To-Do application locally. The application is built using:

* React
* TypeScript
* Vite
* Tailwind CSS
* Local Storage (for data persistence)

No backend or database is required.

---

# 1. Prerequisites

Before starting, ensure you have the following installed:

### Node.js

Download and install from:
[https://nodejs.org](https://nodejs.org)

Recommended version: **18.x or later**

Verify installation:

```bash
node -v
npm -v
```

---

# 2. Create the Project

Open a terminal and run:

```bash
npm create vite@latest todo-app
```

When prompted, select:

* Framework: **React**
* Variant: **TypeScript**

Then:

```bash
cd todo-app
npm install
```

---

# 3. Install Tailwind CSS

Install required packages:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configure `tailwind.config.js`

Update the content section:

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

# 4. Configure Tailwind in CSS

Open `src/index.css` (or `App.css`) and add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

# 5. Replace Source Files

Replace the contents of the `src/` directory with the provided application files:

* `App.tsx`
* `main.tsx`
* `types.ts`
* `constants.ts`
* `components/Header.tsx`
* `components/TaskItem.tsx`
* `components/TaskForm.tsx`
* `components/ConfirmModal.tsx`

Ensure the folder structure matches the project layout.

---

# 6. Run the Application

Start the development server:

```bash
npm run dev
```

You should see output similar to:

```
Local: http://localhost:5173/
```

Open the URL in your browser.

---

# 7. Build for Production

To generate a production build:

```bash
npm run build
```

The optimized files will be generated in the `dist/` folder.

To preview the production build:

```bash
npm run preview
```

---

# 8. Application Features

* Add new tasks
* Edit tasks
* Delete tasks with confirmation
* Status transitions (Pending → In Progress → Completed)
* Search functionality
* Filter by status
* Collapsible task sections
* Local storage persistence
* Mobile-responsive layout

---

# 9. Data Storage

The application uses **browser localStorage**.

Stored keys:

* `todotasks`
* `tasks_filter`

To reset the app:

1. Open browser DevTools
2. Go to Application → Local Storage
3. Clear stored keys

---

# 10. Troubleshooting

### Port already in use

If port 5173 is busy, Vite will automatically assign another port.

### Node version errors

Ensure you are using Node 18+.

### Tailwind not working

Verify:

* Tailwind directives are added to CSS
* `content` paths are correct

---

# 11. Summary

This application is a client-side To-Do management tool built with modern React tooling. It requires no backend and can be deployed easily to platforms such as:

* Vercel
* Netlify
* GitHub Pages

The setup process typically takes under 10 minutes.
