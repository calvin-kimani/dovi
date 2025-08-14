<script lang="ts">
	import { browser } from '$app/environment';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { getAppContext } from '$contexts/app.svelte';

	const appContext = getAppContext();

	function openGoogleOAuth() {
		if (!browser) return;

		// Calculate center position
		const width = 500;
		const height = 600;
		const left = (window.screen.width - width) / 2;
		const top = (window.screen.height - height) / 2;

		const popup = window.open(
			'/callback/google',
			'google-oauth',
			`width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
		);

		if (!popup) {
			toast.error('Please allow popups for this site to use OAuth');
			return;
		}

		// Listen for messages from the popup
		const messageHandler = (event: MessageEvent) => {
			if (event.origin !== window.location.origin) return;

			if (event.data.type === 'OAUTH_SUCCESS') {
				popup.close();
				toast.success('Successfully signed in!');
				goto('/dashboard');
			} else if (event.data.type === 'OAUTH_ERROR') {
				popup.close();
				toast.error(event.data.message || 'Authentication failed');
			}
		};

		window.addEventListener('message', messageHandler);

		// Check if popup was closed manually
		const checkClosed = setInterval(() => {
			if (popup.closed) {
				clearInterval(checkClosed);
				window.removeEventListener('message', messageHandler);
			}
		}, 1000);
	}
</script>

<button
	type="button"
	onclick={openGoogleOAuth}
	class="hover:bg-accent inline-flex w-full cursor-pointer justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm"
>
	<svg class="h-5 w-5" viewBox="0 0 24 24">
		<path
			fill="#4285F4"
			d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
		/>
		<path
			fill="#34A853"
			d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
		/>
		<path
			fill="#FBBC05"
			d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
		/>
		<path
			fill="#EA4335"
			d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
		/>
	</svg>
	<span class="ml-2">Continue with Google</span>
</button>
