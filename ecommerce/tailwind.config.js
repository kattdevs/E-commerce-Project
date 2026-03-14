
export default {
  // Tell Tailwind which files contain class names
  // Without this, Tailwind removes all classes in production
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // From Figma 'Colors' panel: #EDEDED
        'app-bg': '#EDEDED',
        // Primary blue used on Checkout button and links
        'primary': '#2563EB',
        // Dark navy used in headings like 'SHIPPING ADDRESS'
        'navy': '#1E3A5F',
        // CTA black: 'Add Address', 'Place your order' buttons
        'cta': '#111827',
        // Star rating amber
        'star': '#F59E0B',
        // Order Total red in checkout
        'order-red': '#EF4444',
        // Subtle gray text for variant labels
        'subtle': '#6B7280',
      },
      fontFamily: {
        // Figma uses a clean sans-serif
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        // Figma shows 16px radius on all cards
        'card': '16px',
      },
    },
  },
  plugins: [],
}

