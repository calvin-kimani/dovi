<script lang="ts">
	import { setContext } from 'svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
	}

	let { class: className, children, open = false, onOpenChange, ...props }: Props = $props();

	let isOpen = $state(open);
	let triggerElement = $state<HTMLElement>();
	let contentElement = $state<HTMLElement>();

	function toggle() {
		const newState = !isOpen;
		isOpen = newState;
		onOpenChange?.(newState);
	}

	function close() {
		isOpen = false;
		onOpenChange?.(false);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (!isOpen || !triggerElement) return;

		const target = event.target as Node;

		// Check if click is on trigger
		if (triggerElement.contains(target)) {
			return;
		}

		// Check if click is on content (might be in portal)
		if (contentElement && contentElement.contains(target)) {
			return;
		}

		// Check if the clicked element has a data-dropdown-content attribute
		// This helps with portal rendered content
		const clickedElement = target as Element;
		if (clickedElement.closest && clickedElement.closest('[data-dropdown-content]')) {
			return;
		}

		close();
	}

	const context = {
		get isOpen() {
			return isOpen;
		},
		get triggerElement() {
			return triggerElement;
		},
		get contentElement() {
			return contentElement;
		},
		set triggerElement(element: HTMLElement | undefined) {
			triggerElement = element;
		},
		set contentElement(element: HTMLElement | undefined) {
			contentElement = element;
		},
		toggle,
		close
	};

	setContext('dropdown', context);

	$effect(() => {
		if (isOpen) {
			// Small delay to prevent immediate click outside detection on trigger click
			const timeoutId = setTimeout(() => {
				document.addEventListener('keydown', handleKeydown);
				document.addEventListener('click', handleClickOutside, true);
			}, 0);

			return () => {
				clearTimeout(timeoutId);
				document.removeEventListener('keydown', handleKeydown);
				document.removeEventListener('click', handleClickOutside, true);
			};
		} else {
			document.removeEventListener('keydown', handleKeydown);
			document.removeEventListener('click', handleClickOutside, true);
		}
	});
</script>

<div data-state={isOpen ? 'open' : 'closed'} class={cn('relative', className)} {...props}>
	{@render children?.()}
</div>
