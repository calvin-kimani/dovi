<script lang="ts">
	import { mode, toggleMode } from 'mode-watcher';
	import { cn } from '$lib/utils';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className, children, ...restProps }: Props = $props();
</script>

<button
	onclick={toggleMode}
	class={cn('flex cursor-pointer items-center justify-center', className)}
	{...restProps}
>
	{#if children?.()}
		{@render children()}
	{:else if mode.current === 'dark'}
		<Sun size={18} />
	{:else if mode.current === 'light'}
		<Moon size={18} />
	{/if}
</button>
