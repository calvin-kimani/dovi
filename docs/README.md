# Dovi Documentation

Welcome to the comprehensive documentation for the Dovi SvelteKit UI starter kit.

## Overview

Dovi is a modern SvelteKit starter kit designed for building dashboards and web applications. It provides a complete foundation with authentication flows, dashboard layouts, and reusable components to accelerate development.

## Documentation Structure

### 📚 [Component Documentation](./COMPONENTS.md)

Comprehensive documentation for all UI components in the Dovi starter kit:

- **Base UI Components**: Button, Input, Label, Avatar, Separator, Tooltip, ModeToggle
- **Layout Components**: AppNavbar, AppSidebar
- **Composite Systems**: Sidebar system, Collapsible, Dropdown
- **Form Components**: SignInForm, SignUpForm, FormErrors
- **Usage Examples**: Code examples and implementation patterns
- **Design System Guidelines**: Best practices and conventions

### 🗂️ [Route Documentation](./ROUTES.md)

Complete guide to the application's routing structure:

- **Route Architecture**: Layout groups and route organization
- **Layout System**: Root layout and layout groups
- **Authentication Routes**: Sign-in, sign-up, and sign-out functionality
- **Protected Routes**: Dashboard and settings pages
- **Server-Side Logic**: Form handling and data loading
- **Implementation Guidelines**: Best practices for adding new routes

## Quick Links

### For Developers

- **[Getting Started](../README.md#getting-started)**: Setup and installation
- **[Component Library](./COMPONENTS.md)**: UI component reference
- **[Route Structure](./ROUTES.md)**: Application routing guide
- **[Architecture Overview](../README.md#architecture)**: System design and patterns

### Key Features

- ✅ **Svelte 5 with Runes**: Modern reactive syntax
- ✅ **TypeScript**: Full type safety
- ✅ **TailwindCSS v4**: Modern styling system
- ✅ **Form Validation**: Zod + SuperForms integration
- ✅ **Authentication Flow**: Complete auth system
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Theme Support**: Dark/light mode toggle
- ✅ **Component System**: Reusable UI library

## Development Workflow

### 1. Understanding the Codebase

Start with the [Route Documentation](./ROUTES.md) to understand the application structure, then review the [Component Documentation](./COMPONENTS.md) to familiarize yourself with the UI components.

### 2. Building Features

Follow the established patterns:

1. **Routes**: Use appropriate layout groups for new pages
2. **Components**: Build reusable components following the design system
3. **Forms**: Implement validation with Zod schemas
4. **Styling**: Use TailwindCSS utilities and design tokens

### 3. Code Quality

Maintain high code quality with:

- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code style
- **Testing**: Component and route testing

## Architecture Highlights

### Layout System

```
Root Layout (Global styles, toasts)
├── (home) - Public pages
├── (auth) - Authentication pages with centered card layout
└── (app) - Protected dashboard pages with sidebar layout
```

### Component Hierarchy

```
Base Components (Button, Input, etc.)
├── Layout Components (Navbar, Sidebar)
├── Composite Systems (Sidebar provider, Dropdown)
└── Form Components (Auth forms with validation)
```

### Technology Stack

- **Framework**: SvelteKit with Svelte 5
- **Styling**: TailwindCSS v4
- **Validation**: Zod v4 + sveltekit-superforms
- **Icons**: Lucide Svelte
- **Theme**: mode-watcher
- **Notifications**: svelte-sonner
- **Package Manager**: Bun

## Contributing

When contributing to Dovi:

1. **Follow Conventions**: Use established patterns and naming conventions
2. **Update Documentation**: Keep documentation current with code changes
3. **Test Thoroughly**: Ensure all features work across different scenarios
4. **Maintain Types**: Keep TypeScript interfaces up to date
5. **Responsive Design**: Test on multiple screen sizes

## Support

For questions or issues:

1. Review the component and route documentation
2. Check the main README for setup instructions
3. Examine existing code for implementation patterns
4. Follow the established architectural guidelines

---

This documentation branch (`docs`) contains the complete reference for building with Dovi. Use it as your guide for understanding and extending the starter kit.