/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4F46E5", // Indigo
                secondary: "#10B981", // Emerald
                background: "#F9FAFB", // Gray-50
                text: "#1F2937", // Gray-800
            }
        },
    },
    plugins: [],
}
