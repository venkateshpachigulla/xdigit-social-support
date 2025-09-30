This project includes a compact `src/index.css` that intentionally keeps only the minimal utilities and overrides required for the app to function while migrating to Tailwind.

Goal

- Replace the small utility classes in `src/index.css` with real Tailwind utilities and remove the overrides when possible.

Recommended steps

1. Install Tailwind (dev):
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p

2. Update `tailwind.config.js` to include your source files (JSX/TSX):
   module.exports = {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: { extend: {} },
   plugins: [],
   }

3. Replace the minimal utility block in `src/index.css` with Tailwind's base/components/utilities import:
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   Keep a small section at the bottom for critical browser fixes like autofill and date pickers if necessary.

4. Gradually replace usages of the small helper classes (e.g. `.p-4`, `.max-w-3xl`) and the bespoke `.btn-*` classes in your JSX with Tailwind utility classes. Do this file by file and run the app to check visual regressions.

5. Once a component is migrated, remove the related helper CSS rules from `src/index.css`.

Helpful tips

- Use a codemod or search/replace to update classes. Rewriting className strings is usually quick with regex but be careful with dynamically composed class names.
- Keep `app-card` overrides until you migrate all form controls to Tailwind and verify autofill/date picker visuals across browsers.
- Prefer the official Tailwind forms plugin for consistent form styles: `@tailwindcss/forms`.

If you'd like, I can:

- Add `tailwind.config.js` and a minimal `postcss.config.js` file as examples.
- Run a pass to replace a few components (e.g., `App.tsx` and `ApplicationForm.tsx`) to use Tailwind classes and remove corresponding helpers.
- Create a small codemod to automatically map a handful of helper classes to Tailwind equivalents.
