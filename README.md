# Big4India Backend API

A secure, production-ready backend API for the Big4India business services website.

## 🔒 Security Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Rate Limiting**: Configurable rate limiting to prevent abuse
- **Input Validation**: Comprehensive input validation and sanitization
- **Security Headers**: Helmet.js for security headers
- **CORS Protection**: Configurable CORS policies
- **Password Security**: Bcrypt with salt rounds for password hashing
- **SQL Injection Protection**: Parameterized queries with Supabase
- **XSS Protection**: Input sanitization middleware

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Supabase account
- Environment variables configured

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Connect to Supabase:
   - Click "Connect to Supabase" button in the top right
   - Your database schema will be automatically created

4. Start development server:
```bash
npm run dev
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token

### Contact Management
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/submissions` - Get contact submissions (Admin)
- `PUT /api/contact/submissions/:id` - Update submission status (Admin)

### Service Management
- `GET /api/services` - Get available services
- `POST /api/services/inquiry` - Submit service inquiry
- `GET /api/services/inquiries` - Get service inquiries (Admin)
- `PUT /api/services/inquiries/:id` - Update inquiry status (Admin)

### System
- `GET /api/health` - Health check endpoint

## 🛡️ Security Configuration

### Rate Limiting
- Global: 100 requests per 15 minutes
- Auth endpoints: 5 attempts per 15 minutes
- Contact form: 3 submissions per hour
- Service inquiries: 5 inquiries per hour

### User Roles
- `user`: Basic user access
- `manager`: Can manage submissions and inquiries
- `admin`: Full system access

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

## 🗄️ Database Schema

### Users Table
- User authentication and profile data
- Role-based access control
- Activity tracking

### Contact Submissions Table
- Contact form submissions
- Status tracking and notes
- IP and user agent logging

### Service Inquiries Table
- Service-specific inquiries
- Company information
- Requirements and status tracking

## 🔧 Environment Variables

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# Supabase Configuration
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Production Considerations
- Use strong JWT secrets
- Configure proper CORS origins
- Set up SSL/TLS certificates
- Configure reverse proxy (nginx)
- Set up monitoring and logging
- Regular security updates

## 📝 API Usage Examples

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### Submit Contact Form
```bash
curl -X POST http://localhost:3000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "subject": "GST Registration Inquiry",
    "message": "I need help with GST registration for my new business."
  }'
```

### Submit Service Inquiry
```bash
curl -X POST http://localhost:3000/api/services/inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "serviceType": "gst",
    "name": "Business Owner",
    "email": "owner@business.com",
    "phone": "+1234567890",
    "companyName": "My Business Ltd",
    "requirements": "Need complete GST registration and monthly filing services."
  }'
```

## 🔍 Monitoring

The API includes comprehensive logging and error handling:
- Request/response logging with Morgan
- Global error handling
- Health check endpoint
- Security event logging

## 🤝 Contributing

1. Follow TypeScript best practices
2. Add proper error handling
3. Include input validation
4. Write comprehensive tests
5. Update documentation

## 📄 License

This project is proprietary software for Big4India.