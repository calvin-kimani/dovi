<script lang="ts">
	import { getSidebarContext } from './context.svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	const sidebar = getSidebarContext();

	let { class: className, children }: Props = $props();
</script>

<aside
	data-open={sidebar.isOpen}
	data-collapsed={sidebar.isCollapsed}
	class={cn(
		'h-full overflow-hidden transition-all duration-300 ease-in-out',
		'z-40 flex flex-col',
		'md:relative',
		'fixed top-0 left-0',
		sidebar.isOpen ? (sidebar.isCollapsed ? 'w-12 md:w-12' : 'w-72 md:w-64') : 'w-0 md:w-0',
		!sidebar.isOpen && 'max-md:-translate-x-full',
		className
	)}
>
	<div class="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
		{@render children?.()}
	</div>
</aside>
