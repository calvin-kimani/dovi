<script lang="ts">
	import AppNavbar from '$lib/components/app-navbar.svelte';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Sidebar from '$lib/components/sidebar';

	let { children } = $props();
</script>

<Sidebar.Provider class="bg-secondary">
	<AppSidebar />

	<main class="bg-background !h-full w-full overflow-y-auto rounded-tl-4xl">
		<AppNavbar />
		{@render children()}
	</main>
</Sidebar.Provider>
