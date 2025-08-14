<script lang="ts">
	import { cn } from '$lib/utils';

	let { class: className = '', children, ...restProps } = $props();
</script>

<label class={cn('text-muted-foreground mb-1 block text-sm', className)} {...restProps}>
	{@render children?.()}
</label>
