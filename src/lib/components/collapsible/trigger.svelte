<script lang="ts">
	import { getContext } from 'svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
		asChild?: boolean;
	}

	let { class: className, children, asChild = false, ...props }: Props = $props();

	const context = getContext<{
		isOpen: boolean;
		disabled: boolean;
		toggle: () => void;
	}>('collapsible');

	if (!context) {
		throw new Error('Collapsible.Trigger must be used within a Collapsible.Root');
	}

	function handleClick(e: MouseEvent) {
		e.preventDefault();
		context.toggle();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			context.toggle();
		}
	}
</script>

{#if asChild}
	{@render children()}
{:else}
	<button
		class={cn(
			'group flex w-full items-center justify-between text-left',
			'focus-visible:ring-ring cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
			'disabled:pointer-events-none disabled:opacity-50',
			className
		)}
		disabled={context.disabled}
		aria-expanded={context.isOpen}
		data-state={context.isOpen ? 'open' : 'closed'}
		onclick={handleClick}
		onkeydown={handleKeydown}
		{...props}
	>
		{@render children()}
	</button>
{/if}
