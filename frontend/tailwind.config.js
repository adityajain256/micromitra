/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Relying on CSS variables defined in index.css for theme colors
            }
        },
    },
    plugins: [],
}
