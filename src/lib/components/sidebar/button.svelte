<script lang="ts">
	import { getSidebarContext } from './context.svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
		onclick?: (e: Event) => void;
		active?: boolean;
		title?: string;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
	}

	let {
		class: className,
		children,
		onclick,
		active = false,
		title,
		disabled = false,
		type = 'button',
		...props
	}: Props = $props();

	const sidebar = getSidebarContext();
	let element = $state<HTMLElement>();

	function handleClick(e: Event) {
		if (onclick && !disabled) {
			onclick(e);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
			e.preventDefault();
			handleClick(e);
		}
	}

	const baseClasses =
		'flex w-full items-center gap-2 p-2 text-sm font-medium transition-all duration-200 hover:bg-accent group relative [&_svg]:h-[18px] [&_svg]:w-[18px] cursor-pointer';
	const activeClasses = 'bg-primary hover:bg-primary text-primary-foreground';
	const disabledClasses =
		'opacity-50 cursor-not-allowed pointer-events-none text-muted-foreground bg-muted';
</script>

<button
	bind:this={element}
	{type}
	{title}
	class={cn(
		baseClasses,
		active && activeClasses,
		disabled && disabledClasses,
		sidebar?.isCollapsed && 'justify-center',
		className
	)}
	{disabled}
	onclick={handleClick}
	onkeydown={handleKeydown}
	tabindex="0"
	{...props}
>
	<div
		class={cn(
			'contents',
			sidebar?.isCollapsed &&
				'justify-center [&_h1]:hidden [&_h2]:hidden [&_h3]:hidden [&_h4]:hidden [&_h5]:hidden [&_h6]:hidden [&_p]:hidden [&_span]:hidden'
		)}
	>
		{@render children()}
	</div>
</button>
