<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { schema, type SignInSchema } from '$lib/schemas/sign-in-schema';
	import { toast } from 'svelte-sonner';

	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Label from '$lib/components/label.svelte';
	import FormErrors from '$lib/components/form-errors.svelte';

	let { form: data }: { form: SuperValidated<SignInSchema> } = $props();

	const form = superForm(data, {
		validators: zod4Client(schema),
		delayMs: 500,
		timeoutMs: 8000
	});

	const { form: formData, enhance, errors, constraints, message, delayed } = form;

	$effect(() => {
		if ($message) {
			if ($message.success) {
				toast.success($message.message);
			} else if ($message.error) {
				toast.error($message.message);
			}
		}
	});
</script>

<form method="POST" use:enhance>
	<fieldset class="mb-3">
		<Label for="email">Email address</Label>
		<Input
			id="email"
			type="email"
			name="email"
			placeholder="Enter your email"
			bind:value={$formData.email}
			{...$constraints.email}
		/>
		<FormErrors errors={$errors.email} />
	</fieldset>

	<fieldset class="mb-3">
		<Label for="password">Password</Label>
		<Input
			id="password"
			type="password"
			name="password"
			placeholder="Enter your password"
			bind:value={$formData.password}
			{...$constraints.password}
		/>
		<FormErrors errors={$errors.password} />
	</fieldset>

	<div class="mb-6">
		<Button class="flex items-center justify-center gap-2" disabled={$delayed}>
			{#if $delayed}
				<span class="loader spinner-sm"></span>
			{/if}

			Sign In
		</Button>
	</div>

	<div class="space-x-1 text-center text-sm">
		<span>New to Dovi?</span>
		<a href="/sign-up" class="text-primary/90 hover:text-primary duration-100">Create an account</a>
	</div>
</form>
