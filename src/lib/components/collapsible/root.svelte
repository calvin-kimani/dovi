<script lang="ts">
	import { setContext } from 'svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
		open?: boolean;
		disabled?: boolean;
	}

	let { class: className, children, open = false, disabled = false, ...props }: Props = $props();

	let isOpen = $state(open);

	function toggle() {
		if (disabled) return;

		isOpen = !isOpen;
	}

	const context = {
		get isOpen() {
			return isOpen;
		},

		get disabled() {
			return disabled;
		},
		toggle
	};

	setContext('collapsible', context);
</script>

<div data-state={isOpen ? 'open' : 'closed'} class={cn('group', className)} {...props}>
	{@render children()}
</div>
