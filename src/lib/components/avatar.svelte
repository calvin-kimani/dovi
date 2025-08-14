<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		src?: string;
		alt?: string;
		fallback?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		children?: Snippet;
	}

	let {
		class: className,
		src,
		alt = '',
		fallback,
		size = 'md',
		children,
		...props
	}: Props = $props();

	let imageLoaded = $state(false);
	let imageError = $state(false);

	function handleImageLoad() {
		imageLoaded = true;
		imageError = false;
	}

	function handleImageError() {
		imageLoaded = false;
		imageError = true;
	}

	function getInitials(name: string): string {
		return name
			.split(' ')
			.map((word) => word.charAt(0))
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}

	function getSizeClasses(size: string): string {
		const sizes = {
			sm: 'h-6 w-6 text-xs',
			md: 'h-8 w-8 text-sm',
			lg: 'h-12 w-12 text-base',
			xl: 'h-16 w-16 text-lg'
		};
		return sizes[size as keyof typeof sizes] || sizes.md;
	}

	$effect(() => {
		if (src) {
			imageLoaded = false;
			imageError = false;
		}
	});
</script>

<div
	class={cn(
		'relative inline-flex shrink-0 overflow-hidden rounded-full',
		getSizeClasses(size),
		className
	)}
	{...props}
>
	{#if src && !imageError}
		<img
			{src}
			{alt}
			onload={handleImageLoad}
			onerror={handleImageError}
			class={cn(
				'aspect-square h-full w-full object-cover',
				imageLoaded ? 'opacity-100' : 'opacity-0'
			)}
		/>
	{/if}

	{#if !src || imageError || !imageLoaded}
		<div
			class={cn(
				'flex h-full w-full items-center justify-center rounded-full',
				'bg-primary text-primary-foreground font-bold'
			)}
		>
			{#if children}
				{@render children?.()}
			{:else if fallback}
				{getInitials(fallback)}
			{:else}
				<svg
					class="h-1/2 w-1/2"
					fill="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
					/>
				</svg>
			{/if}
		</div>
	{/if}
</div>
