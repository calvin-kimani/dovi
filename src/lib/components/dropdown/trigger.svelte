<script lang="ts">
	import { getContext } from 'svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
		asChild?: boolean;
	}

	let { class: className, children, asChild = false, ...props }: Props = $props();

	const dropdown = getContext<{
		isOpen: boolean;
		triggerElement: HTMLElement | undefined;
		toggle: () => void;
		close: () => void;
	}>('dropdown');

	let triggerElement = $state<HTMLElement>();

	function handleClick() {
		dropdown.toggle();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			dropdown.toggle();
		}
	}

	$effect(() => {
		if (triggerElement) {
			dropdown.triggerElement = triggerElement;
		}
	});
</script>

{#if asChild}
	{@render children?.()}
{:else}
	<button
		bind:this={triggerElement}
		onclick={handleClick}
		onkeydown={handleKeydown}
		aria-expanded={dropdown.isOpen}
		aria-haspopup="true"
		class={cn(
			'cursor-pointer text-sm font-medium whitespace-nowrap transition-colors',
			'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
			'disabled:pointer-events-none disabled:opacity-50',
			className
		)}
		{...props}
	>
		{@render children?.()}
	</button>
{/if}
