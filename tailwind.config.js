/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primarymain: "#6C63FF", // Base purple
        primarylight: "#8B84FF", // Light purple for hover
        primarydark: "#5650CC",

        // Secondary Colors - Complementary Theme
        secondarymain: "#FF936C",  // Warm coral - complementary to primary purple
        secondarylight: "#FFB18B", // Light coral for hover
        secondarydark: "#CC7456",  // Dark coral for active states

        // Neutral Colors
        neutral: {
          light: "#F5F5F5",
          main: "#DADADA",
          dark: "#757575",
        },

        white: {
          pure: "#FFFFFF",
          light: "#FAFAFA", // Subtle light background
          dark: "#F5F5F5", // Slightly darker background
        },

        black: {
          pure: "#000000",
        },

        table: {
          light: "#F8FAFC", // Lighter background for headers
          main: "#F1F5F9", // Main color for table backgrounds
          dark: "#E2E8F0", // Darker shade for borders and hover
          stripe: "#F8FAFC", // Subtle stripe color for alternating rows
          hover: "#E0F2FE", // Sky blue tinted hover state
          border: "#CBD5E1", // Professional border color
        },

        // Status Shades
        status: {
          error: {
            light: "#EF4444", // Bright red for better visibility
            main: "#DC2626", // Strong red for primary error states
            dark: "#B91C1C", // Deeper red for emphasis
          },
          warning: {
            light: "#FBBF24",
            main: "#F59E0B",
            dark: "#D97706",
          },
          success: {
            light: "#1FDBC6",
            main: "#17B8A6",
            dark: "#129587",
          },
          info: {
            light: "#8B84FF",
            main: "#6C63FF",
            dark: "#5650CC",
          },
        },
      },
      spacing: {
        "table-cell": "1rem 1.5rem",
        "form-gap": "0.25rem",
      },
      // Add custom border styles
      borderWidth: {
        table: "1px",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      borderRadius: {
        input: "8px",
      },
      fontSize: {
        button: "0.9rem",
        input: "0.95rem",
        "input-label": "0.9rem",
        "form-label": "14px",
        error: "12px",
      },
      padding: {
        button: "8px 20px",
        input: "12px 14px",
      },
      boxShadow: {
        "button-hover": "0 2px 6px rgba(0, 0, 0, 0.2)",
      },
      backgroundColor: {
        "button-hover": "rgba(4, 100, 100, 0.04)",
      },
    },
  },
  plugins: [],
};
