<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { schema, type SignUpSchema } from '$lib/schemas/sign-up-schema';
	import { toast } from 'svelte-sonner';

	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Label from '$lib/components/label.svelte';
	import FormErrors from '$lib/components/form-errors.svelte';

	let { form: data }: { form: SuperValidated<SignUpSchema> } = $props();

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
	<fieldset class="mb-4">
		<div class="grid grid-cols-2 gap-4">
			<section>
				<Label for="firstName">First name</Label>
				<Input
					id="firstName"
					name="firstName"
					placeholder="First Name"
					bind:value={$formData.firstName}
					{...$constraints.firstName}
				/>
			</section>
			<section>
				<Label for="lastName">Last name</Label>
				<Input
					id="lastName"
					name="lastName"
					placeholder="Last Name"
					bind:value={$formData.lastName}
					{...$constraints.lastName}
				/>
			</section>
		</div>
		<FormErrors errors={$errors.firstName} />
		<FormErrors errors={$errors.lastName} />
	</fieldset>

	<fieldset class="mb-4">
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

	<fieldset class="mb-4">
		<Label for="phone">Phone number</Label>
		<Input
			id="phone"
			type="telephone"
			name="phone"
			placeholder="Enter your phone number"
			bind:value={$formData.phone}
			{...$constraints.phone}
		/>
		<FormErrors errors={$errors.phone} />
	</fieldset>

	<fieldset class="mb-4">
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

	<fieldset class="mb-6">
		<Label for="confirmPassword">Confirm Password</Label>
		<Input
			id="confirmPassword"
			type="password"
			name="confirmPassword"
			placeholder="Confirm your password"
			bind:value={$formData.confirmPassword}
			{...$constraints.confirmPassword}
		/>
		<FormErrors errors={$errors.confirmPassword} />
	</fieldset>

	<div class="mb-6">
		<Button class="flex items-center justify-center gap-2" disabled={$delayed}>
			{#if $delayed}
				<span class="loader spinner-sm"></span>
			{/if}

			Sign Up
		</Button>
	</div>

	<div class="space-x-1 text-center text-sm">
		<span>Already have an account?</span>
		<a href="/sign-in" class="text-primary/90 hover:text-primary duration-100">Sign In</a>
	</div>
</form>
