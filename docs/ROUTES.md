# Route Documentation

This document provides comprehensive documentation for all routes in the Dovi SvelteKit application, including their layouts, purposes, and implementation details.

## Table of Contents

- [Route Architecture](#route-architecture)
- [Layout System](#layout-system)
- [Route Groups](#route-groups)
- [Individual Routes](#individual-routes)
- [Server-Side Logic](#server-side-logic)
- [Route Patterns](#route-patterns)

## Route Architecture

Dovi uses SvelteKit's advanced routing system with layout groups to organize different page types and apply appropriate layouts. The route structure follows a logical separation of concerns:

- **Public Routes**: Landing pages accessible to all users
- **Authentication Routes**: Sign-in, sign-up, and auth-related pages
- **Protected Routes**: Dashboard and app pages requiring authentication
- **Standalone Pages**: Legal pages (privacy, terms) that can be accessed independently

## Layout System

### Root Layout (`src/routes/+layout.svelte`)

The root layout provides the foundation for all pages in the application.

**Purpose:**
- Global CSS imports and TailwindCSS styles
- Toast notification system setup
- Consistent HTML structure across all routes

**Features:**
- Svelte Sonner toast notifications
- Global styling application
- Base HTML structure

**Applied to:** All routes in the application

### Layout Groups

SvelteKit layout groups are used to apply different layouts to specific route sections:

#### Auth Layout Group `(auth)`
- **Layout File:** `src/routes/(auth)/+layout@.svelte`
- **Purpose:** Centered authentication card with branded background
- **Applied to:** Sign-in, sign-up, and sign-out routes

#### App Layout Group `(app)`
- **Layout File:** `src/routes/(app)/+layout@.svelte`
- **Purpose:** Dashboard layout with sidebar navigation and top navbar
- **Applied to:** Protected dashboard and settings pages

#### Home Layout Group `(home)`
- **Layout:** Inherits from root layout
- **Purpose:** Public marketing and landing pages
- **Applied to:** Homepage and public content

## Route Groups

### Public Routes `(home)/`

Routes accessible to all visitors without authentication.

#### Homepage (`src/routes/(home)/+page.svelte`)

**URL:** `/`
**Purpose:** Landing page and application entry point
**Layout:** Root layout (no special layout)

**Features:**
- Welcome message and basic app introduction
- Navigation to authentication pages
- Public content showcase

**Server Logic:** `+page.server.ts` - Basic page load logic
**Layout Logic:** `+layout.server.ts` - Group-level server logic

### Authentication Routes `(auth)/`

Routes for user authentication and account management.

**Layout Features:**
- Centered authentication card design
- Branded background pattern
- Responsive design for mobile and desktop
- Consistent styling across all auth pages

#### Sign In (`src/routes/(auth)/sign-in/`)

**URL:** `/sign-in`
**Purpose:** User authentication and login

**Component:** Uses `SignInForm` from `src/lib/forms/sign-in-form.svelte`

**Features:**
- Email and password validation
- Form error handling
- Loading states
- Toast notifications for success/error
- Link to sign-up page

**Server Logic:** `+page.server.ts`
- Form action handling
- Validation processing
- Authentication logic (placeholder)
- Redirect handling

**Schema:** Uses `SignInSchema` for validation

#### Sign Up (`src/routes/(auth)/sign-up/`)

**URL:** `/sign-up`
**Purpose:** New user registration

**Component:** Uses `SignUpForm` from `src/lib/forms/sign-up-form.svelte`

**Features:**
- Multi-field registration form (first name, last name, email, phone, password)
- Password confirmation validation
- Comprehensive form validation
- Loading states and error handling
- Toast notifications

**Server Logic:** `+page.server.ts`
- Registration form processing
- User creation logic (placeholder)
- Validation handling
- Success/error response

**Schema:** Uses `SignUpSchema` for validation

#### Sign Out (`src/routes/(auth)/sign-out/`)

**URL:** `/sign-out`
**Purpose:** User logout and session termination

**Implementation:** Server-only route (no page component)

**Server Logic:** `+page.server.ts`
- Session termination
- Cookie clearing
- Redirect to sign-in page
- Logout processing

### Protected App Routes `(app)/`

Routes requiring user authentication, featuring dashboard layout.

**Layout Features:**
- Sidebar navigation with collapsible functionality
- Top navigation bar with user menu
- Responsive design with mobile overlay
- Protected route access

#### Dashboard (`src/routes/(app)/dashboard/`)

**URL:** `/dashboard`
**Purpose:** Main application dashboard and user home

**Features:**
- Dashboard overview and metrics
- Quick actions and navigation
- User-specific content
- Main application interface

**Server Logic:** `+page.server.ts`
- User data loading
- Dashboard metrics
- Authentication verification

#### Settings (`src/routes/(app)/settings/`)

**URL:** `/settings`
**Purpose:** User account settings and preferences

**Features:**
- User profile management
- Application preferences
- Account security options
- Configuration options

**Server Logic:** `+page.server.ts`
- Settings data loading
- User preference handling
- Form processing for settings updates

### Standalone Pages

#### Privacy Policy (`src/routes/privacy-policy/+page.svelte`)

**URL:** `/privacy-policy`
**Purpose:** Legal privacy policy documentation
**Layout:** Root layout only

**Features:**
- Static content display
- Legal compliance
- Accessible from any page

#### Terms of Service (`src/routes/terms-of-service/+page.svelte`)

**URL:** `/terms-of-service`
**Purpose:** Terms of service and usage agreements
**Layout:** Root layout only

**Features:**
- Static legal content
- User agreement terms
- Compliance documentation

## Server-Side Logic

### Layout Server Files

Each layout group includes a `+layout.server.ts` file for server-side logic:

#### Root Layout Server Logic
- Global data loading
- User session verification
- Theme preferences

#### Auth Layout Server (`(auth)/+layout.server.ts`)
- Authentication state checking
- Redirect logic for authenticated users
- Auth-specific data loading

#### App Layout Server (`(app)/+layout.server.ts`)
- Protected route authentication verification
- User data loading for sidebar
- Permission checking

#### Home Layout Server (`(home)/+layout.server.ts`)
- Public content loading
- Basic page data

### Page Server Files

Individual pages include `+page.server.ts` files for:

1. **Form Actions**: Processing form submissions
2. **Data Loading**: Server-side data fetching
3. **Authentication**: Route protection and user verification
4. **Validation**: Server-side form validation
5. **Redirects**: Conditional navigation logic

## Route Patterns

### Authentication Flow

1. **Unauthenticated User Access:**
   ```
   / (home) → /sign-in → /dashboard
   ```

2. **User Registration:**
   ```
   / (home) → /sign-up → /sign-in → /dashboard
   ```

3. **User Logout:**
   ```
   /dashboard → /sign-out → /sign-in
   ```

### Protected Route Access

Protected routes in the `(app)` group should implement:

1. **Authentication Check**: Verify user session
2. **Redirect Logic**: Redirect to sign-in if not authenticated
3. **User Data Loading**: Load user-specific data
4. **Permission Verification**: Check user permissions if applicable

### Form Handling Pattern

All forms follow a consistent pattern:

1. **Client-Side Validation**: Zod schema validation
2. **Server-Side Processing**: Form action in `+page.server.ts`
3. **Error Handling**: Validation errors and server errors
4. **Success Handling**: Toast notifications and redirects
5. **Loading States**: UI feedback during processing

## Navigation Structure

### Public Navigation
- Home (`/`)
- Sign In (`/sign-in`)
- Sign Up (`/sign-up`)
- Privacy Policy (`/privacy-policy`)
- Terms of Service (`/terms-of-service`)

### Authenticated Navigation
- Dashboard (`/dashboard`) - Main app interface
- Settings (`/settings`) - User preferences
- Sign Out (`/sign-out`) - Logout action

### Sidebar Navigation (App Layout)

The sidebar provides organized navigation for authenticated users:

```typescript
const navigationItems = [
  {
    group: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
      { label: "Settings", href: "/settings", icon: SettingsIcon }
    ]
  }
];
```

## Implementation Guidelines

### Adding New Routes

When adding new routes to Dovi:

1. **Choose the Appropriate Layout Group:**
   - `(home)` for public pages
   - `(auth)` for authentication-related pages
   - `(app)` for protected dashboard pages

2. **Follow the Established Patterns:**
   - Include `+page.server.ts` for server logic
   - Use appropriate Zod schemas for forms
   - Implement proper error handling

3. **Maintain Consistency:**
   - Follow existing file naming conventions
   - Use established component patterns
   - Include proper TypeScript types

4. **Security Considerations:**
   - Implement authentication checks for protected routes
   - Validate all user inputs
   - Handle errors gracefully

### Route Configuration

Routes are automatically configured by SvelteKit based on the file structure. Key considerations:

- **File Naming**: Follow SvelteKit conventions (`+page.svelte`, `+layout.svelte`, etc.)
- **Layout Inheritance**: Understand how layouts cascade and override
- **Server Functions**: Use `+page.server.ts` for server-side logic
- **Type Safety**: Leverage SvelteKit's generated types for route parameters

### Testing Routes

When testing routes:

1. **Authentication Flows**: Test sign-in, sign-up, and sign-out processes
2. **Protected Routes**: Verify authentication requirements
3. **Form Submissions**: Test validation and error handling
4. **Navigation**: Ensure proper routing and redirects
5. **Responsive Design**: Test layouts across different screen sizes

This route documentation provides a comprehensive overview of the Dovi application's routing structure and implementation patterns. Use this as a guide for understanding the existing routes and adding new functionality.