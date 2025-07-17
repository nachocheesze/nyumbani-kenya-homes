 1 # GEMINI.MD: AI Collaboration Guide
    2 
    3 This document provides essential context for AI models interacting with this project. Adhering to these guidelines will
      ensure consistency and maintain code quality.
    4 
    5 ## 1. Project Overview & Purpose
    6 
    7 *   **Primary Goal:** This project, "Nyumbani," is a full-featured real estate and property management web platform designed
      for the African market, specifically starting with Kenya. It aims to empower landlords, tenants, agents, and real estate
      companies to manage properties, leases, payments, and services.
    8 *   **Business Domain:** Real Estate, Property Management, Fintech (payments), SaaS.
    9 
   10 ## 2. Core Technologies & Stack
   11 
   12 *   **Languages:** TypeScript
   13 *   **Frameworks & Runtimes:** React (v18), Vite (for development/build), Node.js (development environment), Supabase
      (Backend as a Service).
   14 *   **Databases:** PostgreSQL (via Supabase).
   15 *   **Key Libraries/Dependencies:**
   16     *   `@supabase/supabase-js`: Supabase client library for authentication and data interaction.
   17     *   `react-router-dom`: For client-side routing.
   18     *   `@radix-ui/*`: UI primitives for building accessible components.
   19     *   `tailwindcss`: Utility-first CSS framework.
   20     *   `react-hook-form`: For form management and validation.
   21     *   `zod`: Schema declaration and validation library.
   22     *   `@tanstack/react-query`: For data fetching, caching, and state management.
   23     *   `lucide-react`: Icon library.
   24     *   `sonner`, `@radix-ui/react-toast`: For toast notifications.
   25 *   **Package Manager(s):** npm
   26 
   27 ## 3. Architectural Patterns
   28
   29 *   **Overall Architecture:** This is a Single Page Application (SPA) with a React frontend. It consumes a
      Backend-as-a-Service (Supabase) for database, authentication, and real-time capabilities. The application follows a
      component-based architecture, with clear separation between pages, reusable UI components, and domain-specific logic.
   30 *   **Directory Structure Philosophy:**
   31     *   `/src`: Contains all primary source code for the React application.
   32     *   `/src/components`: Houses reusable UI components, further organized by domain or type (e.g., `auth`, `dashboard`,
      `property-management`, `ui`).
   33     *   `/src/pages`: Top-level components that define the main views/routes of the application.
   34     *   `/src/contexts`: Contains React Context API providers for global state management (e.g., `AuthContext`).
   35     *   `/src/hooks`: Custom React hooks for encapsulating reusable logic.
   36     *   `/src/integrations`: Code related to external service integrations (e.g., `supabase`).
   37     *   `/src/lib`: General utility functions and helper modules.
   38     *   `/src/types`: TypeScript type definitions for the application's data structures.
   39     *   `/src/utils`: Miscellaneous utility functions.
   40     *   `/public`: Stores static assets like `favicon.ico` and `robots.txt`.
   41     *   `/supabase`: Contains Supabase-specific configurations, database migrations, and schema definitions.
   42
   43 ## 4. Coding Conventions & Style Guide
   44
   45 *   **Formatting:** The project uses ESLint for code linting (configured in `eslint.config.js`) and Tailwind CSS for styling.
      While no explicit `.prettierrc` is provided, it's common to pair ESLint with Prettier for consistent formatting. Indentation
      is inferred to be 2 spaces.
   46 *   **Naming Conventions:**
   47     *   `components`, `pages`, `classes`: PascalCase (e.g., `App.tsx`, `ProtectedRoute.tsx`, `DashboardLayout.tsx`).
   48     *   `files`: Generally PascalCase for main components and pages (e.g., `App.tsx`, `Index.tsx`). For UI components within
      `src/components/ui`, kebab-case is often used (e.g., `alert-dialog.tsx`).
   49     *   `variables`, `functions`: camelCase (inferred from existing code).
   50 *   **API Design:** The frontend interacts with Supabase, which provides a RESTful API for data operations and
      authentication, along with real-time capabilities. Data fetching and mutations are likely managed using
      `@tanstack/react-query`.
   51 *   **Error Handling:** Asynchronous operations typically use `try...catch` blocks. User feedback for errors and success
      messages is provided via toast notifications using `sonner` and `@radix-ui/react-toast`.
   52
   53 ## 5. Key Files & Entrypoints
   54
   55 *   **Main Entrypoint(s):** `src/main.tsx` is the primary entry point for the React application, responsible for rendering
      the root `App` component into the DOM.
   56 *   **Configuration:**
   57     *   `package.json`: Project metadata, scripts, and dependency management.
   58     *   `vite.config.ts`: Vite build and development server configuration.
   59     *   `tailwind.config.ts`: Tailwind CSS configuration, including custom themes and plugins.
   60     *   `postcss.config.js`: PostCSS configuration for CSS processing.
   61     *   `eslint.config.js`: ESLint configuration for code quality and style.
   62     *   `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: TypeScript compiler configurations.
   63 *   **CI/CD Pipeline:** Not explicitly defined in the provided file structure (e.g., no `.github/workflows` or similar CI/CD
      configuration files were found). This suggests CI/CD is either handled externally or is not yet configured.
   64
   65 ## 6. Development & Testing Workflow
   66
   67 *   **Local Development Environment:**
   68     1.  Clone the repository: `git clone https://github.com/yourusername/nyumbani.git`
   69     2.  Navigate to the project directory: `cd nyumbani`
   70     3.  Install dependencies: `npm install`
   71     4.  Start the development server: `npm run dev` (This will typically open the application in a browser at
      `http://localhost:8080`).
   72 *   **Testing:** The `package.json` file does not contain a dedicated `test` script. This suggests that a formal testing
      framework might not be fully integrated or configured, or testing is primarily manual. This is an area for the human
      developer to complete or clarify.
   73 *   **CI/CD Process:** As noted above, CI/CD configuration files were not found. The process is inferred to be manual
      deployment or managed by an external system.
   74
   75 ## 7. Specific Instructions for AI Collaboration
   76
   77 *   **Contribution Guidelines:** No explicit `CONTRIBUTING.md` file was found. When making changes, adhere strictly to the
      existing code style, architectural patterns, and component structure. Ensure new features are well-integrated with the
      Supabase backend and leverage existing UI components where possible.
   78 *   **Infrastructure (IaC):** The `/supabase` directory contains configurations and migration files for the Supabase backend.
      Changes within this directory directly impact the database schema and backend services. Exercise extreme caution and ensure
      thorough understanding before modifying these files.
   79 *   **Security:** Be highly mindful of security, especially concerning user authentication, authorization (role-based access
      control), and Supabase Row Level Security (RLS) policies. Never hardcode sensitive information (API keys, secrets) directly
      into the codebase. All authentication logic should be robust and vetted.
   80 *   **Dependencies:** When adding new dependencies, use `npm install <package-name>` (or `npm install --save-dev` for dev
      dependencies) to ensure `package.json` and `package-lock.json` are correctly updated.
   81 *   **Commit Messages:** No explicit commit message guidelines were found. It is recommended to follow Conventional Commits
      specifications (e.g., `feat:`, `fix:`, `docs:`, `refactor:`) for clear and consistent commit history.