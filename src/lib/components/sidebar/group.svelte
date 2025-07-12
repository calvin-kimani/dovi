<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className, children, ...props }: Props = $props();
</script>

<div class={cn('my-4 space-y-2', className)} {...props}>
	{@render children()}
</div>
