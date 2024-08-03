export const APP_CONFIG = {
  SHOW_LOGGER: process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false,
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  DEVELOPMENT_URL: process.env.NEXT_PUBLIC_DEVELOPMENT_URL,
  STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
};
