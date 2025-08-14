<script>
	import { AppName } from '$lib/config.js';
	import SignInForm from '$lib/forms/sign-in-form.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{AppName} - Sign In</title>
</svelte:head>

<SignInForm form={data.form} />
