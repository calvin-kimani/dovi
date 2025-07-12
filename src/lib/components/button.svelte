<script lang="ts">
	import { cn } from '$lib/utils';

	let { class: className = '', children, ...restProps } = $props();
</script>

<button
	class={cn(
		'bg-primary border-border block h-10 w-full cursor-pointer rounded-lg border p-2 text-center font-semibold',
		'text-primary-foreground hover:bg-primary/90 text-sm tracking-wider ring-0 outline-none',
		'disabled:bg-muted disabled:text-muted-foreground duration-150 disabled:cursor-not-allowed',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</button>
