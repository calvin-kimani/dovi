<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
		content: string;
		side?: 'top' | 'right' | 'bottom' | 'left';
		align?: 'start' | 'center' | 'end';
		delayDuration?: number;
		skipDelayDuration?: number;
		disableHoverableContent?: boolean;
	}

	let {
		class: className,
		children,
		content,
		side = 'top',
		align = 'center',
		delayDuration = 700,
		skipDelayDuration = 300,
		disableHoverableContent = false,
		...props
	}: Props = $props();

	let isVisible = $state(false);
	let timeoutId: number | null = null;
	let skipTimeoutId: number | null = null;
	let triggerElement: HTMLElement;
	let tooltipElement = $state<HTMLElement>();

	function showTooltip() {
		if (timeoutId) clearTimeout(timeoutId);
		if (skipTimeoutId) clearTimeout(skipTimeoutId);

		timeoutId = setTimeout(() => {
			isVisible = true;
		}, delayDuration) as unknown as number;
	}

	function hideTooltip() {
		if (timeoutId) clearTimeout(timeoutId);

		skipTimeoutId = setTimeout(() => {
			isVisible = false;
		}, skipDelayDuration) as unknown as number;
	}

	function handleMouseEnter() {
		showTooltip();
	}

	function handleMouseLeave() {
		hideTooltip();
	}

	function handleFocus() {
		showTooltip();
	}

	function handleBlur() {
		hideTooltip();
	}

	function getPositionClasses() {
		const positions = {
			top: {
				tooltip: 'bottom-full mb-2',
				arrow:
					'top-full border-t-popover border-l-transparent border-r-transparent border-b-transparent'
			},
			bottom: {
				tooltip: 'top-full mt-2',
				arrow:
					'bottom-full border-b-popover border-l-transparent border-r-transparent border-t-transparent'
			},
			left: {
				tooltip: 'right-full mr-2',
				arrow:
					'left-full border-l-popover border-t-transparent border-b-transparent border-r-transparent'
			},
			right: {
				tooltip: 'left-full ml-2',
				arrow:
					'right-full border-r-popover border-t-transparent border-b-transparent border-l-transparent'
			}
		};

		const alignments = {
			start: side === 'top' || side === 'bottom' ? 'left-0' : 'top-0',
			center:
				side === 'top' || side === 'bottom'
					? 'left-1/2 -translate-x-1/2'
					: 'top-1/2 -translate-y-1/2',
			end: side === 'top' || side === 'bottom' ? 'right-0' : 'bottom-0'
		};

		return {
			tooltip: `${positions[side].tooltip} ${alignments[align]}`,
			arrow: positions[side].arrow
		};
	}

	const positionClasses = getPositionClasses();
</script>

<div class="relative inline-block overflow-visible">
	<div
		bind:this={triggerElement}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		onfocus={handleFocus}
		onblur={handleBlur}
		{...props}
	>
		{@render children()}
	</div>

	{#if isVisible && content}
		<div
			bind:this={tooltipElement}
			class={cn(
				'text-popover-foreground bg-popover pointer-events-none absolute z-50 rounded px-2 py-1 text-xs shadow-lg',
				'max-w-[min(200px,calc(100vw-4rem))] break-words whitespace-normal', // Responsive max-width
				positionClasses.tooltip,
				className
			)}
			onmouseenter={disableHoverableContent
				? undefined
				: () => {
						if (skipTimeoutId) clearTimeout(skipTimeoutId);
					}}
			onmouseleave={disableHoverableContent ? undefined : hideTooltip}
			role="tooltip"
		>
			{content}
			<div class={cn('absolute border-4', positionClasses.arrow)}></div>
		</div>
	{/if}
</div>
