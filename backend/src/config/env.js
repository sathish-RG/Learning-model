import 'dotenv/config';

const required = ['MONGO_URI', 'JWT_SECRET'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

if (process.env.NODE_ENV === 'production' && process.env.JWT_SECRET.length < 32) {
  console.error('JWT_SECRET must be at least 32 characters in production');
  process.exit(1);
}

const COOKIE_SAME_SITE_VALUES = ['lax', 'strict', 'none'];
const cookieSameSite = (process.env.COOKIE_SAME_SITE || 'lax').toLowerCase();
if (!COOKIE_SAME_SITE_VALUES.includes(cookieSameSite)) {
  console.error(`COOKIE_SAME_SITE must be one of: ${COOKIE_SAME_SITE_VALUES.join(', ')}`);
  process.exit(1);
}

// Single source of truth for configuration — never read process.env elsewhere
const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  cookieSameSite,
  // Browsers reject SameSite=None cookies that aren't Secure
  cookieSecure: process.env.NODE_ENV === 'production' || cookieSameSite === 'none',
});

export default env;
