export const NODE_ENV = process.env.NODE_ENV || 'development';

export const isDevelopment = NODE_ENV === 'development';
export const isProduction = NODE_ENV === 'production';

export const getEnvVariable = (key: string, required: boolean = true): string => {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value || '';
};

export const config = {
  mongodb: {
    uri: getEnvVariable('MONGODB_URI'),
    dbName: isProduction ? 'course_platform' : 'course_platform_dev',
    options: {
      maxPoolSize: isProduction ? 5 : 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      retryReads: true,
    },
  },
  razorpay: {
    keyId: getEnvVariable('RAZORPAY_KEY_ID'),
    keySecret: getEnvVariable('RAZORPAY_KEY_SECRET'),
  },
  smtp: {
    enabled: !!getEnvVariable('SMTP_HOST', false),
    host: getEnvVariable('SMTP_HOST', false),
    port: getEnvVariable('SMTP_PORT', false) ? Number(getEnvVariable('SMTP_PORT', false)) : undefined,
    user: getEnvVariable('SMTP_USER', false),
    pass: getEnvVariable('SMTP_PASS', false),
  },
}; 