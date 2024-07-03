export const APP_CONFIG = {
  SHOW_LOGGER: process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false,
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
};
