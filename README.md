# Developer Portfolio

A modern, responsive developer portfolio built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui. Features beautiful animations, dark mode support, and a contact form with email integration.

## ✨ Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Fully mobile-friendly design that works on all devices
- **Dark Mode**: System preference detection with manual toggle
- **Contact Form**: Functional contact form with email integration using Resend
- **Animations**: Beautiful animations powered by Framer Motion
- **Type Safe**: Built with TypeScript for better development experience
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod validation
- **Email Service**: Resend
- **Theme**: next-themes
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/devportfolio.git
   cd devportfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   CONTACT_EMAIL=your-email@example.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 📧 Email Setup

To enable the contact form functionality:

1. **Sign up for Resend**
   - Go to [resend.com](https://resend.com) and create an account
   - Get your API key from the dashboard

2. **Configure environment variables**
   - Add your `RESEND_API_KEY` to `.env.local`
   - Set `CONTACT_EMAIL` to where you want to receive messages

3. **Test the contact form**
   - The form will validate inputs and show success/error messages
   - Without API key configuration, messages will be logged to console

## 🎨 Customization

### Personal Information

Update the following files with your information:

- **Hero Section**: `components/hero-section.tsx`
- **About Page**: `app/about/page.tsx`
- **Projects**: `components/projects-section.tsx`
- **Certificates**: `components/certificates-section.tsx`
- **Contact Info**: `app/contact/page.tsx`

### Styling

- **Colors**: Modify the CSS custom properties in `app/globals.css`
- **Components**: Customize shadcn/ui components in `components/ui/`
- **Animations**: Adjust Framer Motion animations in component files

### Navigation

Update the navigation items in `components/navbar.tsx`:

```typescript
const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  // Add or modify navigation items
];
```

## 📱 Mobile Responsive

The portfolio is fully responsive and includes:

- Mobile-friendly navigation with hamburger menu
- Optimized layouts for all screen sizes
- Touch-friendly interactive elements
- Performance optimizations for mobile devices

## 🌙 Dark Mode

Dark mode is implemented using `next-themes`:

- Automatically detects system preference
- Manual toggle available in navigation
- Smooth transitions between themes
- Consistent styling across all components

## 📊 Performance

The portfolio is optimized for performance:

- **Next.js App Router** for optimal loading
- **Static generation** where possible
- **Optimized images** and assets
- **Minimal bundle size** with tree shaking
- **Fast animations** with Framer Motion

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The portfolio can be deployed on any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help with setup, please [open an issue](https://github.com/yourusername/devportfolio/issues) or contact me directly.

---

Built with ❤️ using Next.js and modern web technologies.
