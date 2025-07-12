<script>
	import {
		Settings,
		Home,
		ChevronDown,
		FlaskConical,
		LogOut,
		CircleUserRound
	} from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import * as Collapsible from './collapsible';
	import * as Dropdown from './dropdown';
	import * as Sidebar from './sidebar';
	import Avatar from './avatar.svelte';
	import Separator from './separator.svelte';

	const navItems = [{ href: '/dashboard', icon: Home, label: 'Dashboard' }];
</script>

<Sidebar.Content class="bg-secondary text-secondary-foreground">
	<Sidebar.Header class="mb-2 flex items-center gap-2 p-2">
		<img src="/favicon.svg" alt="logo" class="h-6 w-6" />
		<span class="font-bold">Dovi</span>
	</Sidebar.Header>

	<Sidebar.Group>
		<Sidebar.GroupContent class="pr-3">
			{#each navItems as item (item.href)}
				<Sidebar.Link
					href={item.href}
					active={page.url.pathname === item.href}
					title={item.label}
					class="rounded-r-xl"
				>
					<svelte:component this={item.icon} />
					<span>{item.label}</span>
				</Sidebar.Link>
			{/each}
		</Sidebar.GroupContent>
	</Sidebar.Group>

	<Collapsible.Root open>
		<Sidebar.Group>
			<Sidebar.GroupLabel>
				<Collapsible.Trigger>
					Tools
					<ChevronDown
						size={18}
						class="ml-auto transition-transform group-data-[state=closed]:rotate-180"
					/>
				</Collapsible.Trigger>
			</Sidebar.GroupLabel>
			<Collapsible.Content>
				<Sidebar.GroupContent class="pr-3">
					<Sidebar.Button
						onclick={() => alert('Custom action clicked!')}
						title="Custom Action"
						class="rounded-r-xl"
					>
						<FlaskConical />
						<span>Custom action</span>
					</Sidebar.Button>
				</Sidebar.GroupContent>
			</Collapsible.Content>
		</Sidebar.Group>
	</Collapsible.Root>

	<Sidebar.Footer class="p-2">
		<Dropdown.Root open>
			<Dropdown.Trigger class="flex w-full items-center gap-2">
				<Avatar alt="user avatar" fallback="U" />
				<span>User</span>
			</Dropdown.Trigger>
			<Dropdown.Content class="text-sm font-normal">
				<menu>
					<button role="menuitem" disabled>
						<CircleUserRound size={18} />
						<span>user@example.com</span>
					</button>

					<a href="/settings" role="menuitem">
						<Settings size={18} />
						Settings
					</a>
					<Separator class="my-1" />
					<form action="/sign-out" method="POST" use:enhance>
						<button type="submit" role="menuitem">
							<LogOut size={18} />
							Log Out
						</button>
					</form>
				</menu>
			</Dropdown.Content>
		</Dropdown.Root>
	</Sidebar.Footer>
</Sidebar.Content>

<style>
	menu [role='menuitem'] {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0.5rem;
		gap: 0.5rem;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	menu [role='menuitem']:hover {
		background-color: oklch(from rgb(var(--accent)) l c h);
	}

	menu [role='menuitem']:disabled {
		color: oklch(from rgb(var(--muted-foreground)) l c h);
		background-color: transparent;
	}
</style>
