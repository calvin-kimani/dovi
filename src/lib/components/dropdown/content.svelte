<script lang="ts">
	import { getContext } from 'svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
		align?: 'start' | 'center' | 'end';
		side?:
			| 'top'
			| 'right'
			| 'bottom'
			| 'left'
			| 'top-left'
			| 'top-right'
			| 'bottom-left'
			| 'bottom-right'
			| 'left-top'
			| 'left-bottom'
			| 'right-top'
			| 'right-bottom';
		sideOffset?: number;
		portal?: boolean;
	}

	let {
		class: className,
		children,
		align = 'start',
		side = 'bottom',
		sideOffset = 4,
		portal = true,
		...props
	}: Props = $props();

	const dropdown = getContext<{
		isOpen: boolean;
		contentElement: HTMLElement | undefined;
		triggerElement: HTMLElement | undefined;
		close: () => void;
	}>('dropdown');

	let contentElement = $state<HTMLElement>();

	function parseCompoundSide(side: string) {
		// Handle compound sides like 'top-right', 'bottom-left', etc.
		if (side.includes('-')) {
			const [primarySide, alignment] = side.split('-');
			return {
				side: primarySide as 'top' | 'right' | 'bottom' | 'left',
				align:
					alignment === 'left' || alignment === 'top'
						? ('start' as const)
						: alignment === 'right' || alignment === 'bottom'
							? ('end' as const)
							: ('center' as const)
			};
		}
		return { side: side as 'top' | 'right' | 'bottom' | 'left', align: align };
	}

	// Parse initial side and alignment
	const { side: initialSide, align: initialAlign } = parseCompoundSide(side);
	let computedAlign = $state(initialAlign);
	let computedSide = $state(initialSide);

	function updatePosition() {
		if (!dropdown.triggerElement || !contentElement) return;

		const triggerRect = dropdown.triggerElement.getBoundingClientRect();
		const contentRect = contentElement.getBoundingClientRect();
		const viewport = {
			width: window.innerWidth,
			height: window.innerHeight
		};

		// Parse the side prop to get primary side and alignment
		const { side: primarySide, align: defaultAlign } = parseCompoundSide(side);

		// Auto-detect best side based on available space
		const spaceBelow = viewport.height - triggerRect.bottom;
		const spaceAbove = triggerRect.top;
		const spaceRight = viewport.width - triggerRect.right;
		const spaceLeft = triggerRect.left;

		let newSide = primarySide;
		let newAlign = defaultAlign;

		// For vertical sides, choose based on available space
		if (primarySide === 'bottom' || primarySide === 'top') {
			if (spaceBelow >= contentRect.height + sideOffset) {
				newSide = 'bottom';
			} else if (spaceAbove >= contentRect.height + sideOffset) {
				newSide = 'top';
			} else {
				// Choose the side with more space
				newSide = spaceBelow > spaceAbove ? 'bottom' : 'top';
			}
		}

		// For horizontal sides, choose based on available space
		if (primarySide === 'left' || primarySide === 'right') {
			if (spaceRight >= contentRect.width + sideOffset) {
				newSide = 'right';
			} else if (spaceLeft >= contentRect.width + sideOffset) {
				newSide = 'left';
			} else {
				// Choose the side with more space
				newSide = spaceRight > spaceLeft ? 'right' : 'left';
			}
		}

		// Auto-adjust alignment to keep content in viewport (only if not explicitly set by compound side)
		if (!side.includes('-')) {
			if (newSide === 'bottom' || newSide === 'top') {
				const contentWidth = contentRect.width;
				const triggerCenter = triggerRect.left + triggerRect.width / 2;

				if (triggerCenter - contentWidth / 2 < 0) {
					newAlign = 'start';
				} else if (triggerCenter + contentWidth / 2 > viewport.width) {
					newAlign = 'end';
				} else if (align === 'center') {
					newAlign = 'center';
				}
			}
		}

		computedSide = newSide;
		computedAlign = newAlign;

		// Position the content
		if (portal) {
			const { top, left, right, bottom } = triggerRect;
			let x = 0;
			let y = 0;

			// Calculate position based on side
			switch (newSide) {
				case 'top':
					y = top - contentRect.height - sideOffset;
					break;
				case 'bottom':
					y = bottom + sideOffset;
					break;
				case 'left':
					x = left - contentRect.width - sideOffset;
					break;
				case 'right':
					x = right + sideOffset;
					break;
			}

			// Calculate position based on alignment for edge positioning
			if (newSide === 'top' || newSide === 'bottom') {
				switch (newAlign) {
					case 'start': // left edge of content aligns with left edge of trigger
						x = left;
						break;
					case 'center': // center of content aligns with center of trigger
						x = left + (triggerRect.width - contentRect.width) / 2;
						break;
					case 'end': // left edge of content aligns with right edge of trigger
						x = right;
						break;
				}
			} else {
				switch (newAlign) {
					case 'start': // top edge of content aligns with top edge of trigger
						y = top;
						break;
					case 'center': // center of content aligns with center of trigger
						y = top + (triggerRect.height - contentRect.height) / 2;
						break;
					case 'end': // top edge of content aligns with bottom edge of trigger
						y = bottom;
						break;
				}
			}

			contentElement.style.left = `${x}px`;
			contentElement.style.top = `${y}px`;
		}
	}

	function getPositionClasses() {
		if (portal) return '';

		const alignClasses = {
			start: 'left-0', // content's left edge aligns with trigger's left edge
			center: 'left-1/2 -translate-x-1/2', // centers on trigger
			end: 'left-full' // content's left edge aligns with trigger's right edge
		};

		const sideClasses = {
			top: `bottom-full mb-${sideOffset}`,
			bottom: `top-full mt-${sideOffset}`,
			left: `right-full mr-${sideOffset}`,
			right: `left-full ml-${sideOffset}`
		};

		return `${alignClasses[computedAlign]} ${sideClasses[computedSide]}`;
	}

	$effect(() => {
		if (contentElement) {
			dropdown.contentElement = contentElement;
		}
	});

	$effect(() => {
		if (dropdown.isOpen && contentElement && portal) {
			// Move to body for portal positioning
			document.body.appendChild(contentElement);

			// Small delay to ensure the element is rendered
			setTimeout(() => {
				updatePosition();
			}, 0);

			const handleResize = () => updatePosition();
			const handleScroll = () => updatePosition();

			window.addEventListener('resize', handleResize);
			window.addEventListener('scroll', handleScroll, true);

			return () => {
				window.removeEventListener('resize', handleResize);
				window.removeEventListener('scroll', handleScroll, true);
				if (contentElement && contentElement.parentNode === document.body) {
					document.body.removeChild(contentElement);
				}
			};
		} else if (dropdown.isOpen && contentElement && !portal) {
			updatePosition();
		}
	});
</script>

{#if dropdown.isOpen}
	<div
		bind:this={contentElement}
		data-dropdown-content
		class={cn(
			'bg-card text-card-foreground z-50 min-w-64 overflow-hidden rounded-xl p-1 shadow-2xl',
			'data-[state=open]:animate-in data-[state=closed]:animate-out',
			'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
			'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
			portal ? 'fixed' : 'absolute',
			getPositionClasses(),
			className
		)}
		data-state={dropdown.isOpen ? 'open' : 'closed'}
		{...props}
	>
		{@render children?.()}
	</div>
{/if}
