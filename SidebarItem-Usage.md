# SidebarItem Component

The `SidebarItem` component is a flexible, unopinionated component that automatically handles icon mode and active states in the sidebar.

## Features

- **Automatic Icon Detection**: Automatically finds and handles any SVG element within the content
- **Icon-Only Mode**: When sidebar is collapsed, shows only the icon centered with tooltips
- **Active State Management**: Built-in active state styling
- **Flexible Content**: Put anything inside - text, badges, custom elements
- **Link or Button**: Can be used as a link (with `href`) or button (with `onclick`)

## Usage

### Basic Link Item

```svelte
<SidebarItem href="/dashboard" active={$page.url.pathname === '/dashboard'} title="Dashboard">
	<HomeIcon />
	{#if !sidebar.isCollapsed}
		<span>Dashboard</span>
	{/if}
</SidebarItem>
```

### Button Item with Custom Action

```svelte
<SidebarItem onclick={() => doSomething()} title="Custom Action">
	<svg><!-- any SVG icon --></svg>
	{#if !sidebar.isCollapsed}
		<span>Custom Action</span>
	{/if}
</SidebarItem>
```

### Item with Badge

```svelte
<SidebarItem href="/notifications" title="Notifications">
	<BellIcon />
	{#if !sidebar.isCollapsed}
		<span class="flex-1">Notifications</span>
		<span class="rounded bg-red-500 px-2 py-1 text-white">3</span>
	{/if}
</SidebarItem>
```

### Custom SVG Icon

```svelte
<SidebarItem href="/custom" title="Custom">
	<!-- The component automatically detects this SVG as the icon -->
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
		<path
			d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
		/>
	</svg>
	{#if !sidebar.isCollapsed}
		<span>Custom</span>
	{/if}
</SidebarItem>
```

## Props

- `href?: string` - If provided, renders as an `<a>` tag
- `onclick?: (e: Event) => void` - If no href, renders as button with click handler
- `active?: boolean` - Controls active state styling
- `title?: string` - Tooltip text when collapsed (auto-extracts from text content if not provided)
- `class?: string` - Additional CSS classes
- `children: Snippet` - Content to render inside the item

## Behavior

- When sidebar is **expanded**: Shows all content normally
- When sidebar is **collapsed**:
  - Shows only the detected SVG icon, centered
  - Displays tooltip on hover with the title or extracted text content
  - Hides all other content

The component automatically detects SVG elements and treats them as icons, making it completely unopinionated about what icons you use.
