import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary-color)',
                secondary: 'var(--secondary-color)',
                tertiary: 'var(--tertiary-color)',
            },
            fontFamily: {
                primary: 'var(--primary-font)',
                secondary: 'var(--secondary-font)',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
export default config;
