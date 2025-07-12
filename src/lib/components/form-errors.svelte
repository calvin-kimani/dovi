<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
		errors?: string[] | undefined;
	}

	let { class: className, errors = $bindable([]), ...props }: Props = $props();
</script>

{#if errors.length > 0}
	<ul class={cn('p-1', className)} {...props}>
		{#each errors as err, index (index)}
			<li class="invalid inline-block text-xs">{err}</li>
		{/each}
	</ul>
{/if}

<style>
	.invalid {
		color: var(--color-red-400);
	}
</style>
