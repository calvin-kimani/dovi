# Component Documentation

This document provides comprehensive documentation for all components in the Dovi UI starter kit.

## Table of Contents

- [Base UI Components](#base-ui-components)
- [Layout Components](#layout-components)
- [Composite Component Systems](#composite-component-systems)
- [Form Components](#form-components)
- [Usage Examples](#usage-examples)

## Base UI Components

### Button (`src/lib/components/button.svelte`)

A versatile button component with multiple variants and states.

**Props:**

```typescript
interface Props {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
	class?: string;
	children: Snippet;
}
```

**Features:**

- Multiple visual variants
- Disabled state handling
- Loading state support
- Full accessibility support
- Consistent sizing system

**Example:**

```svelte
<Button variant="primary" size="md" onclick={handleClick}>Save Changes</Button>
```

### Input (`src/lib/components/input.svelte`)

Enhanced input component with validation support and password toggle.

**Props:**

```typescript
interface Props {
	type?: string;
	placeholder?: string;
	value?: string;
	disabled?: boolean;
	required?: boolean;
	class?: string;
	name?: string;
	id?: string;
}
```

**Features:**

- Password visibility toggle
- Validation state styling
- Placeholder text support
- Disabled state handling
- Form integration ready

**Example:**

```svelte
<Input type="email" placeholder="Enter your email" bind:value={email} required />
```

### Label (`src/lib/components/label.svelte`)

Form label component with consistent typography.

**Props:**

```typescript
interface Props {
	for?: string;
	required?: boolean;
	class?: string;
	children: Snippet;
}
```

**Example:**

```svelte
<Label for="email" required>Email Address</Label>
```

### Avatar (`src/lib/components/avatar.svelte`)

User avatar component with fallback initials and multiple sizes.

**Props:**

```typescript
interface Props {
	src?: string;
	alt?: string;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	fallback?: string;
	class?: string;
}
```

**Features:**

- Image loading with fallback
- Automatic initial generation
- Multiple size variants
- Accessible alt text support

**Example:**

```svelte
<Avatar src="/user-avatar.jpg" alt="John Doe" size="md" fallback="JD" />
```

### Separator (`src/lib/components/separator.svelte`)

Visual separator component for content organization.

**Props:**

```typescript
interface Props {
	orientation?: 'horizontal' | 'vertical';
	class?: string;
}
```

**Example:**

```svelte
<Separator orientation="horizontal" />
```

### Tooltip (`src/lib/components/tooltip.svelte`)

Contextual tooltip component for enhanced UX.

**Props:**

```typescript
interface Props {
	content: string;
	placement?: 'top' | 'bottom' | 'left' | 'right';
	children: Snippet;
}
```

**Example:**

```svelte
<Tooltip content="Click to save your changes" placement="top">
	<Button>Save</Button>
</Tooltip>
```

### ModeToggle (`src/lib/components/mode-toggle.svelte`)

Dark/light theme toggle button with mode-watcher integration.

**Features:**

- Automatic theme detection
- Smooth transitions
- System preference support
- Accessible toggle states

**Example:**

```svelte
<ModeToggle />
```

## Layout Components

### AppNavbar (`src/lib/components/app-navbar.svelte`)

Top navigation bar component for the dashboard layout.

**Features:**

- Sidebar toggle integration
- Mobile responsive design
- User menu integration
- Breadcrumb support

**Props:**

```typescript
interface Props {
	class?: string;
}
```

**Example:**

```svelte
<AppNavbar class="border-b" />
```

### AppSidebar (`src/lib/components/app-sidebar.svelte`)

Main navigation sidebar component with collapsible functionality.

**Features:**

- Collapsible navigation
- User account section
- Navigation groups
- Mobile overlay support

**Props:**

```typescript
interface Props {
	class?: string;
}
```

**Example:**

```svelte
<AppSidebar class="border-r" />
```

## Composite Component Systems

### Sidebar System (`src/lib/components/sidebar/`)

A complete sidebar component system built with the provider pattern for state management.

#### Core Components

**Provider (`provider.svelte`)**

- Context provider for sidebar state
- Manages collapsed/expanded states
- Handles mobile responsive behavior

**Content (`content.svelte`)**

- Main sidebar content container
- Responsive width management
- Scroll behavior handling

**Header (`header.svelte`)**

- Sidebar header section
- Logo and branding area
- Toggle button placement

**Footer (`footer.svelte`)**

- Sidebar footer section
- User account information
- Additional action buttons

#### Navigation Components

**Group (`group.svelte`)**

- Navigation group container
- Collapsible sections
- Organized navigation structure

**GroupLabel (`group-label.svelte`)**

- Section headers for navigation groups
- Consistent typography
- Collapsible indicators

**GroupContent (`group-content.svelte`)**

- Content wrapper for navigation groups
- Animated expand/collapse
- Proper spacing management

**Link (`link.svelte`)**

- Navigation links with active states
- Icon and text support
- Hover and focus states

**Button (`button.svelte`)**

- Action buttons within sidebar
- Consistent styling with links
- Click handling and states

**Trigger (`trigger.svelte`)**

- Sidebar toggle button
- Mobile hamburger menu
- State management integration

#### Usage Example:

```svelte
<Sidebar.Provider>
	<Sidebar.Content>
		<Sidebar.Header>
			<Sidebar.Trigger />
			<h1>App Name</h1>
		</Sidebar.Header>

		<Sidebar.Group>
			<Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Link href="/dashboard" active={$page.url.pathname === '/dashboard'}>
					<DashboardIcon />
					Dashboard
				</Sidebar.Link>
				<Sidebar.Link href="/settings">
					<SettingsIcon />
					Settings
				</Sidebar.Link>
			</Sidebar.GroupContent>
		</Sidebar.Group>

		<Sidebar.Footer>
			<UserMenu />
		</Sidebar.Footer>
	</Sidebar.Content>
</Sidebar.Provider>
```

### Collapsible System (`src/lib/components/collapsible/`)

Accordion-style content reveal components.

**Root (`root.svelte`)**

- Container for collapsible content
- State management
- Animation coordination

**Trigger (`trigger.svelte`)**

- Clickable trigger element
- Accessible toggle behavior
- Visual state indicators

**Content (`content.svelte`)**

- Collapsible content container
- Smooth animations
- Height transitions

#### Usage Example:

```svelte
<Collapsible.Root>
	<Collapsible.Trigger>Click to expand</Collapsible.Trigger>
	<Collapsible.Content>
		<p>This content can be collapsed</p>
	</Collapsible.Content>
</Collapsible.Root>
```

### Dropdown System (`src/lib/components/dropdown/`)

Menu and action dropdown components with proper focus management.

**Root (`root.svelte`)**

- Dropdown container
- Position management
- Click outside handling

**Trigger (`trigger.svelte`)**

- Dropdown trigger button
- Keyboard navigation
- Accessible attributes

**Content (`content.svelte`)**

- Dropdown menu content
- Focus trapping
- Menu item styling

#### Usage Example:

```svelte
<Dropdown.Root>
	<Dropdown.Trigger>
		<Button>Menu</Button>
	</Dropdown.Trigger>
	<Dropdown.Content>
		<a href="/profile">Profile</a>
		<a href="/settings">Settings</a>
		<button onclick={signOut}>Sign Out</button>
	</Dropdown.Content>
</Dropdown.Root>
```

## Form Components

### SignInForm (`src/lib/forms/sign-in-form.svelte`)

Complete sign-in form with validation and error handling.

**Features:**

- Email and password validation
- Loading states with spinner
- Toast notifications
- Error message display
- Navigation to sign-up

**Schema Integration:**
Uses `SignInSchema` from `src/lib/schemas/sign-in-schema.ts`

**Example Usage:**

```svelte
<SignInForm />
```

### SignUpForm (`src/lib/forms/sign-up-form.svelte`)

User registration form with comprehensive validation.

**Features:**

- Multi-field validation (name, email, phone, password)
- Password confirmation matching
- Loading states
- Toast notifications
- Error handling

**Schema Integration:**
Uses `SignUpSchema` from `src/lib/schemas/sign-up-schema.ts`

**Example Usage:**

```svelte
<SignUpForm />
```

### FormErrors (`src/lib/components/form-errors.svelte`)

Reusable component for displaying form validation errors.

**Props:**

```typescript
interface Props {
	errors: string[];
	class?: string;
}
```

**Example:**

```svelte
<FormErrors errors={$errors.email} />
```

## Design System Guidelines

### Styling Conventions

1. **TailwindCSS Classes**: Use utility classes for consistent styling
2. **Component Variants**: Support multiple visual variants where applicable
3. **Responsive Design**: Mobile-first approach with responsive breakpoints
4. **State Management**: Use Svelte 5 runes for reactive state
5. **Accessibility**: Include proper ARIA attributes and keyboard navigation

### Component Structure

1. **TypeScript Interfaces**: Define clear prop interfaces for all components
2. **Default Props**: Provide sensible defaults for optional props
3. **Slot/Snippet Support**: Use Svelte 5 snippets for flexible content composition
4. **Event Handling**: Support standard DOM events and custom events
5. **CSS Custom Properties**: Use for theming and customization

### Best Practices

1. **Composition over Inheritance**: Build complex components from simple ones
2. **Provider Pattern**: Use for complex state management (e.g., Sidebar)
3. **Accessibility First**: Include proper semantics and keyboard support
4. **Performance**: Lazy load and optimize for bundle size
5. **Testing**: Components should be easily testable in isolation

## Contributing to Components

When adding new components:

1. Follow the established TypeScript interface patterns
2. Include proper documentation with examples
3. Ensure accessibility compliance
4. Add responsive design considerations
5. Test across different themes (light/dark)
6. Follow the existing file naming conventions
7. Update this documentation with new components
