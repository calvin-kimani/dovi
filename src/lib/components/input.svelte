<script lang="ts">
	import { cn } from '$lib/utils';
	import { Eye, EyeOff } from '@lucide/svelte';

	let {
		class: className = '',
		type = 'text',
		name = '',
		value = $bindable(''),
		...restProps
	} = $props();

	let password = $state(type);

	function togglePassword(e: Event) {
		e.stopPropagation();
		if (password == 'text') {
			password = 'password';
		} else if (password == 'password') {
			password = 'text';
		}
	}

	let baseClass = 'bg-input border-border border max-h-10 text-sm rounded-lg outline-none ring-0';
	let inputClass = 'bg-input inline-block w-full h-full p-2 rounded-lg';
</script>

{#if type == 'password'}
	<div
		class={cn(
			'focus-within:border-primary flex items-center overflow-hidden',
			baseClass,
			className
		)}
	>
		<input
			type={password}
			{name}
			class={cn('h-full border-none ring-0 outline-none', inputClass)}
			bind:value
			{...restProps}
		/>
		<button
			type="button"
			onclick={togglePassword}
			class="cursor-pointer p-2 text-center outline-none"
		>
			{#if password == 'text'}
				<EyeOff />
			{:else if password == 'password'}
				<Eye />
			{/if}
		</button>
	</div>
{:else}
	<input
		{type}
		{name}
		bind:value
		class={cn('focus:border-primary', inputClass, baseClass, className)}
		{...restProps}
	/>
{/if}
