<script>
	import { AppName } from '$lib/config';
	import GoogleAuthButton from '$lib/components/oauth/google-oauth-button.svelte';

	let { children } = $props();
</script>

<div class="bg-primary/10 dark:bg-background min-h-screen w-screen overflow-y-auto">
	<main class="mx-auto my-14 h-fit max-w-md space-y-4 px-4 py-6">
		<div class="bg-card text-card-foreground rounded-lg border p-6">
			<header class="mb-8 flex items-center justify-center gap-2">
				<img src="/favicon.svg" alt="logo" class="h-8 w-8" />
				<a href="/" class="text-2xl font-bold">{AppName}</a>
			</header>

			{@render children()}

			<div class="mt-6">
				<div class="flex items-center">
					<hr class="flex-1" />
					<span class="text-muted-foreground px-2 text-sm">Or</span>
					<hr class="flex-1" />
				</div>

				<div class="mt-6 flex items-center justify-center">
					<GoogleAuthButton />
				</div>
			</div>
		</div>

		<footer class="flex flex-wrap items-center justify-center gap-2 gap-y-1 text-xs font-medium">
			<a href="/terms-of-service">Terms-of-service</a>
			<a href="/privacy-policy">Privacy</a>
		</footer>
	</main>
</div>
