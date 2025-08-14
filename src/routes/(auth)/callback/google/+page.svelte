<script lang="ts">
	import { AppName } from '$lib/config';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Send message to parent window about the result
	if (typeof window !== 'undefined') {
		if (data.success) {
			window.opener?.postMessage(
				{
					type: 'OAUTH_SUCCESS'
				},
				window.location.origin
			);
			window.close();
		} else if (data.error) {
			window.opener?.postMessage(
				{
					type: 'OAUTH_ERROR',
					message: data.error
				},
				window.location.origin
			);
			// Don't close immediately, let user see the error
		}
	}
</script>

<svelte:head>
	<title>{AppName} - Oauth Google</title>
</svelte:head>

{#if data.success}
	<div class="flex min-h-screen items-center justify-center bg-green-50">
		<div class="text-center">
			<div class="mx-auto mb-4 h-12 w-12 text-green-500">
				<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			</div>
			<h2 class="text-2xl font-bold text-green-900">Authentication Successful</h2>
			<p class="mt-2 text-green-700">You can close this window.</p>
		</div>
	</div>
{:else if data.error}
	<div class="flex min-h-screen items-center justify-center bg-red-50 px-4 py-12">
		<div class="w-full max-w-md space-y-8">
			<div class="text-center">
				<div class="mx-auto h-12 w-12 text-red-500">
					<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
						/>
					</svg>
				</div>
				<h2 class="mt-6 text-3xl font-extrabold text-red-900">Authentication Failed</h2>
				<p class="mt-2 text-sm text-red-600">{data.error}</p>
			</div>

			<div class="mt-8 space-y-4">
				<button
					onclick={() => window.close()}
					class="flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
				>
					Close Window
				</button>
			</div>
		</div>
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center bg-gray-50">
		<div class="text-center">
			<div
				class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"
			></div>
			<h2 class="text-2xl font-bold text-gray-900">Processing...</h2>
			<p class="mt-2 text-gray-700">Please wait while we authenticate you.</p>
		</div>
	</div>
{/if}
