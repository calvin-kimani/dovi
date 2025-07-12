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

<div class={cn('mt-auto', sidebar?.isCollapsed && 'flex justify-center', className)} {...props}>
	<div
		class={cn(
			'contents',
			sidebar?.isCollapsed &&
				'[&_h1]:hidden [&_h2]:hidden [&_h3]:hidden [&_h4]:hidden [&_h5]:hidden [&_h6]:hidden [&_img]:!h-[20px] [&_img]:!w-[20px] [&_p]:hidden [&_span]:hidden [&_svg]:!h-[20px] [&_svg]:!w-[20px]'
		)}
	>
		{@render children?.()}
	</div>
</div>
