<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { Toaster } from 'svelte-sonner';

	let { children } = $props();
</script>

<Toaster richColors position="top-center" />
<ModeWatcher />
{@render children()}
