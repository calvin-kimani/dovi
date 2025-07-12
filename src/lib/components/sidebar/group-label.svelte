<script lang="ts">
	import { getSidebarContext } from './context.svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className, children, ...props }: Props = $props();

	const sidebar = getSidebarContext();
</script>

{#if !sidebar?.isCollapsed}
	<div
		class={cn('text-muted-foreground px-3 text-xs font-semibold tracking-wider', className)}
		{...props}
	>
		{@render children()}
	</div>
{/if}
