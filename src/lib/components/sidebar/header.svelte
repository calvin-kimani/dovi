<script lang="ts">
	import { getSidebarContext } from './context.svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className, children, ...props }: Props = $props();

	const sidebar = getSidebarContext();
</script>

<div
	class={cn('sticky top-0 z-10', sidebar?.isCollapsed && 'flex justify-center', className)}
	{...props}
>
	<div
		class={cn(
			'contents',
			sidebar?.isCollapsed &&
				'[&_h1]:hidden [&_h2]:hidden [&_h3]:hidden [&_h4]:hidden [&_h5]:hidden [&_h6]:hidden [&_img]:h-[24px] [&_img]:w-[24px] [&_p]:hidden [&_span]:hidden [&_svg]:h-[24px] [&_svg]:w-[24px]'
		)}
	>
		{@render children?.()}
	</div>
</div>
