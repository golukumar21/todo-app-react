# To-Do Application – Run Guide

## Overview

This document explains how to run the To-Do application locally after the source code has already been provided.

The application is built using:

* React
* TypeScript
* Vite
* Tailwind CSS
* Browser Local Storage (for persistence)

No backend or database setup is required.

---

# 1. Prerequisites

Before running the application, ensure the following is installed on your system:

## Node.js

Download from:
[https://nodejs.org](https://nodejs.org)

Recommended version: **Node 18.x or later**

Verify installation by running:

```bash
node -v
npm -v
```

Both commands should return version numbers.

---

# 2. Install Dependencies

Navigate to the project root directory (the folder containing `package.json`).

Example:

```bash
cd todo-app
```

Then install all required dependencies:

```bash
npm install
```

This will install:

* React
* TypeScript
* Vite
* Tailwind CSS
* All supporting packages defined in `package.json`

---

# 3. Start the Development Server

Run the following command:

```bash
npm run dev
```

You should see output similar to:

```
Local: http://localhost:5173/
```

Open the displayed URL in your browser to view the application.

If port 5173 is already in use, Vite will automatically assign a different available port.

---

# 4. Using the Application

Once the application is running in the browser, you can:

* Add new tasks
* Edit existing tasks
* Delete tasks (with confirmation)
* Change task status (Pending → In Progress → Completed)
* Filter tasks
* Search tasks
* Collapse and expand task sections

All data is stored in the browser’s localStorage.

---

# 5. Production Build (Optional)

To create an optimized production build:

```bash
npm run build
```

The production-ready files will be generated inside the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

---

# 6. Resetting Application Data

Since the app uses browser localStorage, you can reset all tasks by:

1. Opening browser Developer Tools
2. Going to the **Application** tab
3. Selecting **Local Storage**
4. Clearing stored keys related to the app

---

# 7. Troubleshooting

## "npm not recognized"

Ensure Node.js is properly installed and added to your system PATH.

## Dependency errors

Delete `node_modules` and reinstall:

```bash
rm -rf node_modules
npm install
```

(Use `rd /s /q node_modules` on Windows.)

## Tailwind styles not applying

Ensure:

* Tailwind is installed
* Tailwind directives exist in the main CSS file
* The project was not modified incorrectly

---

# Deployment

```bash
npm run deploy
```

The application has also been deployed to **GitHub Pages** and can be accessed online at:

[https://golukumar21.github.io/todo-app-react/]

This allows the application to be used without any local installation.

---

# Summary

To run the application:

1. Install Node.js
2. Run `npm install`
3. Run `npm run dev`
4. Open the local server URL in your browser

The application will then be fully functional locally.