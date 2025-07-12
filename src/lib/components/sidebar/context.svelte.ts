import { getContext, setContext } from 'svelte';
import { browser } from '$app/environment';

// Context key using Symbol for uniqueness
const SIDEBAR_CONTEXT = Symbol('sidebar-context');

export class SidebarContext {
	isOpen = $state(true);
	isCollapsed = $state(false);

	constructor(isOpen = true, isCollapsed = false) {
		this.isOpen = isOpen;
		this.isCollapsed = isCollapsed;

		// Auto-handle responsive behavior
		if (browser) {
			this.#handleResize();
			window.addEventListener('resize', () => this.#handleResize());
		}
	}

	#handleResize() {
		const isMobile = window.innerWidth < 768;
		if (isMobile && this.isOpen && !this.isCollapsed) {
			// On mobile, close sidebar by default
			this.isOpen = false;
		} else if (!isMobile && this.isCollapsed) {
			// On desktop, auto-expand if collapsed
			this.isOpen = true;
		}
	}

	toggleIsOpen(e: Event) {
		e.stopPropagation();
		this.isOpen = !this.isOpen;
	}

	toggleCollapsed(e: Event) {
		e.stopPropagation();
		this.isCollapsed = !this.isCollapsed;
	}

	setCollapsed(collapsed: boolean) {
		this.isCollapsed = collapsed;
	}
}

export function setSidebarContext(isOpen = true, isCollapsed = false) {
	return setContext(SIDEBAR_CONTEXT, new SidebarContext(isOpen, isCollapsed));
}

export function getSidebarContext() {
	return getContext<ReturnType<typeof setSidebarContext>>(SIDEBAR_CONTEXT);
}
