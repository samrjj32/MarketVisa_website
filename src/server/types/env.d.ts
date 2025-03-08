declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      MONGODB_DB: string;
      NODE_ENV: 'development' | 'production' | 'test';
      RAZORPAY_KEY_ID: string;
      RAZORPAY_KEY_SECRET: string;
      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_USER: string;
      SMTP_PASSWORD: string;
      SMTP_FROM: string;
      NEXT_PUBLIC_APP_URL: string;
    }
  }
}

export {}; 