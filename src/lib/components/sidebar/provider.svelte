<script lang="ts">
	import { cn } from '$lib/utils';
	import { getSidebarContext, setSidebarContext } from './context.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className, children }: Props = $props();

	setSidebarContext(true, false);

	const sidebar = getSidebarContext();
</script>

<div
	class={cn(
		'grid h-screen w-screen overflow-hidden transition-all duration-300 ease-in-out',
		sidebar?.isOpen
			? sidebar?.isCollapsed
				? 'md:grid-cols-[3rem_1fr]'
				: 'md:grid-cols-[16rem_1fr]'
			: 'grid-cols-1',
		className
	)}
>
	{@render children?.()}
</div>
