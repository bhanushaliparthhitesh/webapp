# Big4India - Professional Tax and Business Services

A modern, responsive website for Big4India offering comprehensive tax and business services including GST registration, income tax filing, business incorporation, compliance services, and more.

## 🚀 Features

- **Tax Services**: Income tax filing, GST registration and compliance
- **Business Incorporation**: Private Limited, OPC, LLP company formation
- **Compliance Services**: MCA filings, annual returns, audit support
- **Legal Services**: Trademark registration and intellectual property
- **Modern UI**: Responsive design with smooth animations
- **Interactive Tools**: Tax calculators and estimation tools

## �️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Icons**: Feather Icons
- **Animations**: Custom CSS animations with Intersection Observer API
- **Testing**: Playwright
- **Deployment**: Vercel

## 📁 Project Structure

```
webapp/
├── index.html              # Homepage
├── about-us.html          # About page
├── contactus.html         # Contact page
├── carrer.html           # Career page
├── gst.html              # GST services
├── Income-Taxes.html     # Income tax services
├── business-incorporation.html # Business incorporation
├── compliance.html       # Compliance services
├── mca.html             # MCA services
├── trademark.html       # Trademark services
├── registration-services.html # Registration services
├── Blog/                # Blog articles
│   ├── llp.html        # LLP guide
│   ├── opc.html        # OPC guide
│   └── pvt-ltd.html    # Private Limited guide
├── features/           # Interactive tools
│   ├── calculator.html # General calculator
│   └── income-tax-calculator.html # Tax calculator
├── images/            # Static images
├── video/            # Video content
├── tests/            # Playwright tests
├── vercel.json       # Vercel configuration
├── package.json      # Node.js dependencies
└── README.md         # This file
```

## � Deployment on Vercel

### Prerequisites
- Node.js (18.0.0 or higher)
- Git
- Vercel account

### Quick Deploy

1. **Fork or clone this repository**
   ```bash
   git clone <your-repo-url>
   cd webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Deploy to Vercel**
   
   **Option A: Using Vercel CLI**
   ```bash
   npm install -g vercel
   vercel
   ```
   
   **Option B: Using Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Deploy automatically

4. **Custom Domain (Optional)**
   - Add your custom domain in Vercel dashboard
   - Update DNS settings as instructed

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

## 🔧 Configuration

### Vercel Configuration (`vercel.json`)
- Configured for static site hosting
- Optimized caching headers for assets
- Security headers included
- Clean URL routing

### Environment Variables
No environment variables required for this static site.

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px  
- **Mobile**: Below 768px

## 🎨 Customization

### Colors
- Primary: Orange (`#F97316`)
- Secondary: Blue variations
- Background: White and light grays

### Fonts
- Primary: Inter (Google Fonts)
- Fallback: System fonts

### Animations
- Smooth scroll animations
- Elastic loading effects
- Hover transitions
- Mobile-friendly interactions

## 🧪 Testing

```bash
# Run Playwright tests
npm test

# Run tests in headed mode
npx playwright test --headed

# Generate test report
npx playwright show-report
```

## 📞 Support Services

- **GST Registration & Filing**
- **Income Tax Returns**
- **Company Registration** (Pvt Ltd, OPC, LLP)
- **Trademark Registration**
- **MCA Compliance**
- **Annual Returns**
- **Audit Services**

## 📧 Contact

- **Website**: [Your Domain]
- **Email**: contact@big4india.com
- **Phone**: +91-XXXXXXXXXX

## � License

This project is licensed under the ISC License.

---

**Built with ❤️ by Big4India Team**