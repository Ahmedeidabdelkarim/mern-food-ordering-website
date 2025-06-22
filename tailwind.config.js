/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors:{
            primary: "#f13a01",
            /* secondary: "#f59e0b",
            accent: "#10b981",
            neutral: "#374151",
            "base-100": "#ffffff",
            info: "#3b82f6",
            success: "#16a34a",
            warning: "#f59e0b",
            error: "#ef4444", */
        }
    },
  },
  plugins: [],
}