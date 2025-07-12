<script>
	import { AppName } from '$lib/config.js';
	import SignUpForm from '$lib/forms/sign-up-form.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{AppName} | Sign Up</title>
</svelte:head>

<SignUpForm form={data.form} />
