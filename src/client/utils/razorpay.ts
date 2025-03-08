export const loadRazorpay = (): Promise<typeof window.Razorpay> => {
  return new Promise((resolve, reject) => {
    console.log('Checking if Razorpay is already loaded...');
    if (typeof window !== 'undefined' && window.Razorpay) {
      console.log('Razorpay is already loaded');
      resolve(window.Razorpay);
      return;
    }

    console.log('Loading Razorpay script...');
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded');
      if (typeof window !== 'undefined' && window.Razorpay) {
        console.log('Razorpay object available');
        resolve(window.Razorpay);
      } else {
        console.error('Razorpay object not found after script load');
        reject(new Error('Razorpay failed to load'));
      }
    };
    script.onerror = (error) => {
      console.error('Failed to load Razorpay script:', error);
      reject(new Error('Failed to load Razorpay script'));
    };

    document.body.appendChild(script);
  });
}; 