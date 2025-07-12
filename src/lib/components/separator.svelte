<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
		orientation?: 'horizontal' | 'vertical';
		decorative?: boolean;
	}

	let {
		class: className,
		orientation = 'horizontal',
		decorative = true,
		...props
	}: Props = $props();

	const orientationClasses = {
		horizontal: 'h-px w-full',
		vertical: 'w-px h-full'
	};
</script>

<div
	role={decorative ? 'none' : 'separator'}
	aria-orientation={decorative ? undefined : orientation}
	class={cn('bg-accent shrink-0', orientationClasses[orientation], className)}
	{...props}
></div>
