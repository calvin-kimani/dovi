<script>
	let { children } = $props();
</script>

<div class="bg-secondary h-full w-full overflow-y-auto">
	<main class="mx-auto my-14 h-fit max-w-md space-y-4 px-4 py-6">
		<div class="bg-card text-card-foreground rounded-lg p-6">
			<header class="mb-8 flex items-center justify-center gap-2">
				<img src="/favicon.svg" alt="logo" class="h-8 w-8" />
				<a href="/" class="text-2xl font-bold">Dovi</a>
			</header>

			{@render children()}
		</div>

		<footer class="flex flex-wrap items-center justify-center gap-2 gap-y-1 text-xs font-medium">
			<a href="/terms-of-service">Terms-of-service</a>
			<a href="/privacy-policy">Privacy</a>
		</footer>
	</main>
</div>
