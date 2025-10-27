# WEWORK

A comprehensive full-stack learning management and job placement platform designed specifically for African tech talent. Built with modern React/TypeScript and featuring dual authentication systems for students and companies, WEWORK bridges the gap between skill development and employment opportunities.

![WEWORK Scree## 🚀 **Deployment**

### **Build Process**

```bash
# Production build
npm run build

# Preview production build locally
npm run preview

# Type checking
npx tsc --noEmit
```

### **Deployment Platforms**

- **Vercel**: Zero-config deployment for React apps
- **Netlify**: Continuous deployment from Git
- **GitHub Pages**: Free hosting for static sites
- **Railway/Render**: Full-stack deployment options

### **Environment Variables**

```bash
# Required for production
VITE_API_URL=https://your-api-domain.com
VITE_APP_NAME=WEWORK
VITE_CONTACT_EMAIL=contact@wework.com
```

## 📊 **Performance Metrics**

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Bundle Size**: Optimized with tree-shaking and code splitting

## 🛠️ **Development Best Practices**

### **Code Organization**

- **Component-based architecture** with single responsibility
- **Custom hooks** for reusable logic
- **TypeScript** for type safety and better DX
- **Consistent naming conventions** (PascalCase for components, camelCase for functions)

### **Styling Guidelines**

- **Tailwind CSS** for utility-first styling
- **Component variants** using class-variance-authority
- **Responsive design** with mobile-first approach
- **Consistent spacing** using Tailwind's spacing scale

### **Performance Guidelines**

- **Image optimization** with proper formats and lazy loading
- **Code splitting** at route level
- **Minimal bundle size** through tree-shaking
- **Efficient re-renders** with proper React patterns

## 🧪 **Testing Strategy**

### **Recommended Testing Stack**

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### **Testing Patterns**

- **Component testing** with React Testing Library
- **Integration testing** for user flows
- **E2E testing** with Playwright or Cypress
- **Type checking** with TypeScript compiler

## 📜 **License**

This project is licensed under the MIT License – see the LICENSE file for details.

## 🤝 **Contributing**

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Development Guidelines**

- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed
- Follow existing code style and conventions

## 📞 **Support & Contact**

- **GitHub Issues**: [Report bugs or request features](https://github.com/TechProoo/rework/issues)
- **Email**: contact@wework.com
- **Documentation**: [Full documentation](https://github.com/TechProoo/rework/wiki)

## ✨ **About WEWORK**

WEWORK is more than just a learning platform—it's a comprehensive ecosystem designed to bridge the gap between African tech talent and global opportunities. Our mission is to democratize access to high-quality tech education and connect skilled professionals with companies that value their expertise.

### **Our Vision**

To become Africa's leading platform for tech skill development and employment, fostering a thriving ecosystem where talent meets opportunity.

### **Key Differentiators**

- **Africa-focused**: Built specifically for the African tech ecosystem
- **Comprehensive**: End-to-end solution from learning to employment
- **Community-driven**: Strong emphasis on peer learning and networking
- **Industry-aligned**: Curriculum and opportunities matched to market needs

---

**Built with ❤️ for the African tech community**enshot.png) <!-- Optional: add your own screenshot -->

## 🌟 Features

### 🎓 **Student Platform**

- **Interactive Learning Dashboard** – Personalized learning experience with progress tracking
- **Comprehensive Course Catalog** – Full-stack development, design, and tech skills
- **Skill Assessment System** – AI-powered assessments to gauge proficiency levels
- **Job Search & Application** – Direct connection to company opportunities
- **Community Platform** – Student networking and collaboration features
- **Tutorial System** – Step-by-step learning with interactive content
- **Enrollment Management** – Course registration and progress tracking
- **Achievement System** – Certificates, badges, and learning milestones

### 🏢 **Company Platform**

- **Hiring Dashboard** – Complete recruitment management system
- **Job Posting Management** – Create, edit, and manage job listings
- **Candidate Pipeline** – Track applications and hiring progress
- **Company Profile Management** – Showcase company culture and opportunities
- **Direct Student Access** – Connect with verified, skilled candidates

### 🔐 **Authentication & Security**

- **Dual Authentication System** – Separate secure flows for students and companies
- **Advanced Logout System** – Smart logout with data privacy options
- **Protected Routes** – Role-based access control and route protection
- **Context-based State Management** – Secure user state across the application

### 🎨 **Modern UI/UX**

- **Glassmorphism Design** – Modern, translucent UI elements with backdrop blur
- **Responsive Design** – Optimized for mobile, tablet, and desktop experiences
- **Gradient Aesthetics** – Beautiful gradient backgrounds and interactive elements
- **Smooth Animations** – Framer Motion powered transitions and micro-interactions
- **Dark Mode Support** – Elegant dark theme with proper contrast ratios

## ⚡ **Tech Stack**

### **Frontend**

- **React 19** – Latest React with concurrent features and improved performance
- **TypeScript** – Type-safe development with enhanced IDE support
- **Vite** – Lightning-fast build tool with HMR and optimized bundling
- **Tailwind CSS 4** – Utility-first CSS framework with modern features
- **React Router DOM** – Client-side routing with protected routes
- **Framer Motion** – Production-ready motion library for animations
- **Lucide React** – Beautiful, customizable icon library

### **UI/UX Libraries**

- **Radix UI** – Headless, accessible component primitives
- **Class Variance Authority** – Component variant management
- **Tailwind Merge** – Intelligent Tailwind class merging
- **Splide** – Modern, lightweight carousel/slider component

### **Development Tools**

- **ESLint** – Code linting with React-specific rules
- **TypeScript ESLint** – TypeScript-aware linting
- **Vite Plugin React** – Fast refresh and optimized React builds

## 🎨 **Design System**

### **Color Palette**

WEWORK uses a sophisticated, nature-inspired color system defined in Tailwind utilities:

```css
/* Primary Colors */
--color-forest: #64766a;    /* Primary brand color - muted forest green */
--color-mauve: #c0a9bd;     /* Secondary accent - warm mauve */
--color-slate: #94a7ae;     /* Neutral - muted slate blue/grey */
--color-light: #f4f2f3;     /* Background - very light grey */

/* Extended Palette */
forest-50 to forest-900     /* Forest green variations */
mauve-50 to mauve-900       /* Mauve variations */
slate-50 to slate-900       /* Slate variations */
```

### **Typography Scale**

- **Headings**: Inter font family with gradient text effects
- **Body Text**: Optimized for readability across all screen sizes
- **Interactive Elements**: Enhanced with hover states and transitions

### **Component Architecture**

- **Glassmorphism Effects**: Backdrop blur with translucent backgrounds
- **Gradient Systems**: Multi-stop gradients for visual depth
- **Animation Framework**: Consistent motion design with Framer Motion

## 🚀 **Getting Started**

### **Prerequisites**

- **Node.js** (v18+ recommended) - [Download Node.js](https://nodejs.org/)
- **npm** or **yarn** - Package manager (npm comes with Node.js)
- **Git** - Version control system

### **Installation**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/TechProoo/rework.git
   cd rework
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   ```bash
   # Create .env file in root directory
   cp .env.example .env

   # Add your environment variables
   VITE_API_URL=your_api_url
   VITE_APP_NAME=WEWORK
   ```

### **Development**

**Start the development server:**

```bash
npm run dev
# or
yarn dev
```

**Build for production:**

```bash
npm run build
# or
yarn build
```

**Preview production build:**

```bash
npm run preview
# or
yarn preview
```

**Lint code:**

```bash
npm run lint
# or
yarn lint
```

Open [http://localhost:5173](http://localhost:5173) to view the application in your browser.

## 📂 **Project Structure**

```
wework/
├── 📁 public/                    # Static assets
│   └── vite.svg                  # Vite logo
├── 📁 src/
│   ├── 📁 Components/            # Reusable UI components
│   │   ├── 📁 Styles/           # Styled components
│   │   │   ├── Button.tsx       # Enhanced button component
│   │   │   ├── Card.tsx         # Card component variants
│   │   │   ├── List_card.tsx    # List display cards
│   │   │   └── dummy_courses.ts # Mock data for development
│   │   ├── AuthLoader.tsx       # Authentication loading component
│   │   ├── CompanyProtectedRoute.tsx # Company route protection
│   │   ├── Courses.tsx          # Course display component
│   │   ├── DashboardLayout.tsx  # Dashboard layout wrapper
│   │   ├── Footer.tsx           # Site footer
│   │   ├── Hero.tsx             # Landing page hero section
│   │   ├── InfoCard.tsx         # Information display cards
│   │   ├── InfoSection.tsx      # Statistics and info section
│   │   ├── LogoutModal.tsx      # Logout confirmation modal
│   │   ├── Navbar.tsx           # Navigation component
│   │   ├── ProtectedRoute.tsx   # Student route protection
│   │   ├── PublicOnlyRoute.tsx  # Public-only route protection
│   │   ├── Sidebar.tsx          # Dashboard sidebar navigation
│   │   ├── Wlg.tsx             # Watch, Learn, Grow component
│   │   └── glass_card.tsx       # Glassmorphism card component
│   ├── 📁 Pages/                # Application pages
│   │   ├── 📁 Company/          # Company-specific pages
│   │   │   ├── DashboardPage.tsx # Company dashboard
│   │   │   ├── LoginPage.tsx     # Company login
│   │   │   └── SignupPage.tsx    # Company registration
│   │   ├── 📁 Users/            # Student dashboard pages
│   │   │   ├── CategoryPage.tsx  # Course categories
│   │   │   ├── Community.tsx     # Student community
│   │   │   ├── ConsultationPage.tsx # Consultation booking
│   │   │   ├── Courses_page.tsx  # Course catalog
│   │   │   ├── DashboardHome.tsx # Student dashboard home
│   │   │   ├── EnrollmentPage.tsx # Course enrollment
│   │   │   ├── Jobs_page.tsx     # Job listings
│   │   │   ├── LearningGoals.tsx # Goal setting
│   │   │   ├── MessagesPage.tsx  # Messaging system
│   │   │   ├── Notification.tsx  # Notifications
│   │   │   ├── PopularCoursesPage.tsx # Popular courses
│   │   │   ├── Profile.tsx       # User profile
│   │   │   ├── Settings.tsx      # Account settings
│   │   │   ├── SkillAssessmentPage.tsx # Skill testing
│   │   │   └── TutorialViewPage.tsx # Tutorial viewer
│   │   ├── About.tsx            # About page
│   │   ├── Contact.tsx          # Contact page
│   │   ├── Consultation.tsx     # Public consultation page
│   │   ├── Courses.tsx          # Public courses page
│   │   ├── Home.tsx             # Landing page
│   │   ├── Jobs.tsx             # Public jobs page
│   │   ├── Login.tsx            # Student login
│   │   └── Signup.tsx           # Student registration
│   ├── 📁 assets/               # Media assets
│   │   ├── cc.jpg, ccc.png, ... # Various images
│   │   └── [multiple image files] # Course and UI images
│   ├── 📁 contexts/             # React contexts
│   │   └── AuthContext.tsx      # Authentication context
│   ├── 📁 data/                 # Static data
│   │   ├── categories.ts        # Course categories data
│   │   └── infoData.ts         # Information section data
│   ├── App.tsx                  # Main application component
│   ├── index.css               # Global styles and Tailwind
│   └── main.tsx                # Application entry point
├── 📁 @types/                   # TypeScript declarations
│   └── alltypes.d.ts           # Global type definitions
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── README.md                   # This file
├── tsconfig.json              # TypeScript configuration
├── tsconfig.app.json          # App-specific TS config
├── tsconfig.node.json         # Node-specific TS config
└── vite.config.ts             # Vite configuration
```

## �️ **Application Routes**

### **Public Routes**

- `/` - Landing page with hero section and course overview
- `/about` - About WEWORK and mission
- `/contact` - Contact form and information
- `/courses` - Public course catalog
- `/jobs` - Public job listings
- `/consultation` - Consultation booking
- `/login` - Student authentication
- `/signup` - Student registration
- `/company/login` - Company authentication
- `/company/signup` - Company registration

### **Protected Student Routes**

- `/dashboard` - Student dashboard home
- `/dashboard/courses` - Student course catalog
- `/dashboard/jobs` - Job search and applications
- `/dashboard/profile` - Profile management
- `/dashboard/settings` - Account settings
- `/dashboard/messages` - Messaging system
- `/dashboard/notifications` - Notification center
- `/dashboard/consultation` - Consultation management
- `/dashboard/enrollment/:courseId` - Course enrollment
- `/dashboard/category/:categoryId` - Category-specific courses
- `/dashboard/goals` - Learning goals
- `/dashboard/community` - Student community
- `/dashboard/assessment` - Skill assessments
- `/dashboard/popular-courses` - Popular courses
- `/dashboard/tutorial/:tutorialId` - Tutorial viewer

### **Protected Company Routes**

- `/company/dashboard` - Company dashboard and hiring management

## 🔧 **Key Features & Implementation**

### **Authentication System**

```typescript
// AuthContext provides centralized authentication
interface User {
  id: string;
  email: string;
  userType: "student" | "company";
  firstName?: string;
  lastName?: string;
  companyName?: string;
  // ... additional user properties
}

// Route Protection Components
<ProtectedRoute>        // For authenticated students
<CompanyProtectedRoute> // For authenticated companies
<PublicOnlyRoute>       // For unauthenticated users only
```

### **State Management**

- **React Context** for global authentication state
- **Local State** with useState and useEffect hooks
- **Route-based State** using React Router's location state

### **Responsive Design**

- **Mobile-first** approach with Tailwind's responsive modifiers
- **Breakpoint system**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible layouts** with CSS Grid and Flexbox

### **Performance Optimizations**

- **Code splitting** with React.lazy() for route-based splitting
- **Image optimization** with proper formats (WebP, JPG, PNG)
- **Bundle optimization** through Vite's tree-shaking and minification

## 📝 **Customization Guide**

### **Theming**

```css
/* Update colors in index.css */
.bg-forest-500 {
  background-color: #64766a;
}
.bg-mauve-500 {
  background-color: #c0a9bd;
}
.bg-slate-500 {
  background-color: #94a7ae;
}

/* Or extend Tailwind config */
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-primary':'#your-color', ;
      }
    }
  }
}
```

### **Content Management**

- **Static content**: Update components in `src/Pages/` and `src/Components/`
- **Course data**: Modify `src/Components/Styles/dummy_courses.ts`
- **Categories**: Update `src/data/categories.ts`
- **Info sections**: Modify `src/data/infoData.ts`

### **Branding**

- **Logo replacement**: Update logo references in Navbar and Hero components
- **Company information**: Modify Footer component
- **Brand colors**: Update CSS custom properties and Tailwind utilities

📜 License

This project is licensed under the MIT License – see the LICENSE
file for details.

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a pull request.

✨ About WEWORK

WEWORK is inspired by the need to connect African talent with global opportunities. It’s a starting point for landing pages promoting remote work, training programs, or tech skill initiatives.

---

## 🛠️ Backend progress (2025-10-28)

Current development progress for the backend (wework_backend):

- Prisma schema updates:
  - Added a `Tutorial` model and `CourseLevel` enum.
  - Extended `Course` and `Lesson` shapes to include `isPublished`, `duration` (seconds), `content`, `videoUrl`, and timestamps.

- Courses feature work:
  - Implemented nested creation flows so creating/importing a Course also creates an associated Tutorial and Lessons (with optional Quizzes and Questions).
  - `CoursesService` updated: create, importCourse, createLesson, updateLesson (keeps course.duration in sync), lesson/tutorial CRUD, and quiz creation for lessons.

- Validation and DTOs:
  - Added/updated DTOs with `class-validator` so Nest's ValidationPipe preserves and validates nested request bodies.

- Controllers & responses:
  - Controller endpoints added for courses/tutorials/lessons/quizzes.
  - Standardized response shape implemented for core course CRUD endpoints (returns `{ statusCode, message, data }`).

- Tests and verification:
  - Unit tests updated for the controller and service. All backend tests pass locally (8 test suites, 20 tests at the time of update).
  - A REST-client `.http` file was prepared to exercise the full course import workflow manually.

- Database / deployment notes:
  - The project uses Supabase (Postgres) via Prisma. A connectivity issue (Prisma P1001) was diagnosed: host DNS returned only an IPv6 (AAAA) record and the local environment had no IPv6 route, preventing Prisma migrations from running locally.
  - Suggested workarounds: run migrations from a CI or cloud runner that has IPv6 connectivity, use the Supabase SQL editor to apply migration SQL, or run migrations from a host with IPv6 enabled.

- Remaining / next steps:
  1. Standardize response shapes for the remaining controller endpoints (tutorial/lesson/quiz endpoints) and update controller unit tests accordingly.
  2. Regenerate Prisma client (npx prisma generate) and apply migrations to the Supabase instance (via CI or SQL editor if local IPv6 isn't available).
  3. Add controller-level Jest tests for tutorial/lesson/quiz endpoints (mocking CoursesService) and consider end-to-end supertest flows against a test database or a mocked Prisma client.

If you want, I can standardize the remaining controller endpoints and add the matching unit tests in the next patch.
