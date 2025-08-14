# Dovi

A modern SvelteKit UI starter kit designed for building dashboards and web applications with a focus on developer experience and beautiful interfaces.

## Features

- **Modern Stack**: Built with SvelteKit and Svelte 5 using the latest runes syntax
- **Dashboard Ready**: Pre-built layouts with sidebar navigation and app structure
- **Beautiful UI**: TailwindCSS v4 with carefully crafted components and design system
- **Type Safe**: Full TypeScript support with strict mode enabled
- **Form Handling**: Integrated form validation with Zod v4 and sveltekit-superforms
- **Authentication**: Complete auth flows with sign-in, sign-up, and sign-out functionality
- **Responsive Design**: Mobile-first approach with collapsible sidebar and adaptive layouts
- **Theme Support**: Built-in dark/light mode toggle with mode-watcher
- **Component System**: Comprehensive UI component library with provider patterns
- **Developer Experience**: ESLint, Prettier, and comprehensive tooling setup

## Quick Start

### Prerequisites

Make sure you have [Bun](https://bun.sh) installed on your machine.

### Installation

```bash
# Clone the repository
git clone https://github.com/calvin-kimani/dovi.git
cd dovi

# Install dependencies
bun install

# Start development server
bun run dev
```

The development server will start on `http://localhost:80` and automatically open in your browser.

## Development

### Available Scripts

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Type checking
bun run check

# Type checking with watch mode
bun run check:watch

# Lint and format code
bun run lint
bun run format
```

### Project Structure

```
src/
├── lib/
│   ├── components/          # UI Component Library
│   │   ├── sidebar/         # Complete sidebar system with provider pattern
│   │   ├── collapsible/     # Collapsible/accordion components
│   │   ├── dropdown/        # Dropdown menu components
│   │   └── *.svelte         # Base UI components (Button, Input, Avatar, etc.)
│   ├── forms/              # Form components with validation
│   │   ├── sign-in-form.svelte
│   │   └── sign-up-form.svelte
│   ├── schemas/            # Zod validation schemas
│   │   ├── password-schema.ts
│   │   ├── sign-in-schema.ts
│   │   └── sign-up-schema.ts
│   ├── config.ts           # App configuration constants
│   └── utils.ts            # Utility functions
├── routes/
│   ├── (app)/              # Protected dashboard pages with sidebar layout
│   │   ├── dashboard/      # Main dashboard page
│   │   └── settings/       # User settings page
│   ├── (auth)/             # Authentication pages with centered card layout
│   │   ├── sign-in/        # User login page
│   │   ├── sign-up/        # User registration page
│   │   └── sign-out/       # Sign-out server action
│   ├── (home)/             # Public landing pages
│   │   └── +page.svelte    # Home/welcome page
│   ├── privacy-policy/     # Privacy policy page
│   ├── terms-of-service/   # Terms of service page
│   └── +layout.svelte      # Root layout with global styles
└── app.css                 # Global styles and TailwindCSS imports
```

## Architecture

### Layout System

Dovi uses SvelteKit's advanced routing with layout groups for different page types:

- **Root Layout** (`+layout.svelte`): Global styles and toast notifications
- **Auth Layout** (`(auth)/+layout@.svelte`): Centered authentication card with background pattern
- **App Layout** (`(app)/+layout@.svelte`): Dashboard layout with sidebar and navbar
- **Public Layout**: Inherits from root layout for marketing/landing pages

### Component Architecture

The component system is built with composition and reusability in mind:

#### Base Components

- `Button`, `Input`, `Label` - Form controls with consistent styling
- `Avatar` - User avatars with fallback initials and multiple sizes
- `Separator` - Visual dividers and spacers
- `Tooltip` - Contextual help and information
- `ModeToggle` - Dark/light theme switcher

#### Composite Systems

- **Sidebar System**: Complete navigation solution with collapsible states, groups, and context management
- **Collapsible**: Accordion-style content reveal components
- **Dropdown**: Menu and action dropdowns with proper focus management

#### Layout Components

- `AppNavbar` - Top navigation with mobile responsiveness
- `AppSidebar` - Main navigation sidebar with user management

### Form System

Forms use a powerful validation stack:

- **Zod Schemas**: Type-safe validation with reusable schema composition
- **SuperForms**: Advanced form state management and error handling
- **Toast Notifications**: User feedback for form actions
- **Loading States**: Built-in loading indicators and disabled states

## Customization

Dovi is designed to be easily customizable for your specific needs:

- **Branding**: Update the app name in `src/lib/config.ts`
- **Styling**: Modify TailwindCSS configuration and component styles
- **Layout**: Customize the sidebar, navbar, and page layouts in `src/lib/components/`
- **Authentication**: Replace placeholder auth logic with your preferred provider
- **Components**: Extend the component library or modify existing components
- **Routing**: Add new pages following the established layout group patterns
- **Forms**: Create new forms using the existing schema and component patterns

### Development Guidelines

- **Component Structure**: Follow the established component patterns with TypeScript interfaces
- **Validation**: Use Zod schemas for all form validation
- **Styling**: Leverage the utility classes and component design system
- **State Management**: Use Svelte 5 runes ($state, $props, $effect) for reactive state
- **TypeScript**: Maintain strict type safety throughout the application

## Getting Started

1. **Clone and Install**

   ```bash
   git clone https://github.com/calvin-kimani/dovi.git
   cd dovi
   bun install
   ```

2. **Start Development**

   ```bash
   bun run dev
   # Visit http://localhost:80
   ```

3. **Build for Production**

   ```bash
   bun run build
   bun run preview
   ```

4. **Quality Checks**
   ```bash
   bun run check    # TypeScript validation
   bun run lint     # ESLint + Prettier
   ```

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev) - Full-stack web framework
- **UI Library**: [Svelte 5](https://svelte.dev) - Reactive UI library with runes
- **Styling**: [TailwindCSS v4](https://tailwindcss.com) - Utility-first CSS framework
- **Type Safety**: [TypeScript](https://typescriptlang.org) - Static type checking
- **Forms**: [sveltekit-superforms](https://superforms.rocks) + [Zod v4](https://zod.dev) - Form handling and validation
- **Icons**: [Lucide Svelte](https://lucide.dev) - Beautiful icon library
- **Theming**: [mode-watcher](https://mode-watcher.svecosystem.com) - Dark/light mode management
- **Notifications**: [svelte-sonner](https://svelte-sonner.vercel.app) - Toast notifications
- **Package Manager**: [Bun](https://bun.sh) - Fast package manager and runtime
- **Build Tool**: [Vite](https://vitejs.dev) - Fast build tool and dev server
- **Code Quality**: [ESLint](https://eslint.org) + [Prettier](https://prettier.io) - Linting and formatting

## Project Status

This is a starter kit designed to accelerate dashboard and web application development. It provides:

✅ **Complete Authentication Flow** - Sign-in, sign-up, and sign-out pages  
✅ **Responsive Dashboard Layout** - Sidebar navigation with mobile support  
✅ **Component Library** - Reusable UI components with TypeScript  
✅ **Form Validation** - Zod schemas with SuperForms integration  
✅ **Theme Support** - Dark/light mode toggle  
✅ **Type Safety** - Strict TypeScript throughout  
✅ **Modern Tooling** - Bun, Vite, ESLint, Prettier

## Documentation

For detailed component and routing documentation, check out the `docs/` branch:

```bash
git checkout docs
```

This branch contains comprehensive documentation for all components, routes, and implementation patterns.

## Deployment

To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment:

```bash
bun add -D @sveltejs/adapter-node  # for Node.js
bun add -D @sveltejs/adapter-vercel  # for Vercel
bun add -D @sveltejs/adapter-netlify  # for Netlify
```

Then update your `svelte.config.js` to use the appropriate adapter.

## License

MIT License - feel free to use this starter kit for your projects!
