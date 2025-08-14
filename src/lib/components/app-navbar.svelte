<script>
	import { Trigger } from './sidebar';
	import { getSidebarContext } from './sidebar/context.svelte';
	import ModeToggle from './mode-toggle.svelte';

	const sidebar = getSidebarContext();
</script>

<nav class="bg-background z-10 max-h-14 w-full rounded-tl-4xl">
	<div class="flex h-full items-center gap-2 border-b p-2 px-4">
		<Trigger class="outline-none" />
		<ModeToggle class="ml-auto" />
	</div>
</nav>

<!-- Mobile overlay -->
{#if sidebar?.isOpen}
	<div
		class="fixed inset-0 z-20 bg-black/50 md:hidden"
		onclick={(e) => sidebar?.toggleIsOpen(e)}
		onkeydown={(e) => {
			if (e.key === 'Escape') {
				sidebar?.toggleIsOpen(e);
			}
		}}
		role="button"
		tabindex="-1"
		aria-label="Close sidebar"
	></div>
{/if}
