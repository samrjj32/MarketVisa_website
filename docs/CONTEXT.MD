# Online Course Selling Website

A comprehensive technical and functional overview of our online course platform.

## Technology Stack

- **Frontend:** Next.js (SSR & SEO optimized)
- **Backend:** Next.js API routes / Node.js with Express
- **Database:** MongoDB 
- **Payments:** Razorpay
- **Hosting:** Vercel 

## Website Structure

### 1. Homepage

#### Header
- Navigation (Home, Courses, About, Contact)
- Hero section with instructor image
- Course value proposition
- "Enroll Now" CTA

#### Main Content
- Course overview and benefits
- Instructor introduction
  - Profile and credentials
  - Experience highlights
- Upcoming live sessions
- Pricing details
- Student testimonials
- FAQ section

#### Footer
- Contact information
- Social media links
- Legal documents

### 2. Course Details

- Curriculum breakdown
- Learning outcomes
- Instructor details
- Student reviews
- Pricing and enrollment options

### 3. Registration Flow

1. **User Details Collection**
   ```typescript
   interface UserDetails {
     name: string;
     email: string;
     phone: string;
   }
   ```

2. **Payment Integration**
   ```typescript
   interface PaymentDetails {
     amount: number;
     orderId: string;
     userDetails: UserDetails;
   }
   ```

3. **Access Provision**
   - Send course access via email
   - No login required
   - Direct access links

### 4. Learning Dashboard

- Video player with progress tracking
- Downloadable resources
- Assessment system
- Course completion certification

## Additional Features

- Affiliate program
- Notification system
- SEO optimization
- Security implementations

## Technical Infrastructure

### Deployment
- Frontend/API: Vercel
- Database: Cloud-hosted MongoDB/PostgreSQL
- Storage: AWS S3
- Payments: Razorpay

### Future Roadmap

1. User Authentication
2. Administrative Dashboard
3. Community Features
   - Discussion forums
   - Q&A platform
   - Live chat

## Security & Compliance

- HTTPS encryption
- Secure payment processing
- Data protection measures
- Privacy policy compliance

## Monitoring & Analytics

- User engagement tracking
- Course completion rates
- Payment analytics
- Performance metrics

## Payments Collection

```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "amount": Number,
  "razorpayPaymentId": String,
  "razorpayOrderId": String,
  "status": ["pending" | "successful" | "failed"],
  "userDetails": {
    "name": String,
    "email": String,
    "phone": String
  },
  "createdAt": Timestamp
}
```

## User Flow (Simplified)

1. **Landing Page View**
   - User sees instructor hero image
   - Course details
   - Pricing
   - "Buy Now" button

2. **Registration Form**
   - Simple form collecting:
     - Name
     - Email
     - Phone number
   - No password required
   - No account creation

3. **Payment Flow**
   - Razorpay integration
   - Direct payment processing
   - Instant access via email

## Project Structure (Simplified)

📦 course-platform
├── 📂 src
│   ├── 📂 app
│   │   ├── page.tsx (Landing page)
│   │   ├── 📂 register
│   │   │   └── page.tsx (User details form)
│   │   └── 📂 payment
│   │       └── page.tsx (Payment handling)
│   ├── 📂 components
│   │   ├── 📂 common
│   │   │   ├── Button.tsx
│   │   │   └── Input.tsx
│   │   ├── 📂 forms
│   │   │   └── UserDetailsForm.tsx
│   │   └── 📂 layout
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── 📂 lib
│   │   ├── 📂 db
│   │   │   └── mongodb.ts
│   │   └── 📂 razorpay
│   │       └── payment.ts
│   └── 📂 types
├── 📂 public
└── 📂 config

```

## API Routes (Simplified)

```
📂 src/app/api
├── 📂 register
│   └── route.ts (Handle user details submission)
└── 📂 payments
    ├── create-order.ts
    └── webhook.ts
```

## Technical Simplification

- No authentication system
- No user sessions
- Single course/webinar focus
- Email-based access delivery
- Simplified database schema
- Minimal API endpoints

## Implementation Plan

### Phase 1: Basic Setup & Landing Page (1-2 days)

1. **Project Initialization**
   ```bash
   npx create-next-app@latest course-platform --typescript --tailwind --eslint
   ```

2. **Initial Project Structure**
   ```
   📦 course-platform
   ├── 📂 src
   │   ├── 📂 app
   │   │   ├── page.tsx
   │   │   └── layout.tsx
   │   ├── 📂 components
   │   └── 📂 lib
   ```

3. **Core Components Development**
   - Header with navigation
   - Hero section
   - Course benefits section
   - Pricing section
   - Footer

### Phase 2: Registration Flow (2-3 days)

1. **User Details Form**
   - Create registration page
   - Form validation
   - Basic error handling

2. **MongoDB Setup**
   ```bash
   npm install mongodb mongoose
   ```
   - Configure database connection
   - Create user schema
   - Implement API route for user registration

### Phase 3: Payment Integration (2-3 days)

1. **Razorpay Setup**
   ```bash
   npm install razorpay
   ```
   - Create test account
   - Implement order creation
   - Setup payment verification

2. **Payment Flow**
   - Payment page development
   - Success/failure handling
   - Webhook implementation

### Phase 4: Course Access & Email (1-2 days)

1. **Email Integration**
   ```bash
   npm install nodemailer
   ```
   - Setup email templates
   - Configure email service
   - Implement course access email

2. **Course Access Page**
   - Create protected course page
   - Implement video player
   - Add downloadable resources section

### Phase 5: Testing & Deployment (2-3 days)

1. **Testing**
   - Form submission testing
   - Payment flow testing
   - Email delivery testing
   - Mobile responsiveness

2. **Deployment**
   - Vercel setup
   - Environment variables configuration
   - Domain setup
   - SSL configuration

### Phase 6: Analytics & Monitoring (1-2 days)

1. **Analytics Setup**
   ```bash
   npm install @vercel/analytics
   ```
   - Implement basic analytics
   - Setup conversion tracking
   - Configure error monitoring

2. **Final Testing**
   - End-to-end testing
   - Performance optimization
   - Security checks

## Development Guidelines

### Code Organization

1. **Components Structure**
   ```
   📂 components
   ├── 📂 common
   │   ├── Button.tsx
   │   └── Input.tsx
   ├── 📂 layout
   │   ├── Header.tsx
   │   └── Footer.tsx
   └── 📂 sections
       ├── Hero.tsx
       └── Pricing.tsx
   ```

2. **API Routes Structure**
   ```
   📂 app/api
   ├── 📂 register
   │   └── route.ts
   └── 📂 payments
       ├── create-order.ts
       └── webhook.ts
   ```

### Best Practices

1. **Code Quality**
   - Use TypeScript for type safety
   - Implement proper error handling
   - Follow ESLint rules
   - Write clean, documented code

2. **Performance**
   - Optimize images
   - Implement lazy loading
   - Use proper caching strategies
   - Minimize bundle size

3. **Security**
   - Validate all inputs
   - Implement rate limiting
   - Secure API endpoints
   - Handle sensitive data properly

---

> Note: This document serves as a living specification and will be updated as the project evolves.
