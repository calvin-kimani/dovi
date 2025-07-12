<script>
	import { PanelLeft } from '@lucide/svelte';
	import { getSidebarContext } from './context.svelte';

	let { ...props } = $props();

	const sidebar = getSidebarContext();
</script>

<button
	type="button"
	onclick={(e) => {
		if (sidebar?.isOpen) {
			sidebar?.toggleCollapsed(e);
		} else {
			sidebar?.toggleIsOpen(e);
		}
	}}
	class="hover:bg-muted cursor-pointer rounded p-1 transition-colors"
	title={sidebar?.isOpen
		? sidebar?.isCollapsed
			? 'Expand sidebar'
			: 'Collapse sidebar'
		: 'Open sidebar'}
>
	<PanelLeft size={18} {...props} />
</button>
