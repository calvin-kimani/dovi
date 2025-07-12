<script lang="ts">
	import { getContext } from 'svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
		forceMount?: boolean;
	}

	let { class: className, children, forceMount = false, ...props }: Props = $props();

	const context = getContext<{
		isOpen: boolean;
		disabled: boolean;
		toggle: () => void;
	}>('collapsible');

	if (!context) {
		throw new Error('Collapsible.Content must be used within a Collapsible.Root');
	}
</script>

{#if forceMount || context.isOpen}
	<div
		class={cn('overflow-hidden', className)}
		data-state={context.isOpen ? 'open' : 'closed'}
		{...props}
	>
		{@render children()}
	</div>
{/if}
