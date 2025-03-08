export function getEnvVariable(key: keyof NodeJS.ProcessEnv): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

export const config = {
  mongodb: {
    uri: getEnvVariable('MONGODB_URI'),
    database: getEnvVariable('MONGODB_DB')
  },
  razorpay: {
    keyId: getEnvVariable('RAZORPAY_KEY_ID'),
    keySecret: getEnvVariable('RAZORPAY_KEY_SECRET')
  },
  smtp: {
    host: getEnvVariable('SMTP_HOST'),
    port: parseInt(getEnvVariable('SMTP_PORT')),
    user: getEnvVariable('SMTP_USER'),
    password: getEnvVariable('SMTP_PASSWORD'),
    from: getEnvVariable('SMTP_FROM')
  },
  app: {
    url: getEnvVariable('NEXT_PUBLIC_APP_URL')
  }
}; 