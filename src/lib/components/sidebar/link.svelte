<script lang="ts">
	import { getSidebarContext } from './context.svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
		href?: string;
		active?: boolean;
		title?: string;
		disabled?: boolean;
	}

	let {
		class: className,
		children,
		href,
		active = false,
		disabled = false,
		...props
	}: Props = $props();

	const sidebar = getSidebarContext();
	let element = $state<HTMLElement>();

	const baseClasses =
		'flex items-center gap-2 p-2 text-sm font-medium transition-all duration-200 hover:bg-accent group relative [&_svg]:!h-[18px] [&_svg]:w-[18px]';
	const activeClasses = 'bg-primary hover:bg-primary text-primary-foreground';
	const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';
</script>

<a
	bind:this={element}
	{href}
	class={cn(
		baseClasses,
		active && activeClasses,
		disabled && disabledClasses,
		sidebar?.isCollapsed &&
			'justify-center [&_h1]:hidden [&_h2]:hidden [&_h3]:hidden [&_h4]:hidden [&_h5]:hidden [&_h6]:hidden [&_p]:hidden [&_span]:hidden',
		className
	)}
	aria-disabled={disabled}
	{...props}
>
	{@render children?.()}
</a>
